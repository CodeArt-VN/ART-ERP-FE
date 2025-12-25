import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EChartDefaultOption } from '../../components/visualizations/types/e-chart-option';
import { BIReport, ReportDataConfig, ReportGlobalOptions, TimeConfig } from '../../interfaces/options-interface';
import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { lib } from '../static/global-functions';
import { BI_ReportProvider } from '../static/services.service';
import { GlobalData } from '../static/global-variable';

@Injectable({
	providedIn: 'root',
})
export class ReportService extends BI_ReportProvider {
	public reportDataTracking = new Subject<any>();
	public reportConfigTracking = new Subject<any>();

	/* #region static */
	globalOptions: ReportGlobalOptions = {
		TimeFrame: {
			From: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 0,
			},
			To: {
				Type: 'Relative',
				IsPastDate: true,
				Period: 'Day',
				Amount: 0,
			},
		},
	};

	commonOptions = GlobalData.commonOptions;

	/* #endregion */

	/* #region load in memory*/

	reportDatasetList = [
		// Sample data
		// {
		//     type: 'Dataset', //ReportDataset - Dataset
		//     id: 1,
		//     code: 'SaleOrder',
		//     dataFetchDate: '2023-01-01',
		//     data: [
		//         { Id: 1, Title: 'New', Count: 37, Total: 23000000, Discount: 9800000 },
		//         { Id: 2, Title: 'Approved', Count: 23, Total: 45600000, Discount: 6700000 },
		//         { Id: 3, Title: 'Shipping', Count: 56, Total: 8700000, Discount: 2500000 },
		//         { Id: 4, Title: 'Done', Count: 87, Total: 89000000, Discount: 1500000 },
		//     ]
		// },
	];

	items: BIReport[] = [];

	reportDataTrackingList = [
		// {
		//     Id: Number //Report Id
		//     tracking: Subject
		// }
	];

	/* #endregion */

	constructor(
		public commonService: CommonService,
		public env: EnvService,

		public echartDefaultOption: EChartDefaultOption
	) {
		super(commonService);
		this.env?.ready?.then((_) => {
			console.log('BIReportService.ready');
		});

		// TODO
		// Set up SignalR to receive update data mart / data set
		// Schedule periodic checks
		// If any dataset has new data, then call to retrieve that dataset.
		// After retrieving new data, update the relevant open datasets.
		// Notify commponents to change data to refresh / update UI
	}

	readReports(forceReload = false): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.read(null, forceReload)
				.then((resp: any) => {
					this.items = resp['data'];
					for (let i = 0; i < this.items.length; i++) {
						try {
							let dataConfig: any = this.items[i].DataConfig;
							this.items[i].DataConfig = JSON.parse(dataConfig);
							if (this.items[i].ChartConfig) this.updateChartConfigFromScript(this.items[i], this.items[i].ChartConfig);
						} catch (e) {
							console.log('Error parsing', this.items[i]);
						}
					}
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	updateChartConfigFromScript(report: BIReport, chartConfig) {
		if (report.ChartConfigScript == chartConfig) {
			return;
		}

		let option = {};
		

		try {
			eval(chartConfig);

			// Sử dụng Function constructor thay vì eval để an toàn hơn
			// const func = new Function('option', chartConfig);
			// func(option);

			report.ChartConfigScript = chartConfig;
			report.ChartConfig = option;
			this.reportConfigTracking.next(report.Id);
		} catch (e) {
			console.log('Error updateChartConfigFromScript', report);
		}
	}

	//Report config functions

	/**
	 * get report data from raw dataset
	 * @param reportConfig The report configurations to get data from raw dataset
	 * @returns Return friendly data to view and serves as a data source for charts
	 */
	regReportTrackingData(reportId: number, checkNewData: boolean = false): Subject<any> {
		let localDataset = this.reportDatasetList.find((d) => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find((d) => d.id == reportId);

		if (localDataset && trackingData) {
			return trackingData.tracking;
		}

		localDataset = { id: reportId, data: null };
		trackingData = { id: reportId };
		trackingData.tracking = new Subject<any>();
		this.reportDatasetList.push(localDataset);
		this.reportDataTrackingList.push(trackingData);

		return trackingData.tracking;
	}

	/**
	 * Get report config by id
	 * @param reportId Repport id
	 * @returns Report config
	 */
	getReport(reportId: number, reportCode: string = '', forceReload = false): BIReport {
		let report = this.items.find((d) => d.Id == reportId || (d.Code == reportCode && reportCode));
		if (!report && !reportId) {
			// Log id and code
			console.log('Report with Id=' + reportId + ' and Code=' + reportCode + ' not found!');
			this.env.showMessage('Report with Id=' + reportId + ' not found!', 'danger');
		}
		if (report && forceReload) {
			this.getAnItem(report.Id).then((resp: any) => {
				let originalReport = resp;
				originalReport.DataConfig = JSON.parse(originalReport.DataConfig);
				if (originalReport.ChartConfig) this.updateChartConfigFromScript(originalReport, originalReport.ChartConfig);

				this.saveReportConfig(originalReport);
			});
		}
		return report;
	}

	/**
	 * Save report config
	 * @param config Report config value
	 */
	saveReportConfig(config: BIReport) {
		let report = this.getReport(config.Id) || {};
		if (JSON.stringify(report) == JSON.stringify(config)) {
			return;
		}

		Object.assign(report, config);
		this.reportConfigTracking.next(report.Id);
	}

	//Report data functions
	/**
	 * Check report has view data
	 * @param reportId Report id
	 */
	checkNewDataAvailble(reportId: number) {
		//if has new data => call update
		let report = this.getReport(reportId);
		if (report.DataConfig.Schema.Id) {
			this.commonService.connect('POST', 'BI/Schema/CheckNewDataAvailble', report.DataConfig).subscribe(
				(resp: any) => {
					if (resp == 'Yes') {
						this.getDatasetFromServer(reportId);
					} else {
						this.env.showMessage('You are viewing the latest data', 'success');
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	/**
	 * Get local dataset
	 * @param reportId Get local report dataset by id
	 * @param checkNewData Check if has new data
	 */
	getReportData(reportId: number, checkNewData: boolean = false) {
		//Check in memory data
		let report = this.getReport(reportId);
		let localDataset = this.reportDatasetList.find((d) => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find((d) => d.id == reportId);
		if (!(localDataset && trackingData)) {
			console.log('Need to regReportTrackingData first');
		}

		if (!checkNewData && localDataset.data) {
			trackingData.tracking.next(localDataset);
		}

		if (report.DataConfig.Schema.Type == 'None') {
			trackingData.tracking.next(null);
		}

		//if there is no data => check local storage
		else if (checkNewData || !localDataset.data) {
			if (!localDataset.data) {
				this.env.getStorage('ReportDataset-' + reportId).then((storageDataset) => {
					if (storageDataset) {
						localDataset.data = storageDataset.data;
						trackingData.tracking.next(localDataset);
					}
				});
			}

			// if there is no data OR need to checkNewData then go to check new data availble
			if (checkNewData || !localDataset.data) this.checkNewDataAvailble(reportId);
		}
	}

	/**
	 * Get data form servery by report id OR custom report config
	 * @param reportId Report Id
	 */
	getDatasetFromServer(reportId: number) {
		let report = this.getReport(reportId);
		let localDataset = this.reportDatasetList.find((d) => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find((d) => d.id == reportId);
		if (!(localDataset && trackingData)) {
			console.log('Need to regReportTrackingData first');
		}

		report.DataConfig.Schema.DataFetchDate = localDataset.dataFetchDate;
		if (report.DataConfig.Schema.Id) {
			this.commonService.connect('POST', 'BI/Schema/QueryReportData', report.DataConfig).subscribe(
				(resp: any) => {
					if (!resp.Message) {
						localDataset.dataFetchDate = resp.LastModifiedDate;
						localDataset.data = resp.Data;
						localDataset.comparitionData = resp.ComparitionData;
						trackingData.tracking.next(localDataset);
						//this.env.showTranslateMessage('You just loaded the latest data!', 'success');
						this.env.setStorage('ReportDataset-' + reportId, localDataset);
					} else {
						this.env.showMessage(resp.Message);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	runTestReport(config: ReportDataConfig) {
		if (config?.Schema?.Id) {
			return this.commonService.connect('POST', 'BI/Schema/QueryReportData', config);
		} else {
			return new Observable();
		}
	}

	/**
	 * Caculate absolute datetime from relative date time config
	 * @param timeConfig Time config object like Timeframe in report config
	 * @param isFullfillDate Fill hour, minute, second to end of date
	 * @returns Datetime
	 */
	calcTimeValue(timeConfig: TimeConfig, isFullfillDate = false, baseDate: TimeConfig = null): Date {
		return lib.calcTimeValue(timeConfig, isFullfillDate, baseDate);
	}

	/**
	 * Format relative time config to read
	 * @param timeConfig Time config object like Timeframe in report config
	 * @param isPrevious Is previous days
	 * @returns Return text
	 */
	formatTimeConfig(timeConfig: TimeConfig, isPrevious = false) {
		return lib.formatTimeConfig(timeConfig, isPrevious);
	}

	groupByArray(xs, key) {
		return xs.reduce(function (rv, x) {
			let v = key instanceof Function ? key(x) : x[key];
			let el = rv.find((r) => r && r.key === v);
			if (el) {
				el.values.push(x);
			} else {
				rv.push({ key: v, values: [x] });
			}
			return rv;
		}, []);
	}

	/**
	 * Group by select
	 * @param list Json data array
	 * @param keyGetter Use like groupBy(pets, pet => pet.type)
	 * @returns Grouped array
	 */
	groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((i) => {
			const key = keyGetter(i);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [i]);
			} else {
				collection.push(i);
			}
		});
		return map;
	}

	////////////// Từ đây trở xuống sẽ bỏ hết

	rptGlobal: any = {
		frequency: [
			{ Id: 0, Name: 'hour' },
			{ Id: 1, Name: 'day' },
			{ Id: 2, Name: 'month' },
			{ Id: 3, Name: 'quarter' },
			{ Id: 4, Name: 'year' },
		],
		reportType: [
			{ Id: 1, Name: 'MTD' },
			{ Id: 2, Name: 'YTD' },
		],
		query: {
			fromDate: '2021-01-01',
			toDate: '2021-01-01',
			reportDate: '2021-01-01',
			reportType: 'MTD',
			branch: '0,1,21,22,23,24,25,26,27,467',
			frequency: 1,
		},
		rptOptions: {
			lineChart: {
				maintainAspectRatio: false,
				responsive: true,

				layout: {
					padding: {
						right: 20,
					},
				},
				legend: {
					display: false,
					labels: {
						fontColor: '#FFF',
						usePointStyle: true,
						boxWidth: 8,
					},
				},
				tooltips: {
					mode: 'index',
					intersect: true,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				},
				hover: {
					mode: 'index',
					intersect: false,
				},
				elements: {
					point: {
						radius: 1,
						hoverRadius: 4,
						backgroundColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
						borderWidth: 1,
						hoverBorderWidth: 2,
					},
					line: {
						borderWidth: 3,
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast') + 'aa',
								fontSize: 8,
								maxTicksLimit: 5,
								padding: 10,
							},
							gridLines: {
								display: false,
								drawTicks: true,
								drawBorder: false,
							},
						},
					],
					xAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast') + 'ee',
								fontSize: 8,
								//maxTicksLimit: 7,
								padding: 7,
							},
							gridLines: {
								display: false,
								zeroLineColor: 'transparent',
								drawTicks: false,
								drawBorder: false,
							},
						},
					],
				},
			},
			barChart: {
				maintainAspectRatio: false,
				responsive: true,

				layout: {
					padding: {
						top: 20,
					},
				},
				legend: {
					display: false,
					labels: {
						fontColor: '#FFF',
						usePointStyle: true,
						boxWidth: 8,
					},
				},
				tooltips: {
					mode: 'index',
					intersect: false,
					backgroundColor: 'rgba(0, 0, 0, 1)',

					bodyFontSize: 8.5, // << change fontsize and color
					bodyFontColor: '#fff', // << change fontsize and color
					bodyFontStyle: 'bold',
					callbacks: {
						label: function (tooltipItem, data) {
							return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫'; // // << change value format, seperate per 1,000 with ₫ currency.
						},
					},
				},
				hover: {
					mode: 'index',
					intersect: false,
				},
				elements: {
					point: {
						radius: 0,
						hoverRadius: 4,
						backgroundColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
						borderWidth: 1,
						hoverBorderWidth: 2,
					},
					line: {
						borderWidth: 3,
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary'),
								fontSize: 12,
								maxTicksLimit: 8,
								padding: 20,
								beginAtZero: true,
								// callback:
								//     function (value) {
								//         return value.toLocaleString();
								//     },

								callback: function (label, index, labels) {
									return label / 1000000 + 'M ₫';
								}, // this return from 300.000.000 to 300M ₫
							},
							gridLines: {
								color: () => lib.getCssVariableValue('--ion-color-primary') + '80',
								display: true,
								drawTicks: false,
								drawBorder: false,
								zeroLineColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
							},
						},
					],
					xAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary'),
								fontSize: 10,
								//maxTicksLimit: 7,
								padding: 15,
							},
							gridLines: {
								display: false,
								drawTicks: false,
								drawBorder: false,
							},
						},
					],
				},
				plugins: {
					labels: {
						render: () => {},
						fontSize: 12,
					},
				},
				animations: {
					tension: {
						duration: 1000,
						easing: 'linear',
						from: 1,
						to: 0,
					},
				},
			},
			pieChart: {
				responsive: true,
				maintainAspectRatio: false,
				borderColor: () => lib.getCssVariableValue('--ion-color-primary'),
				borderWidth: 5,
				hoverBorderWidth: 3,
				tooltips: {
					enabled: true,
					callbacks: {
						label: function (tooltipItem, data) {
							//var label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' đơn ' + data.labels[tooltipItem.index];
							//return label;
							var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							var label = data.labels[tooltipItem.index];
							if (value >= 1000000) {
								return Intl.NumberFormat().format(value / 1000000.0) + 'M - ' + label;
							} else {
								return Intl.NumberFormat().format(value / 1000.0) + 'K - ' + label;
							}
						},
					},
				},
				legend: {
					display: false,
				},
				elements: {
					arc: {
						borderWidth: 1,
					},
				},
				plugins: {
					labels: {
						position: 'outside', // << display data label outside piechart segment
						//arc: true,  // << make label curve above piechart segment
						textMargin: 6, // << spacing
						// render: 'percentage',  // << display in percent
						precision: 0, // << display same as .toFixed(1), ex: 30.1%
						fontSize: 10,
						fontStyle: 'bold',
						anchor: 'center',
						fontColor: () => lib.getCssVariableValue('--ion-color-dark'),
						// offset: 10,

						// render: (args) => {
						// return `${args.label}: ${args.value}%`;
						// return `${args.value}`;
						// }  // display item Name + Value at the same type (shouldn't use this since names are too long)

						render: (args) => {
							if (args.percentage < 2.5) {
								return '';
							}
							return args.percentage + '%';
						}, // if percentage value smaller than limit, then hide, else display. (to minimize and avoid overlapping datalabels)
					},
					afterDraw: function (chart) {
						if (chart.data.datasets.length === 0) {
							// No data is present
							var ctx = chart.chart.ctx;
							var width = chart.chart.width;
							var height = chart.chart.height;
							chart.clear();

							ctx.save();
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.font = "16px normal 'Helvetica Nueue'";
							ctx.fillText('No data to display', width / 2, height / 2);
							ctx.restore();
						}
					},
				},
				animations: {
					tension: {
						duration: 1000,
						easing: 'linear',
						from: 1,
						to: 0,
					},
				},
			},
			dougnutChart: {
				maintainAspectRatio: false,
				responsive: true,
				// cutoutPercentage: 70,
				// rotation: 1 * Math.PI,
				// circumference: 1 * Math.PI,

				borderWidth: 5,
				hoverBorderWidth: 3,

				legend: {
					display: false,
				},
				title: {
					display: false,
				},
				animation: {
					animateScale: true,
					animateRotate: true,
				},
				tooltips: {
					callbacks: {
						label: function (tooltipItem, data) {
							//var label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' đơn ' + data.labels[tooltipItem.index];
							//return label;
							var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							var label = data.labels[tooltipItem.index];
							if (value >= 1000000) {
								return label + ': ' + Intl.NumberFormat().format(value / 1000000.0) + ' triệu';
							} else {
								return label + ': ' + Intl.NumberFormat().format(value / 1000.0) + ' K';
							}
						},
					},
				},
				layout: {
					padding: {
						left: 5,
						right: 5,
						top: 5,
						bottom: 5,
					},
				},
				plugins: {
					labels: [
						{
							render: 'label',
							position: 'outside',
							fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast'),
							// outsidePadding: 40,
							textMargin: 8,
							// showZero: true,
						},
						{
							render: 'percentage',
							fontColor: '#FFF',
							precision: 0,
							//arc: true,
							//position: 'outside',

							position: 'border',
						},
					],
				},
			},
		},
	};

	public reportEventTracking = new Subject<any>();
	publishChange(data: any) {
		this.reportEventTracking.next(data);
	}

	Tracking(): Subject<any> {
		return this.reportEventTracking;
	}

	dateQuery(type) {
		return new Promise((resolve, reject) => {
			this.rptGlobal.query.type = type;
			let toDay = new Date();

			if (type == 'd') {
				this.rptGlobal.query.fromDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(toDay, 'yyyy-mm-dd');
			} else if (type == 'dw') {
				let weekDates = lib.getWeekDates(toDay);
				this.rptGlobal.query.fromDate = lib.dateFormat(weekDates[0], 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(weekDates[6], 'yyyy-mm-dd');
			} else if (type == 'dm' || type == 'm') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'cm') {
				//current month
				var first = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'pm') {
				//previous month
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 1, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth(), 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'm3') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 2, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'm6') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 5, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'q' || type == 'q2' || type == 'q3') {
				var backMonth = type == 'q' ? 3 : type == 'q2' ? 6 : 9;

				var month = toDay.getMonth() + 1;
				var quarter = Math.ceil(month / 3);

				var first = new Date(toDay.getFullYear(), quarter * 3 - backMonth, 1);
				var lastday = new Date(toDay.getFullYear(), quarter * 3, 0);

				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'my' || type == 'qy' || type == 'y' || type == 'y2' || type == 'y3') {
				var backYear = type == 'my' || type == 'qy' || type == 'y' ? 0 : type == 'y2' ? 1 : 2;

				var first = new Date(toDay.getFullYear() - backYear, 0, 1);
				var lastday = new Date(toDay.getFullYear(), 12, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			} else if (type == 'setdone') {
				this.rptGlobal.query.type = 'set';
			} else if (type == 'set') {
				reject(true);
			}

			if (type != 'set') {
				this.updateGroupFromFrequency();
				this.publishChange(this.rptGlobal.query);
				//this.reportTracking.next({Code:'Date'});
				resolve(true);
			}
		});
	}

	branchQuery(branch) {}

	buildDataset() {
		let datasets = [];
		for (let i = 0; i < this.rptGlobal.branch.length; i++) {
			const b = this.rptGlobal.branch[i];
			let dataset = {
				_b: b,
				hidden: b.IsHidden,
				label: b.Name,
				borderColor: lib.colorLightenDarken(b.Color, 30),
				hoverBackgroundColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
				color: b.Color,
				IDBranch: b.Id,

				data: [], //calc data
			};

			datasets.push(dataset);
		}

		return datasets;
	}

	timeGroups = [];
	private updateGroupFromFrequency() {
		this.timeGroups = [];
		let dates = [];
		let beginDate = new Date(this.rptGlobal.query.fromDate);
		let endDate = new Date(this.rptGlobal.query.toDate);
		let rundate = new Date(beginDate);
		while (rundate <= endDate) {
			let d = rundate.getDate();
			let m = rundate.getMonth() + 1;
			let q = m < 4 ? 1 : m < 7 ? 2 : m < 10 ? 3 : 4;
			let y = rundate.getFullYear();

			dates.push({
				Date: new Date(rundate),
				Day: d,
				Month: m,
				Quarter: q,
				Year: y,
			});
			rundate.setDate(rundate.getDate() + 1);
		}

		if (this.rptGlobal.query.frequency == 0) {
			var hours = [];
			let l: any;
			for (var i = 0; i < 24; i++) {
				l = (i < 10 ? '0' : '') + i + ':00';

				this.timeGroups.push({ Label: l, Hour: i });
			}
		} else if (this.rptGlobal.query.frequency == 1) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];

				let l = d.Day;
				if (dates.length < 8) {
					let ds = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
					l = ds[d.Date.getDay()];
				}

				this.timeGroups.push({
					Label: l,
					Day: d.Day,
					Month: d.Month,
					Quarter: d.Quarter,
					Year: d.Year,
				});
			}
		} else if (this.rptGlobal.query.frequency == 2) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];

				let ms = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
				let l = ms[d.Month - 1];

				let f = this.timeGroups.find((e) => e.Month == d.Month && e.Year == d.Year);
				if (!f) {
					this.timeGroups.push({
						Label: l,
						Month: d.Month,
						Quarter: d.Quarter,
						Year: d.Year,
					});
				}
			}
		} else if (this.rptGlobal.query.frequency == 3) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];
				let l = 'Q' + d.Quarter;

				let f = this.timeGroups.find((e) => e.Quarter == d.Quarter && e.Year == d.Year);
				if (!f) {
					this.timeGroups.push({
						Label: l,
						Quarter: d.Quarter,
						Year: d.Year,
					});
				}
			}
		} else if (this.rptGlobal.query.frequency == 4) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];
				let l = 'Y' + d.Year;

				let f = this.timeGroups.find((e) => e.Year == d.Year);
				if (!f) {
					this.timeGroups.push({ Label: l, Year: d.Year });
				}
			}
		}
	}

	timeGroupCompare(e, g) {
		//Label: l, Day: d.Day, Month: d.Month, Quarter : d.Quarter, Year: d.Year
		let rundate = new Date(e.Date);

		let d = rundate.getDate();
		let m = rundate.getMonth() + 1;
		let q = m < 4 ? 1 : m < 7 ? 2 : m < 10 ? 3 : 4;
		let y = rundate.getFullYear();

		if (g.Day) {
			return g.Day == d && g.Month == m && g.Year == y;
		} else if (g.Month) {
			return g.Month == m && g.Year == y;
		} else if (g.Quarter) {
			return g.Quarter == q && g.Year == y;
		} else if (g.Year) {
			return g.Year == y;
		}

		return false;
	}

	calcSumGroupData(ds, sumby) {
		let group = [];
		for (let j = 0; j < this.timeGroups.length; j++) {
			const g = this.timeGroups[j];
			let sum = ds.Data.filter((e) => {
				return this.timeGroupCompare(e, g);
			})
				.map((m) => m[sumby])
				.reduce((a, b) => a + b, 0);
			group.push(sum);
		}
		return group;
	}

	//Tính tổng tất cả. vd: chi nhánh
	sumDatasetGroupCalc(datasets) {
		let ds = datasets[0];
		for (let i = 0; i < ds.data.length; i++) {
			ds.data[i] = 0;
			for (let j = 1; j < datasets.length; j++) {
				const d = datasets[j];
				ds.data[i] += d.data[i];
			}
		}
	}

	randomScalingFactor(min = 30, max = 100) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	createHorizontalGradientStroke(ctx, width, color) {
		var gradientStroke = ctx.createLinearGradient(width, 0, 0, 0);
		gradientStroke.addColorStop(0, color + 'FF');
		gradientStroke.addColorStop(0.9, color + '00');
		gradientStroke.addColorStop(1, color + '00');
		return gradientStroke;
	}

	createVerticalGradientStroke(ctx, height, color) {
		var gradientStroke = ctx.createLinearGradient(0, 0, 0, height);
		gradientStroke.addColorStop(0, color + 'FF');
		gradientStroke.addColorStop(0.9, color + '00');
		gradientStroke.addColorStop(1, color + '00');
		return gradientStroke;
	}
}
