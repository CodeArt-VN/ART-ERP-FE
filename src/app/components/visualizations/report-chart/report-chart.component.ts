import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BIReport, ReportDataConfig } from 'src/app/models/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-chart',
	templateUrl: './report-chart.component.html',
	styleUrls: ['./report-chart.component.scss'],
})
export class ReportChartComponent implements OnInit {
	subscriptions: Subscription[] = []; //Subscriptions	
	rptLoaded = false; //Set true when first data come
	isLoading = true; //Show loading when data is loading
	dataFetchDate: Date; //To show last time load data
	dataIntervalProperty: string; //To pass to chart component
	dataIntervalType: string; //To pass to chart component
	rawData: any[] = []; //Raw data from services

	report: BIReport = null; //Report config
	chartType: string = 'auto'; //Chart type
	chartScript: string; //Chart script
	chartOption: echarts.EChartsOption = null; //Chart option



	/** Set data directly to the component without going through the data subscription */
	@Input() set data(ds) {
		if (ds) {
			this.updateDataset(ds);
		}
	}

	/** Report Id to find report config */
	_reportId: number;
	@Input() set reportId(v: number) {
		if (v) {
			if (!this._reportId || this._reportId != v) {
				setTimeout(() => {
					if (this.viewDimension) this.changeViewDimension.emit(this.viewDimension);
					this.rpt.getReportData(this._reportId);
				}, 300);
			}

			this._reportId = v;
			let temp = this.rpt.getReport(this._reportId);
			this.report = JSON.parse(JSON.stringify(temp));
			this.dataIntervalProperty = this.report.DataConfig.Interval?.Title || this.report.DataConfig.Interval?.Property;
			this.dataIntervalType = this.report.DataConfig.Interval.Type;
			
			if (this.report.Dimensions?.length > 0) 
				this.dimensions = this.report.Dimensions;
			else 
				this.updateDimensions();
			
			if (!this.viewDimension || !this.dimensions.includes(this.viewDimension)) {
				this.viewDimension = this.report.viewDimension || this.report.DataConfig.MeasureBy[0]?.Title || this.report.DataConfig.MeasureBy[0]?.Property;	
			}
			
			
			this.chartScript = this.report.ChartScript;

			if (!this.report.DataConfig.Schema.Id) {
				this.rptLoaded = true;
				this.isLoading = false;
			}

			if (this.report.DataConfig.Schema.Type == 'None' || this.report?.ChartConfig?.series) {
				this.chartType = 'fixed';
			}
			if (this.report.ChartConfig) {
				this.chartOption = this.report.ChartConfig;
			}
		}
	}

	/** grid item in dashboard - to set UI responsive */
	_gridItem: any;
	@Input() set gridItem(v) {
		this._gridItem = v;
		console.log('gridItem', v);
		if (this._gridItem?.WidgetConfig?.ViewDimension) {
			this.onViewDimensionChange(this._gridItem.WidgetConfig.ViewDimension);
		}
	}

	/** switch between Dimensions */
	@Input() viewDimension: string;

	/** View chart in dashboard or report view */
	@HostBinding('class') @Input() viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

	/**	More toolbar */
	@ViewChild('toolPopover') toolPopover;


	constructor(private env: EnvService, public rpt: ReportService) {
	}

	ngOnInit() {
		this.subscriptions.push(
			this.rpt.regReportTrackingData(this._reportId).subscribe(ds => {
				this.updateDataset(ds);
				this.rptLoaded = true;
				this.isLoading = false;

				console.log('report chart component regReportTrackingData');

			})
		);

		this.subscriptions.push(
			this.rpt.reportConfigTracking.subscribe((reportId) => {
				if (reportId == this._reportId || !this._reportId) {
					
					this.reportId = reportId;
				}
			})
		);


		this.subscriptions.push(
            this.env.getEvents().subscribe((data) => {
                if (data.Code == 'changeBranch') {
					this.onReloadData();
                }
            })
        );
	}


	ngAfterViewInit() { }

	ngOnDestroy() {
		//Unsubscribe all
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}


	dimensions: string[] = [];
	updateDimensions() {
		if (this.report.DataConfig.CompareBy.length > 0) {
			this.dimensions = this.report.DataConfig.CompareBy.map(x => x.Title || x.Property);
			if (this.viewDimension) {
				this.dimensions.push(this.viewDimension);
			}
			else if(this.report.DataConfig.MeasureBy.length){
				this.dimensions.push(this.report.DataConfig.MeasureBy[0].Title || this.report.DataConfig.MeasureBy[0].Property);
			}
		}


		
		// if (this.viewDimension && this.report.DataConfig.CompareBy.length > 0) {
		// 	this.dimensions = [
		// 		(this.report.DataConfig.CompareBy[0].Title || this.report.DataConfig.CompareBy[0].Property), 
		// 		this.viewDimension
		// 	];
		// }
		// else if (this.report.DataConfig.CompareBy.length > 0 && this.report.DataConfig.MeasureBy.length > 0) {
		// 	this.dimensions = [
		// 		(this.report.DataConfig.CompareBy[0].Title || this.report.DataConfig.CompareBy[0].Property), 
		// 		(this.report.DataConfig.MeasureBy[0].Title || this.report.DataConfig.MeasureBy[0].Property)
		// 	];
		// }
	}

	/**
	 * Set dataset data
	 * @param ds Data form services
	 */
	updateDataset(ds) {
		if (!ds) return;
		let elements = document.querySelectorAll('.updatedtime-label' + this.report.Id);
		elements.forEach(element => {
			//element.scrollIntoView({ behavior: "smooth", block: "center" });
			element.classList.add('blink');
			setTimeout(() => {
				element.classList.remove('blink');
			}, 2000);
		});
		this.dataFetchDate = ds.dataFetchDate;
		this.rawData = ds.data;

		this.report?.DataConfig.MeasureBy.forEach((m) => {
			m.Value = this.rawData.map(x => x[(m.Title || m.Property)]).reduce((a, b) => (+a) + (+b), 0);
		});
	}



	/**	Control tool popover */
	isToolPopoverOpen = false;
	presentToolPopover(e: Event) {
		this.toolPopover.event = e;
		this.isToolPopoverOpen = true;
	}

	/**	Delete chart form dashboard event */
	@Output() delete = new EventEmitter();
	onDeleteClick(ev) {
		this.delete.emit(ev);
	}

	/**
	 * Change view dimension
	 * @param v Dimension
	 */
	onViewDimensionChange(v) {
		this.viewDimension = v;
		this.updateDimensions();
		setTimeout(() => {
			this.changeViewDimension.emit(v);
		}, 0);

	}
	@Output() changeViewDimension = new EventEmitter();

	/**
	 * Toggle mini and full chart in report view
	 */
	toggleMiniChart() {
		if (this.viewMode == 'mini') {
			this.viewMode = 'full';
		}
		else {
			this.viewMode = 'mini';
		}
	}

	/** Open report handle in dashboard */
	@Output() openReport = new EventEmitter();
	onOpenReport() {
		this.isToolPopoverOpen = false;
		setTimeout(() => {
			this.openReport.emit(this.report);
		}, 0);

	}

	/** Reload data */
	onReloadData() {
		this.isLoading = true;
		this.rpt.getReportData(this._reportId, true);
	}

	compareObjects(o1: any, o2: any): boolean {
		return JSON.stringify(o1) == JSON.stringify(o2);
	}

	@Output() chartClick = new EventEmitter();
	onChartClick(e) {
		this.chartClick.emit(e);
	}
}
