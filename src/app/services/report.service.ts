import { Injectable } from '@angular/core';
import { APIList } from './static/global-variable';
import { CommonService, exService } from './core/common.service';
import { SearchConfig } from './static/search-config';
import { Observable, Subscription } from 'rxjs';
import { lib } from './static/global-functions';
import { EnvService } from './core/env.service';
import { Subject } from 'rxjs';
import { BIReport, ReportDataConfig, ReportGlobalOptions, Schema, TimeConfig } from '../models/options-interface';
import { EChartsOption } from 'echarts';
import { EChartDefaultOption } from '../components/visualizations/types/e-chart-option';

@Injectable({
	providedIn: 'root'
})
export class ReportService {

	public reportDataTracking = new Subject<any>();
	public reportConfigTracking = new Subject<any>();



	/* #region static */
	globalOptions: ReportGlobalOptions = {
		TimeFrame: {
			From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
			To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
		},
	};


	commonOptions = {
		timeConfigType: [
			{ code: 'Relative', name: 'Relative' },
			{ code: 'Absolute', name: 'Absolute' },
		],

		timeConfigPeriod: [
			{ code: 'Minute', name: 'Minutes' },
			{ code: 'Hour', name: 'Hours' },
			{ code: 'Day', name: 'Days' },
			{ code: 'Week', name: 'Weekss' },
			{ code: 'Month', name: 'Months' },
			{ code: 'Year', name: 'Years' },
		],

		/**
		 * Timeframe is the period in which BI will examine all your data during that time frame
		 * Can use relate date like '-90' 90 days ago
		 * or absolute date linke '2023-08-01'
		 */
		timeframe: [
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }, name: 'Today' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 }, name: 'Yesterday' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 2 }, name: '2 days ago' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 }, name: '1 week ago' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Month', Amount: 1 }, name: '1 month ago' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Month', Amount: 3 }, name: '3 months ago' },
		],

		/**
		 * The comparison to compare the results of the chart to a previous period
		 */
		compareTo: [
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 }, name: 'Previous day' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 }, name: 'Previous week' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 2 }, name: 'Previous 2 weeks' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Month', Amount: 1 }, name: 'Previous month' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Month', Amount: 3 }, name: 'Previous 3 months' },
			{ timeConfig: { Type: 'Relative', IsPastDate: true, Period: 'Year', Amount: 1 }, name: 'Previous year' },
		],

		/**
		 * This is the time interval for the chart. This can be by hour, day, week, or month.
		 */
		interval: [
			{ code: 'Hour', name: 'Hour' },
			{ code: 'HourOfDay', name: 'Hour of Day' },
			{ code: 'Day', name: 'Day' },
			{ code: 'DayOfWeek', name: 'Day of Week' },
			{ code: 'Week', name: 'Week' },
			{ code: 'Month', name: 'Month' },
			{ code: 'Quater', name: 'Quater' },
			{ code: 'Year', name: 'Year' },
		],

		transformOperator: [
			{ code: 'TextGroup', name: 'Text', icon: '', disabled: true },
			{ code: '=', name: 'is', icon: '' },
			// { code: 'like', name: 'contains', icon: '' },
			// { code: 'Text', name: 'starts with', icon: '' },
			// { code: 'Text', name: 'ends with', icon: '' },
			// { code: 'Text', name: 'is not', icon: '' },
			// { code: 'Text', name: 'does not contain', icon: '' },
			// { code: 'Text', name: 'does not start with', icon: '' },
			// { code: 'Text', name: 'does not end with', icon: '' },
			//{ code: 'Text', name: 'matches regexp', icon: '' },

			{ code: 'NumberGroup', name: 'Number', icon: '', disabled: true },
			{ code: '=', name: 'equals', icon: '' },
			{ code: '>', name: 'greater than', icon: '' },
			{ code: '<', name: 'less than', icon: '' },
			{ code: '>=', name: 'greater than or equals', icon: '' },
			{ code: '<=', name: 'less than or equals', icon: '' },
			{ code: '<>', name: 'does not equal', icon: '' },

			{ code: 'BooleanGroup', name: 'Boolean', icon: '', disabled: true },
			{ code: '1', name: 'true', icon: '' },
			{ code: '0', name: 'false', icon: '' }
		],

		logicalOperator: [
			{ code: 'AND', name: 'AND', icon: '' },
			{ code: 'OR', name: 'OR', icon: '' },
		],

		measureMethod: [
			{ code: 'count', name: 'Count {0}', icon: '' },
			{ code: 'sum', name: 'Sum of {0}', icon: '' },
			{ code: 'max', name: 'Max of {0}', icon: '' },
			{ code: 'min', name: 'Min of {0}', icon: '' },
			{ code: 'average', name: 'Average {0}', icon: '' },
		],

		visualCategories: [
			{ code: 'count', name: 'Comparison', remark: 'To compare the magnitude of measures', icon: '' },
			{ code: 'count', name: 'Change over time', remark: 'To display the changing trend of measures', icon: '' },
			{ code: 'count', name: 'Part-to-whole', remark: 'To identify the parts making up a measure total', icon: '' },
			{ code: 'count', name: 'Flow', remark: 'To display a flow or dynamic relations', icon: '' },
			{ code: 'count', name: 'Ranking', remark: 'To rank measures in an order', icon: '' },
			{ code: 'count', name: 'Spatial', remark: 'To display measures over spatial maps', icon: '' },
			{ code: 'count', name: 'Distribution', remark: 'To display the distribution of values', icon: '' },
			{ code: 'count', name: 'Correlation', remark: 'To show correlations between measures', icon: '' },
			{ code: 'count', name: 'Single', remark: 'To present single values', icon: '' },
			{ code: 'count', name: 'Narrative', remark: 'To tell a story with data', icon: '' },
			{ code: 'count', name: 'Filter', remark: 'To control report filters', icon: '' },
			{ code: 'count', name: 'Miscellaneous', remark: '', icon: '' },
		],

		hoursOfDay: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
		daysOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		monthsOfYear: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
	};

	/* #endregion */


	/* #region load in memory*/

	schemaList: Schema[] = [
		{ Id: 1, Code: 'SaleOrder', Name: 'Sale orders', Type: 'Dataset', ModifiedDate: '2023-01-01' },
		{ Id: 2, Code: 'ARInvoice', Name: 'A/R Invoice dataset', Type: 'Dataset', ModifiedDate: '2023-01-01' },
		{ Id: 3, Code: 'ARInvoice', Name: 'A/R Invoice dataset', Type: 'Dataset', ModifiedDate: '2023-01-01' },
	];

	schemaDetailList = [
		{ IDSchema: 1, Id: 1, Code: 'OrderDate', Name: 'Ngày lên đơn', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
		{ IDSchema: 1, Id: 1, Code: 'Status', Name: 'Status', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
		{ IDSchema: 1, Id: 1, Code: 'Count', Name: 'Count of documents', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
		{ IDSchema: 1, Id: 1, Code: 'Total', Name: 'Sum of total', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
		{ IDSchema: 1, Id: 1, Code: 'Discount', Name: 'Sum of discount', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
	]

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



	reportList: BIReport[] = [
		//Sales by hour of day
		{
			Id: 1, Code: 'sales-by-hour-of-day', Name: 'Sales by hour of day',
			Remark: 'This report shows the sales made during each hour of the day over a given time period. It can help you identify peak sales hours and adjust your staffing and inventory accordingly.',
			Icon: 'stopwatch', Color: 'danger',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'InDelivery']) }, //'Cancelled', 'Splitted', 'Merged',
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'HourOfDay', Title: 'Order time' },
				CompareBy: [
					{ Property: 'Status', Title: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'Guests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'Total' },
				]
			},
			ChartConfig: {},
			Dimensions: ['OrderDate', 'Status', 'Total'],
			viewDimension: 'Total',
		},
		//Sales by day of week
		{
			Id: 2, Code: 'sales-by-day-of-week', Name: 'Sales by day of week',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'calendar', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) }, //'Splitted', 'Merged',
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'DayOfWeek', Title: 'DayOfWeek' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			viewDimension: 'CalcTotal',
		},
		//SO status
		{
			Id: 3, Code: 'bill-status-report', Name: 'SO status',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'pie-chart', Color: 'warning',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
				    Filter: {
				        Dimension: 'logical', Operator: 'AND',
				        Logicals: [
				            { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
				        ]
				    },
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'Guests' },
					{ Property: 'CalcTotalOriginal', Method: 'sum', Title: 'Total' },
				]
			},
			viewDimension: 'Count',
			// ChartScript: `Object.assign(option, {
			//   color: ["#54478c","#2c699a","#048ba8","#0db39e","#16db93","#83e377","#b9e769","#efea5a","#f1c453","#f29e4c"]
			// })`
		},

		//Payment methods - boxplot demo
		{
			Id: 4, Code: 'payment-methods', Name: 'Payment methods',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'wallet-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'BI_POS_PaymentAggregate', Name: 'erp_BI_POS_PaymentAggregate', Type: 'DBProcedure' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'Count', Type: 'Number', Title: 'Count' },
				CompareBy: [
					{ Property: 'TypeName' },
				],
				MeasureBy: [
					{ Property: 'Minimum' },
					{ Property: 'Q1' },
					{ Property: 'Median' },
					{ Property: 'Q3' },
					{ Property: 'Maximum' },
					{ Property: 'Count' },
					//{ Property: 'CalcTotal', Method: 'sum', Title: 'Total' },
				]
			},
			ChartConfig: {
				dataset: [
					{
						id: 'rawData',
						source: [
							['TypeName', 'Minimum', 'Q1', 'Median', 'Q3', 'Maximum', 'Count'],
							// ['ATM ', 164430, 192780, 198450, 204120, 481950, 5],
							// ['CC ', 73710, 158760, 215460, 373086, 708750, 9],
							// ['ZalopayApp ', 59535, 107730, 204120, 396900, 1060290, 69],
							// ['Cash ', 9390, 107730, 215460, 462672, 5358620, 2353],
							// ['Transfer MB', 22113, 141750, 222264, 493290, 3475710, 883],
							// ['Card MB', 36855, 158760, 362880, 578340, 2194290, 34],
							// ['Transfer VCB', 11907, 124740, 277830, 584010, 3583440, 176],
							// ['Card VCB', 25515, 187110, 368550, 635040, 8368920, 2377]
						]
					},
					{
						id: 'aggregateData',
						fromDatasetId: 'rawData',
						transform: [
							{
								type: 'sort',
								config: {
									dimension: 'Q3',
									order: 'asc'
								}
							}
						]
					}
				],
				tooltip: {
					trigger: 'axis',
					confine: true
				},
				xAxis: {
					nameGap: 30,
					scale: true
				},
				yAxis: {
					type: 'category'
				},
				legend: { show: false },

				series: [
					{
						name: 'Distribution',
						type: 'boxplot',
						datasetId: 'aggregateData',
						itemStyle: {
							color: '#b8c5f2'
						},
						encode: {
							x: ['Minimum', 'Q1', 'Median', 'Q3', 'Maximum'],
							y: 'TypeName',
							itemName: ['TypeName'],
							tooltip: ['Minimum', 'Q1', 'Median', 'Q3', 'Maximum', 'Count']
						}
					}
				]
			},
			ChartScript: `
            option.dataset[0].source =  this.data.map(obj => [obj.TypeName, obj.Minimum, obj.Q1, obj.Median, obj.Q3, obj.Maximum, obj.Count]);
            option.dataset[0].source.unshift(['TypeName', 'Minimum', 'Q1', 'Median', 'Q3', 'Maximum', 'Count']);
            `,
			viewDimension: 'Count',
		},

		//gauge demo
		{
			Id: 5, Code: 'demo', Name: 'Bills vs target', //bills-vs-target
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
				    Filter: {
				        Dimension: 'logical', Operator: 'AND',
				        Logicals: [
				            { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
							{ Dimension: 'Status', Operator: '=', Value: 'Done' },
				        ]
				    },
				},
				Interval: { Property: 'OrderDate', Type: 'Year', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'Guests' },
					{ Property: 'CalcTotalOriginal', Method: 'sum', Title: 'Total' },
				]
			},
			ChartConfig: {
				series: [
					{
						type: 'gauge',
						axisLine: {
							lineStyle: {
								width: 20,
								color: [
									[0.3, '#67e0e3'],
									[0.7, '#37a2da'],
									[1, '#fd666d']
								]
							}
						},
						pointer: {
							itemStyle: {
								color: 'auto'
							}
						},
						axisTick: {
							distance: -20,
							length: 8,
							lineStyle: {
								color: '#fff',
								width: 2
							}
						},
						splitLine: {
							distance: -20,
							length: 25,
							lineStyle: {
								color: '#fff',
								width: 4
							}
						},
						axisLabel: {
							color: 'inherit',
							distance: 20,
							//fontSize: 20
						},
						detail: {
							valueAnimation: true,
							formatter: '{value} bills',
							color: 'inherit',
							fontSize: 20
						},
						data: [
							{
								value: 70
							}
						]
					}
				]
			},
			ChartScript:`
			option.series[0].data[0].value = this.data.map(x => x.Count).reduce((a, b) => (+a) + (+b), 0);

			`
		},

		//Waterfall
		{
			Id: 6, Code: 'income-n-expenses', Name: 'Income & expenses',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'cash', Color: 'warning',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					formatter: function (params) {
						let tar;
						if (params[1] && params[1].value !== '-') {
							tar = params[1];
						} else {
							tar = params[2];
						}
						return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
					}
				},
				xAxis: {
					type: 'category',
					data: (function () {
						let list = [];
						for (let i = 1; i <= 11; i++) {
							list.push('Nov ' + i);
						}
						return list;
					})()
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: 'Placeholder',
						type: 'bar',
						stack: 'Total',
						silent: true,
						itemStyle: {
							borderColor: 'transparent',
							color: 'transparent'
						},
						emphasis: {
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent'
							}
						},
						data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
					},
					{
						name: 'Income',
						type: 'bar',
						stack: 'Total',
						label: {
							show: true,
							position: 'top'
						},
						data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
					},
					{
						name: 'Expenses',
						type: 'bar',
						stack: 'Total',
						label: {
							show: true,
							position: 'bottom'
						},
						data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
					}
				]
			},
		},

		//Heatmap
		{
			Id: 7, Code: 'bills-by-days', Name: 'Bills days',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'flame-outline', Color: 'danger',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Month', Amount: 3 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: '=', Value: 'Done' }, 
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig: {
				visualMap: {
					type: 'piecewise',
					orient: 'horizontal',
					left: 'center',
					bottom: 16,
				},
				calendar: {
					top: 16, right: 16, bottom: 46, left: 16,
					cellSize: ['auto', 40],
					range: ['2023-09-01', '2023-09-30'],
					itemStyle: {
						borderWidth: 0.5
					},
				},
				dataset: [{
					source: [
						// { Date: '2023-09-20', Value: 6 },
						// { Date: '2023-09-27', Value: 59 },
						// { Date: '2023-09-30', Value: 80 },
					]
				}],
				series: {
					type: 'heatmap',
					coordinateSystem: 'calendar',
				}
			},
			ChartScript:`
			let minDate = this.data.reduce((min, current) => new Date(current.OrderDate) < new Date(min.OrderDate) ? current : min, this.data[0]).OrderDate;
			let maxDate = this.data.reduce((max, current) => new Date(current.OrderDate) > new Date(max.OrderDate) ? current : max, this.data[0]).OrderDate;
			
			let minVal = this.data.reduce((min, current) => current[this.viewDimension] < min[this.viewDimension] ? current : min, this.data[0])[this.viewDimension];
			let maxVal = this.data.reduce((max, current) => current[this.viewDimension] > max[this.viewDimension] ? current : max, this.data[0])[this.viewDimension];

			option.calendar.range = [minDate,maxDate];
			option.visualMap.min = minVal;
			option.visualMap.max = maxVal;
			option.dataset[0].source = this.data.map(m => ({Date: m.OrderDate, Value: m[this.viewDimension]}));
			`
		},

		//sankey
		{
			Id: 8, Code: 'demo', Name: 'Sankey demo',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig: {
				series: {
					type: 'sankey',
					top: 16, bottom: 16, left: 16,
					emphasis: {
						focus: 'adjacency'
					},
					data: [
						{
							name: 'a'
						},
						{
							name: 'b'
						},
						{
							name: 'a1'
						},
						{
							name: 'a2'
						},
						{
							name: 'b1'
						},
						{
							name: 'c'
						}
					],
					links: [
						{
							source: 'a',
							target: 'a1',
							value: 5
						},
						{
							source: 'a',
							target: 'a2',
							value: 3
						},
						{
							source: 'b',
							target: 'b1',
							value: 8
						},
						{
							source: 'a',
							target: 'b1',
							value: 3
						},
						{
							source: 'b1',
							target: 'a1',
							value: 1
						},
						{
							source: 'b1',
							target: 'c',
							value: 2
						}
					]
				}
			},
		},

		//Funnel
		{
			Id: 9, Code: 'demo', Name: 'Funnel demo',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'funnel', Color: 'warning',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig: {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c}%'
				},
				legend: {
					show: false,
					data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
				},
				series: [
					{
						name: 'Expected',
						type: 'funnel',
						left: '10%',
						width: '70%',
						label: {
							formatter: '{b}Expected'
						},
						labelLine: {
							show: false
						},
						itemStyle: {
							opacity: 0.7
						},
						emphasis: {
							label: {
								position: 'inside',
								formatter: '{b}Expected: {c}%'
							}
						},
						data: [
							{ value: 60, name: 'Visit' },
							{ value: 40, name: 'Inquiry' },
							{ value: 20, name: 'Order' },
							{ value: 80, name: 'Click' },
							{ value: 100, name: 'Show' }
						]
					},
					{
						name: 'Actual',
						type: 'funnel',
						left: '10%',
						width: '70%',
						maxSize: '70%',
						label: {
							position: 'inside',
							formatter: '{c}%',
							color: '#fff'
						},
						itemStyle: {
							opacity: 0.5,
							borderColor: '#fff',
							borderWidth: 2
						},
						emphasis: {
							label: {
								position: 'inside',
								formatter: '{b}Actual: {c}%'
							}
						},
						data: [
							{ value: 30, name: 'Visit' },
							{ value: 10, name: 'Inquiry' },
							{ value: 5, name: 'Order' },
							{ value: 50, name: 'Click' },
							{ value: 80, name: 'Show' }
						],
						// Ensure outer shape will not be over inner shape when hover.
						z: 100
					}
				]
			},
		},

		//Radar
		{
			Id: 10, Code: 'cancellation-reason', Name: 'Lý do hủy',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'pie-chart-outline', Color: 'danger',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: '=', Value: 'Cancelled' },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Year', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'CancellationReason' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'BillCount' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'Total' },
				]
			},

			ChartScript: `
              
              let reasons = [
                { name: 'ChangesMind' },
                { name: 'TakingTooLong' },
                { name: 'BadQuality' },
                { name: 'FindOutGoodOffer' },
                { name: 'InsufficientFunds' },
                { name: 'Other' }
              ];
              
              Object.assign(option, {
                tooltip: {
                  trigger: 'item'
                },
                radar: {
                  //shape: 'circle',
                  radius: ["0%", "60%"],
                  indicator: reasons,
                },
                series: [
                  {
                    type: 'radar',
                    emphasis: {
                      areaStyle: {
                        color: 'rgba(0,250,0,0.3)'
                      }
                    },
                    data: [
                      {
                        value: reasons.map((r) => {
                          return this.data.find((f) => f.CancellationReason == r.name)?.Total || 0;
                        }),
                        name: 'Lý do hủy'
                      }
                    ]
                  }
                ]
              });
              
            `
		},

		//Chart script demo
		{
			Id: 11, Code: 'cancellation-reason-by-staff', Name: 'Lý do hủy theo nhân viên',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'pie-chart-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders', Type: 'DBTable' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'Status', Operator: '=', Value: 'Cancelled' },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Year', Title: 'OrderDate' },
				CompareBy: [

					{ Property: 'CreatedBy' },
					{ Property: 'CancellationReason' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'BillCount' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'Total' },
				]
			},
			ChartConfig: {
				series: {},
			},
			ChartScript: `
            let data = this.data;
            let reasons = [
                { name: 'ChangesMind' },
                { name: 'TakingTooLong' },
                { name: 'BadQuality' },
                { name: 'FindOutGoodOffer' },
                { name: 'InsufficientFunds' },
                { name: 'Other' }
              ];
              
              
              let bys = [...new Set(data?.map(item => item.CreatedBy))];
              
              // Set the chart options
              Object.assign(option,
              {
                radar: {
                  radius: ["0%", "60%"],
                  indicator: reasons
                },
                series: [
                  {
                    type: 'radar',
                    data: bys.map(function (c) {
                      return {
                        name: c,
                        value: reasons.map(function (r) {
                          return (
                            data?.find(
                              (d) => d.CreatedBy == c && d.CancellationReason == r.name
                            )?.Total || 0
                          );
                        })
                      };
                    })
                  }
                ]
              });
              
              
            `
		},

		//sunburst
		{
			Id: 12, Code: 'demo', Name: 'sunburst demo',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartScript: `
            var data = [
                {
                  name: 'Flora',
                  itemStyle: {
                    color: '#da0d68'
                  },
                  children: [
                    {
                      name: 'Black Tea',
                      value: 1,
                      itemStyle: {
                        color: '#975e6d'
                      }
                    },
                    {
                      name: 'Floral',
                      itemStyle: {
                        color: '#e0719c'
                      },
                      children: [
                        {
                          name: 'Chamomile',
                          value: 1,
                          itemStyle: {
                            color: '#f99e1c'
                          }
                        },
                        {
                          name: 'Rose',
                          value: 1,
                          itemStyle: {
                            color: '#ef5a78'
                          }
                        },
                        {
                          name: 'Jasmine',
                          value: 1,
                          itemStyle: {
                            color: '#f7f1bd'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Fruity',
                  itemStyle: {
                    color: '#da1d23'
                  },
                  children: [
                    {
                      name: 'Berry',
                      itemStyle: {
                        color: '#dd4c51'
                      },
                      children: [
                        {
                          name: 'Blackberry',
                          value: 1,
                          itemStyle: {
                            color: '#3e0317'
                          }
                        },
                        {
                          name: 'Raspberry',
                          value: 1,
                          itemStyle: {
                            color: '#e62969'
                          }
                        },
                        {
                          name: 'Blueberry',
                          value: 1,
                          itemStyle: {
                            color: '#6569b0'
                          }
                        },
                        {
                          name: 'Strawberry',
                          value: 1,
                          itemStyle: {
                            color: '#ef2d36'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Dried Fruit',
                      itemStyle: {
                        color: '#c94a44'
                      },
                      children: [
                        {
                          name: 'Raisin',
                          value: 1,
                          itemStyle: {
                            color: '#b53b54'
                          }
                        },
                        {
                          name: 'Prune',
                          value: 1,
                          itemStyle: {
                            color: '#a5446f'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Other Fruit',
                      itemStyle: {
                        color: '#dd4c51'
                      },
                      children: [
                        {
                          name: 'Coconut',
                          value: 1,
                          itemStyle: {
                            color: '#f2684b'
                          }
                        },
                        {
                          name: 'Cherry',
                          value: 1,
                          itemStyle: {
                            color: '#e73451'
                          }
                        },
                        {
                          name: 'Pomegranate',
                          value: 1,
                          itemStyle: {
                            color: '#e65656'
                          }
                        },
                        {
                          name: 'Pineapple',
                          value: 1,
                          itemStyle: {
                            color: '#f89a1c'
                          }
                        },
                        {
                          name: 'Grape',
                          value: 1,
                          itemStyle: {
                            color: '#aeb92c'
                          }
                        },
                        {
                          name: 'Apple',
                          value: 1,
                          itemStyle: {
                            color: '#4eb849'
                          }
                        },
                        {
                          name: 'Peach',
                          value: 1,
                          itemStyle: {
                            color: '#f68a5c'
                          }
                        },
                        {
                          name: 'Pear',
                          value: 1,
                          itemStyle: {
                            color: '#baa635'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Citrus Fruit',
                      itemStyle: {
                        color: '#f7a128'
                      },
                      children: [
                        {
                          name: 'Grapefruit',
                          value: 1,
                          itemStyle: {
                            color: '#f26355'
                          }
                        },
                        {
                          name: 'Orange',
                          value: 1,
                          itemStyle: {
                            color: '#e2631e'
                          }
                        },
                        {
                          name: 'Lemon',
                          value: 1,
                          itemStyle: {
                            color: '#fde404'
                          }
                        },
                        {
                          name: 'Lime',
                          value: 1,
                          itemStyle: {
                            color: '#7eb138'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Sour Fermented',
                  itemStyle: {
                    color: '#ebb40f'
                  },
                  children: [
                    {
                      name: 'Sour',
                      itemStyle: {
                        color: '#e1c315'
                      },
                      children: [
                        {
                          name: 'Sour Aromatics',
                          value: 1,
                          itemStyle: {
                            color: '#9ea718'
                          }
                        },
                        {
                          name: 'Acetic Acid',
                          value: 1,
                          itemStyle: {
                            color: '#94a76f'
                          }
                        },
                        {
                          name: 'Butyric Acid',
                          value: 1,
                          itemStyle: {
                            color: '#d0b24f'
                          }
                        },
                        {
                          name: 'Isovaleric Acid',
                          value: 1,
                          itemStyle: {
                            color: '#8eb646'
                          }
                        },
                        {
                          name: 'Citric Acid',
                          value: 1,
                          itemStyle: {
                            color: '#faef07'
                          }
                        },
                        {
                          name: 'Malic Acid',
                          value: 1,
                          itemStyle: {
                            color: '#c1ba07'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Alcohol Fremented',
                      itemStyle: {
                        color: '#b09733'
                      },
                      children: [
                        {
                          name: 'Winey',
                          value: 1,
                          itemStyle: {
                            color: '#8f1c53'
                          }
                        },
                        {
                          name: 'Whiskey',
                          value: 1,
                          itemStyle: {
                            color: '#b34039'
                          }
                        },
                        {
                          name: 'Fremented',
                          value: 1,
                          itemStyle: {
                            color: '#ba9232'
                          }
                        },
                        {
                          name: 'Overripe',
                          value: 1,
                          itemStyle: {
                            color: '#8b6439'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Green Vegetative',
                  itemStyle: {
                    color: '#187a2f'
                  },
                  children: [
                    {
                      name: 'Olive Oil',
                      value: 1,
                      itemStyle: {
                        color: '#a2b029'
                      }
                    },
                    {
                      name: 'Raw',
                      value: 1,
                      itemStyle: {
                        color: '#718933'
                      }
                    },
                    {
                      name: 'Green Vegetative',
                      itemStyle: {
                        color: '#3aa255'
                      },
                      children: [
                        {
                          name: 'Under-ripe',
                          value: 1,
                          itemStyle: {
                            color: '#a2bb2b'
                          }
                        },
                        {
                          name: 'Peapod',
                          value: 1,
                          itemStyle: {
                            color: '#62aa3c'
                          }
                        },
                        {
                          name: 'Fresh',
                          value: 1,
                          itemStyle: {
                            color: '#03a653'
                          }
                        },
                        {
                          name: 'Dark Green',
                          value: 1,
                          itemStyle: {
                            color: '#038549'
                          }
                        },
                        {
                          name: 'Vegetative',
                          value: 1,
                          itemStyle: {
                            color: '#28b44b'
                          }
                        },
                        {
                          name: 'Hay-like',
                          value: 1,
                          itemStyle: {
                            color: '#a3a830'
                          }
                        },
                        {
                          name: 'Herb-like',
                          value: 1,
                          itemStyle: {
                            color: '#7ac141'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Beany',
                      value: 1,
                      itemStyle: {
                        color: '#5e9a80'
                      }
                    }
                  ]
                },
                {
                  name: 'Other',
                  itemStyle: {
                    color: '#0aa3b5'
                  },
                  children: [
                    {
                      name: 'Papery/Musty',
                      itemStyle: {
                        color: '#9db2b7'
                      },
                      children: [
                        {
                          name: 'Stale',
                          value: 1,
                          itemStyle: {
                            color: '#8b8c90'
                          }
                        },
                        {
                          name: 'Cardboard',
                          value: 1,
                          itemStyle: {
                            color: '#beb276'
                          }
                        },
                        {
                          name: 'Papery',
                          value: 1,
                          itemStyle: {
                            color: '#fefef4'
                          }
                        },
                        {
                          name: 'Woody',
                          value: 1,
                          itemStyle: {
                            color: '#744e03'
                          }
                        },
                        {
                          name: 'Moldy/Damp',
                          value: 1,
                          itemStyle: {
                            color: '#a3a36f'
                          }
                        },
                        {
                          name: 'Musty/Dusty',
                          value: 1,
                          itemStyle: {
                            color: '#c9b583'
                          }
                        },
                        {
                          name: 'Musty/Earthy',
                          value: 1,
                          itemStyle: {
                            color: '#978847'
                          }
                        },
                        {
                          name: 'Animalic',
                          value: 1,
                          itemStyle: {
                            color: '#9d977f'
                          }
                        },
                        {
                          name: 'Meaty Brothy',
                          value: 1,
                          itemStyle: {
                            color: '#cc7b6a'
                          }
                        },
                        {
                          name: 'Phenolic',
                          value: 1,
                          itemStyle: {
                            color: '#db646a'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Chemical',
                      itemStyle: {
                        color: '#76c0cb'
                      },
                      children: [
                        {
                          name: 'Bitter',
                          value: 1,
                          itemStyle: {
                            color: '#80a89d'
                          }
                        },
                        {
                          name: 'Salty',
                          value: 1,
                          itemStyle: {
                            color: '#def2fd'
                          }
                        },
                        {
                          name: 'Medicinal',
                          value: 1,
                          itemStyle: {
                            color: '#7a9bae'
                          }
                        },
                        {
                          name: 'Petroleum',
                          value: 1,
                          itemStyle: {
                            color: '#039fb8'
                          }
                        },
                        {
                          name: 'Skunky',
                          value: 1,
                          itemStyle: {
                            color: '#5e777b'
                          }
                        },
                        {
                          name: 'Rubber',
                          value: 1,
                          itemStyle: {
                            color: '#120c0c'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Roasted',
                  itemStyle: {
                    color: '#c94930'
                  },
                  children: [
                    {
                      name: 'Pipe Tobacco',
                      value: 1,
                      itemStyle: {
                        color: '#caa465'
                      }
                    },
                    {
                      name: 'Tobacco',
                      value: 1,
                      itemStyle: {
                        color: '#dfbd7e'
                      }
                    },
                    {
                      name: 'Burnt',
                      itemStyle: {
                        color: '#be8663'
                      },
                      children: [
                        {
                          name: 'Acrid',
                          value: 1,
                          itemStyle: {
                            color: '#b9a449'
                          }
                        },
                        {
                          name: 'Ashy',
                          value: 1,
                          itemStyle: {
                            color: '#899893'
                          }
                        },
                        {
                          name: 'Smoky',
                          value: 1,
                          itemStyle: {
                            color: '#a1743b'
                          }
                        },
                        {
                          name: 'Brown, Roast',
                          value: 1,
                          itemStyle: {
                            color: '#894810'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Cereal',
                      itemStyle: {
                        color: '#ddaf61'
                      },
                      children: [
                        {
                          name: 'Grain',
                          value: 1,
                          itemStyle: {
                            color: '#b7906f'
                          }
                        },
                        {
                          name: 'Malt',
                          value: 1,
                          itemStyle: {
                            color: '#eb9d5f'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Spices',
                  itemStyle: {
                    color: '#ad213e'
                  },
                  children: [
                    {
                      name: 'Pungent',
                      value: 1,
                      itemStyle: {
                        color: '#794752'
                      }
                    },
                    {
                      name: 'Pepper',
                      value: 1,
                      itemStyle: {
                        color: '#cc3d41'
                      }
                    },
                    {
                      name: 'Brown Spice',
                      itemStyle: {
                        color: '#b14d57'
                      },
                      children: [
                        {
                          name: 'Anise',
                          value: 1,
                          itemStyle: {
                            color: '#c78936'
                          }
                        },
                        {
                          name: 'Nutmeg',
                          value: 1,
                          itemStyle: {
                            color: '#8c292c'
                          }
                        },
                        {
                          name: 'Cinnamon',
                          value: 1,
                          itemStyle: {
                            color: '#e5762e'
                          }
                        },
                        {
                          name: 'Clove',
                          value: 1,
                          itemStyle: {
                            color: '#a16c5a'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Nutty Cocoa',
                  itemStyle: {
                    color: '#a87b64'
                  },
                  children: [
                    {
                      name: 'Nutty',
                      itemStyle: {
                        color: '#c78869'
                      },
                      children: [
                        {
                          name: 'Peanuts',
                          value: 1,
                          itemStyle: {
                            color: '#d4ad12'
                          }
                        },
                        {
                          name: 'Hazelnut',
                          value: 1,
                          itemStyle: {
                            color: '#9d5433'
                          }
                        },
                        {
                          name: 'Almond',
                          value: 1,
                          itemStyle: {
                            color: '#c89f83'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Cocoa',
                      itemStyle: {
                        color: '#bb764c'
                      },
                      children: [
                        {
                          name: 'Chocolate',
                          value: 1,
                          itemStyle: {
                            color: '#692a19'
                          }
                        },
                        {
                          name: 'Dark Chocolate',
                          value: 1,
                          itemStyle: {
                            color: '#470604'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Sweet',
                  itemStyle: {
                    color: '#e65832'
                  },
                  children: [
                    {
                      name: 'Brown Sugar',
                      itemStyle: {
                        color: '#d45a59'
                      },
                      children: [
                        {
                          name: 'Molasses',
                          value: 1,
                          itemStyle: {
                            color: '#310d0f'
                          }
                        },
                        {
                          name: 'Maple Syrup',
                          value: 1,
                          itemStyle: {
                            color: '#ae341f'
                          }
                        },
                        {
                          name: 'Caramelized',
                          value: 1,
                          itemStyle: {
                            color: '#d78823'
                          }
                        },
                        {
                          name: 'Honey',
                          value: 1,
                          itemStyle: {
                            color: '#da5c1f'
                          }
                        }
                      ]
                    },
                    {
                      name: 'Vanilla',
                      value: 1,
                      itemStyle: {
                        color: '#f89a80'
                      }
                    },
                    {
                      name: 'Vanillin',
                      value: 1,
                      itemStyle: {
                        color: '#f37674'
                      }
                    },
                    {
                      name: 'Overall Sweet',
                      value: 1,
                      itemStyle: {
                        color: '#e75b68'
                      }
                    },
                    {
                      name: 'Sweet Aromatics',
                      value: 1,
                      itemStyle: {
                        color: '#d0545f'
                      }
                    }
                  ]
                }
              ];
              option = {
              
                series: {
                  type: 'sunburst',
                  data: data,
                  radius: [0, '95%'],
                  emphasis: {
                    focus: 'ancestor'
                  },
                  levels: [
                    {},
                    {
                      r0: '15%',
                      r: '35%',
                      itemStyle: {
                        borderWidth: 2
                      },
                      label: {
                        rotate: 'tangential'
                      }
                    },
                    {
                      r0: '35%',
                      r: '70%',
                      label: {
                        align: 'right'
                      }
                    },
                    {
                      r0: '70%',
                      r: '72%',
                      label: {
                        position: 'outside',
                        padding: 3,
                        silent: false
                      },
                      itemStyle: {
                        borderWidth: 3
                      }
                    }
                  ]
                }
              };
            `
		},


		//Top 10
		{
			Id: 13, Code: 'demo', Name: 'Demo top 10',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 4, Code: 'POS_SALE_OrderDetail', Name: 'Sale orders', Type: 'DBView' },
				// Transform: {
				// 	Filter: {
				// 		Dimension: 'logical', Operator: 'AND',
				// 		Logicals: [

				// 		]
				// 	},
				// },
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'ItemName' },
					{ Property: 'UoMName' },
					
				],
				MeasureBy: [
					{ Property: 'Quantity', Method: 'sum', Title: 'Quantity' },
					{ Property: 'CalcTotalOriginal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig:{
				grid: { top: 16, right: 16, bottom: 16, left: 16, containLabel: true },
				yAxis: {
				  data: [],
				  axisLabel: {
					show: false,
					inside: true,
					color: '#fff'
				  },
				  axisTick: {
					show: false
				  },
				  axisLine: {
					show: false
				  },
				  z: 10
				},
				xAxis: {
				  axisLine: {
					show: false
				  },
				  axisTick: {
					show: false
				  },
				},
  
				series: [
				  {
					type: 'bar',
					label: {show: true, fontSize: 16,  distance: 16, align: 'left', position: 'insideLeft', verticalAlign: 'middle', formatter: '{c}  {name|{b}}', rich: { name: {}} },
					showBackground: true,
					data: []
				  }
				]
			},
			ChartScript: `

			this.data.sort((b, a) => a[this.viewDimension] - b[this.viewDimension]);
			let raw = this.data.slice(0, 10);

			raw.sort((a, b) => a[this.viewDimension] - b[this.viewDimension]);

            // prettier-ignore
            let dataAxis = raw.map(m=> m.ItemName);
            // prettier-ignore
            let data = raw.map(m=> m[this.viewDimension]);


			option.yAxis.data = dataAxis;
            option.series[0].data = data;
            `
		},
		//polar-roundCap
		{
			Id: 14, Code: 'demo', Name: 'Demo polar roundCap',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartScript: `
          option = {
            angleAxis: {
              max: 2,
              startAngle: 30,
              splitLine: {
                show: false
              }
            },
            radiusAxis: {
              type: 'category',
              data: ['v', 'w', 'x', 'y', 'z'],
              z: 10
            },
            polar: {},
            series: [
              {
                type: 'bar',
                data: [4, 3, 2, 1, 0],
                coordinateSystem: 'polar',
                name: 'Without Round Cap',
                itemStyle: {
                  borderColor: 'red',
                  opacity: 0.8,
                  borderWidth: 1
                }
              },
              {
                type: 'bar',
                data: [4, 3, 2, 1, 0],
                coordinateSystem: 'polar',
                name: 'With Round Cap',
                roundCap: true,
                itemStyle: {
                  borderColor: 'green',
                  opacity: 0.8,
                  borderWidth: 1
                }
              }
            ],
          };
          `
		},
		//bar-polar-stack-radial
		{
			Id: 15, Code: 'demo', Name: 'Demo Stacked Bar Chart on Polar',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartScript: `
          option = {
            angleAxis: {},
            radiusAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu'],
              z: 10
            },
            polar: {},
            series: [
              {
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'A',
                stack: 'a',
                emphasis: {
                  focus: 'series'
                }
              },
              {
                type: 'bar',
                data: [2, 4, 6, 8],
                coordinateSystem: 'polar',
                name: 'B',
                stack: 'a',
                emphasis: {
                  focus: 'series'
                }
              },
              {
                type: 'bar',
                data: [1, 2, 3, 4],
                coordinateSystem: 'polar',
                name: 'C',
                stack: 'a',
                emphasis: {
                  focus: 'series'
                }
              }
            ],
            legend: {
              show: true,
              data: ['A', 'B', 'C']
            }
          };
          `
		},

		//Waterfall
		{
			Id: 16, Code: 'demo', Name: 'Demo Nightingale Chart',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartScript: `
        option = {
          
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [20, 150],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ]
            }
          ]
        };
        `
		},

		//treemap
		{
			Id: 17, Code: 'demo', Name: 'Demo treemap',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartScript: `
          option = {
            series: [
              {
                type: 'treemap',
                data: [
                  {
                    name: 'nodeA',
                    value: 10,
                    children: [
                      {
                        name: 'nodeAa',
                        value: 4
                      },
                      {
                        name: 'nodeAb',
                        value: 6
                      }
                    ]
                  },
                  {
                    name: 'nodeB',
                    value: 20,
                    children: [
                      {
                        name: 'nodeBa',
                        value: 20,
                        children: [
                          {
                            name: 'nodeBa1',
                            value: 20
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          };
          `
		},

		/*
		//Waterfall
		{
			Id: 18, Code: '', Name: 'Bills vs target',
			Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			Icon: 'speedometer-outline', Color: 'success',
			DataConfig: {
				TimeFrame: {
					Dimension: 'OrderDate',
					From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 },
					To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 }
				},
				CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
				Schema: { Id: 1, Type: 'None', Code: 'BANK_IncomingPayment', Name: 'Sale orders' },
				Transform: {
					Filter: {
						Dimension: 'logical', Operator: 'AND',
						Logicals: [
							{ Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
							{ Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
						]
					},
				},
				Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate' },
				CompareBy: [
					{ Property: 'Status' },
				],
				MeasureBy: [
					{ Property: 'Id', Method: 'count', Title: 'Count' },
					{ Property: 'NumberOfGuests', Method: 'count', Title: 'NumberOfGuests' },
					{ Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
				]
			},
			ChartConfig: {

			},
		},
		*/






		/*
		Sales by product: This report shows the sales made for each product over a given time period. It can help you identify which products are the most popular and adjust your inventory and marketing strategies accordingly.
	    
		Sales by category: This report shows the sales made for each product category over a given time period. It can help you identify which categories are the most popular and adjust your inventory and marketing strategies accordingly.
	    
		Sales by employee: This report shows the sales made by each employee over a given time period. It can help you identify your top-performing employees and reward them accordingly.
	    
		Sales by location: This report shows the sales made at each location over a given time period. It can help you identify which locations are the most profitable and adjust your staffing and inventory accordingly.
	    
		Sales by payment method: This report shows the sales made for each payment method over a given time period. It can help you identify which payment methods are the most popular and adjust your payment processing accordingly.
	    
		Sales by customer: This report shows the sales made by each customer over a given time period. It can help you identify your top customers and tailor your marketing strategies to their needs.
	    
		Sales by promotion: This report shows the sales made for each promotion over a given time period. It can help you identify which promotions are the most effective and adjust your marketing strategies accordingly.
	    
		Sales by discount: This report shows the sales made for each discount over a given time period. It can help you identify which discounts are the most effective and adjust your pricing strategies accordingly.
	    
		Sales by tax: This report shows the sales made for each tax rate over a given time period. It can help you identify which tax rates are the most common and adjust your tax processing accordingly.
		*/



		// {
		//     ReprotInfo: { Id: 11, Code: 'BillStatusReport', Name: 'Bar test', Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Icon: 'restaurant', Color: 'danger', Type: 'bar' },
		//     TimeFrame: { Dimension: 'OrderDate', From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 }, To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 } },
		//     CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
		//     Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders' },
		//     Transform: {
		//         Filter: {
		//             Dimension: 'logical', Operator: 'AND',
		//             Logicals: [
		//                 { Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
		//                 { Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) }, //'Splitted', 'Merged',
		//                 { Dimension: 'CalcTotal', Operator: '>', Value: '0' },
		//                 // { Dimension: 'OrderDate', Operator: '>=', Value: '2023-08-19' }, auto from timeframe
		//                 // { Dimension: 'OrderDate', Operator: '<=', Value: new Date() },
		//                 {
		//                     Dimension: 'logical', Operator: 'OR', Logicals: [
		//                         { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
		//                         // { Dimension: 'Type', Operator: '=', Value: 'FMCG' },
		//                     ]
		//                 },
		//             ]
		//         },
		//     },
		//     Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate-Hour' },
		//     CompareBy: [
		//         //{ Property: 'IDBranch' },
		//         { Property: 'Status' },
		//     ],
		//     //isGroupByCompareProperties: true, //=> chưa dùng đến
		//     MeasureBy: [
		//         { Property: 'Id', Method: 'count', Title: 'Count' },

		//         // { Property: 'TotalBeforeDiscount', Method: 'sum', Title: 'BeforeDiscount' },
		//         // { Property: 'TotalDiscount', Method: 'sum', Title: 'TotalDiscount' },
		//         // { Property: 'TotalAfterDiscount', Method: 'sum', Title: 'AfterDiscount' },
		//         // { Property: 'Tax', Method: 'sum', Title: 'Tax' },
		//         // { Property: 'TotalAfterTax', Method: 'sum', Title: 'TotalAfterTax' },
		//         // { Property: 'Received', Method: 'sum', Title: 'Received' },
		//         // { Property: 'Debt', Method: 'sum', Title: 'Debt' },
		//         // { Property: 'CalcTotalAdditions', Method: 'sum', Title: 'Additions' },
		//         { Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
		//     ]
		// },
		// {
		//     ReprotInfo: { Id: 2, Code: 'BillStatusReport', Name: 'Pie test', Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Icon: 'restaurant', Color: 'danger', Type: 'pie' },
		//     TimeFrame: { Dimension: 'OrderDate', From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 2 }, To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 } },
		//     CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
		//     Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders' },
		//     Transform: {
		//         Filter: {
		//             Dimension: 'logical', Operator: 'AND',
		//             Logicals: [
		//                 { Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
		//                 { Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) }, //'Splitted', 'Merged',
		//                 { Dimension: 'CalcTotal', Operator: '>', Value: '0' },
		//                 // { Dimension: 'OrderDate', Operator: '>=', Value: '2023-08-19' }, auto from timeframe
		//                 // { Dimension: 'OrderDate', Operator: '<=', Value: new Date() },
		//                 {
		//                     Dimension: 'logical', Operator: 'OR', Logicals: [
		//                         { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
		//                         // { Dimension: 'Type', Operator: '=', Value: 'FMCG' },
		//                     ]
		//                 },
		//             ]
		//         },
		//     },
		//     Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate-Hour' },
		//     CompareBy: [
		//         //{ Property: 'IDBranch' },
		//         { Property: 'Status' },
		//     ],
		//     //isGroupByCompareProperties: true, //=> chưa dùng đến
		//     MeasureBy: [
		//         { Property: 'Id', Method: 'count', Title: 'Count' },

		//         // { Property: 'TotalBeforeDiscount', Method: 'sum', Title: 'BeforeDiscount' },
		//         // { Property: 'TotalDiscount', Method: 'sum', Title: 'TotalDiscount' },
		//         // { Property: 'TotalAfterDiscount', Method: 'sum', Title: 'AfterDiscount' },
		//         // { Property: 'Tax', Method: 'sum', Title: 'Tax' },
		//         // { Property: 'TotalAfterTax', Method: 'sum', Title: 'TotalAfterTax' },
		//         // { Property: 'Received', Method: 'sum', Title: 'Received' },
		//         // { Property: 'Debt', Method: 'sum', Title: 'Debt' },
		//         // { Property: 'CalcTotalAdditions', Method: 'sum', Title: 'Additions' },
		//         { Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
		//     ]
		// }

	];

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

		public echartDefaultOption: EChartDefaultOption,

	) {


		// TODO
		// Set up SignalR to receive update data mart / data set
		// Schedule periodic checks
		// If any dataset has new data, then call to retrieve that dataset.
		// After retrieving new data, update the relevant open datasets.
		// Notify commponents to change data to refresh / update UI
	}

	//Report config functions

	/**
	 * get report data from raw dataset
	 * @param reportConfig The report configurations to get data from raw dataset
	 * @returns Return friendly data to view and serves as a data source for charts
	 */
	regReportTrackingData(reportId: number, checkNewData: boolean = false): Subject<any> {
		let localDataset = this.reportDatasetList.find(d => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find(d => d.id == reportId);

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
	getReportConfig(reportId: number, reportCode: string = ''): BIReport {
		let reportConfig = this.reportList.find(d => d.Id == reportId || d.Code == reportCode);
		if (!reportConfig && !reportId)
			this.env.showTranslateMessage('Report with Id=' + reportId + ' not found!', 'danger');

		return reportConfig;
	}

	/**
	 * Save report config
	 * @param config Report config value
	 */
	saveReportConfig(config: BIReport) {
		let reportConfig = this.getReportConfig(config.Id) || {};
		Object.assign(reportConfig, config);

		//TODO: save to db
	}

	//Report data functions
	/**
	 * Check report has view data
	 * @param reportId Report id
	 */
	checkNewDataAvailble(reportId: number) {
		//if has new data => call update
		let reportConfig = this.getReportConfig(reportId);

		this.commonService.connect('POST', 'BI/Schema/CheckNewDataAvailble', reportConfig.DataConfig)
			.subscribe((resp: any) => {
				if (resp == 'Yes') {
					this.getDatasetFromServer(reportId);
				}
				else {
					this.env.showTranslateMessage('You are viewing the latest data', 'success');
				}
			}, error => { console.log(error); });
	}

	/**
	 * Get local dataset
	 * @param reportId Get local report dataset by id
	 * @param checkNewData Check if has new data
	 */
	getReportData(reportId: number, checkNewData: boolean = false) {
		//Check in memory data
		let reportConfig = this.getReportConfig(reportId);
		let localDataset = this.reportDatasetList.find(d => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find(d => d.id == reportId);
		if (!(localDataset && trackingData)) {
			console.log('Need to regReportTrackingData first');
		}

		if (!checkNewData && localDataset.data) {
			trackingData.tracking.next(localDataset);
		}

		if (reportConfig.DataConfig.Schema.Type == 'None') {
			trackingData.tracking.next(null);
		}

		//if there is no data => check local storage
		else if (checkNewData || !localDataset.data) {

			if (!localDataset.data) {
				this.env.getStorage('ReportDataset-' + reportId).then(storageDataset => {
					if (storageDataset) {
						localDataset.data = storageDataset.data;
						trackingData.tracking.next(localDataset);
					}
				});
			}

			// if there is no data OR need to checkNewData then go to check new data availble
			if (checkNewData || !localDataset.data)
				this.checkNewDataAvailble(reportId);
		}
	}

	/**
	 * Get data form servery by report id OR custom report config
	 * @param reportId Report Id
	 */
	getDatasetFromServer(reportId: number) {
		let reportConfig = this.getReportConfig(reportId);
		let localDataset = this.reportDatasetList.find(d => d.id == reportId);
		let trackingData = this.reportDataTrackingList.find(d => d.id == reportId);
		if (!(localDataset && trackingData)) {
			console.log('Need to regReportTrackingData first');
		}

		reportConfig.DataConfig.Schema.DataFetchDate = localDataset.dataFetchDate;

		this.commonService.connect('POST', 'BI/Schema/QueryReportData', reportConfig.DataConfig)
			.subscribe((resp: any) => {
				if (!resp.Message) {
					localDataset.dataFetchDate = resp.LastModifiedDate;
					localDataset.data = resp.Data;
					trackingData.tracking.next(localDataset);
					//this.env.showTranslateMessage('You just loaded the latest data!', 'success');
					this.env.setStorage('ReportDataset-' + reportId, localDataset);
				}
				else {
					this.env.showTranslateMessage(resp.Message);
				}
			}, error => { console.log(error); });
	}

	runTestReport(config: ReportDataConfig) {
		return this.commonService.connect('POST', 'BI/Schema/QueryReportData', config);
	}

	/**
	 * Caculate absolute datetime from relative date time config
	 * @param timeConfig Time config object like Timeframe in report config
	 * @param isFullfillDate Fill hour, minute, second to end of date
	 * @returns Datetime
	 */
	calcTimeValue(timeConfig: TimeConfig, isFullfillDate = false): Date {
		if (timeConfig.Type == 'absolute') {
			return timeConfig.Value;
		}

		let addMinutes = 0;
		let addHours = 0;
		let addDays = 0;
		let addMonths = 0;
		let addYears = 0;


		switch (timeConfig.Period) {
			case 'Minute':
				addMinutes = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount;
				break;
			case 'Hour':
				addHours = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount;
				break;
			case 'Day':
				addDays = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount;
				break;
			case 'Week':
				addDays = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount * 7;
				break;
			case 'Month':
				addMonths = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount;
				break;
			case 'Year':
				addYears = (timeConfig.IsPastDate ? -1 : 1) * timeConfig.Amount;
				break;

			default:
				break;
		}

		let date = new Date();

		if (isFullfillDate) {
			return new Date(
				date.getFullYear() + addYears,
				date.getMonth() + addMonths,
				date.getDate() + addDays,
				(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? (date.getHours() + addHours) : 23,
				(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? (date.getMinutes() + addMinutes) : 59,
				(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? date.getSeconds() : 59,
				(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? date.getMilliseconds() : 999
			);
		}


		return new Date(
			date.getFullYear() + addYears,
			date.getMonth() + addMonths,
			date.getDate() + addDays,
			(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? (date.getHours() + addHours) : 0,
			(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? (date.getMinutes() + addMinutes) : 0,
			(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? date.getSeconds() : 0,
			(timeConfig.Period == 'Minute' || timeConfig.Period == 'Hour') ? date.getMilliseconds() : 0
		);
	}

	/**
	 * Format relative time config to read
	 * @param timeConfig Time config object like Timeframe in report config
	 * @param isPrevious Is previous days
	 * @returns Return text
	 */
	formatTimeConfig(timeConfig: TimeConfig, isPrevious = false) {
		if (timeConfig.Type == 'Absolute') {
			return lib.dateFormat(timeConfig.Value, 'dd/mm/yy hh:MM');
		}
		
		if (!timeConfig) return '';


		if (isPrevious) {
			if (timeConfig.Amount == 0)
				return 'Today';

			if (timeConfig.Amount == 1) {
				return 'Previous ' + timeConfig.Period.toLocaleLowerCase();
			}

			return 'Previous ' + timeConfig.Amount + ' ' + timeConfig.Period.toLocaleLowerCase() + 's';

		}

		if (timeConfig.Amount == 0)
			return 'Today';

		if (timeConfig.Amount == 1 && timeConfig.Period == 'Day')
			return 'Yesterday';

		return timeConfig.Amount + ' ' + timeConfig.Period.toLocaleLowerCase() + (timeConfig.Amount == 1 ? '' : 's') + (timeConfig.IsPastDate ? ' ago' : '');
	}

	/**
	 * Get schema by id
	 * @param schemaId Schema id
	 * @returns Return schema
	 */
	getSchema(schemaId: number) {
		return this.schemaList.find(d => d.Id == schemaId);
	}

	/**
	 * Get schema details by schema id
	 * @param schemaId Schema id
	 * @returns Schema detail list
	 */
	getSchemaDetail(schemaId: number) {
		return this.schemaDetailList.filter(d => d.IDSchema == schemaId);
	}



	groupByArray(xs, key) {
		return xs.reduce(function (rv, x) {
			let v = key instanceof Function ? key(x) : x[key];
			let el = rv.find((r) => r && r.key === v);
			if (el) {
				el.values.push(x);
			} else {
				rv.push({ key: v, values: [x] });
			} return rv;
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
			{ Id: 4, Name: 'year' }
		],
		reportType: [
			{ Id: 1, Name: 'MTD' },
			{ Id: 2, Name: 'YTD' }
		],
		query: {
			fromDate: '2021-01-01',
			toDate: '2021-01-01',
			reportDate: '2021-01-01',
			reportType: 'MTD',
			branch: '0,1,21,22,23,24,25,26,27,467',
			frequency: 1
		},
		rptOptions: {
			lineChart: {
				maintainAspectRatio: false,
				responsive: true,

				layout: {
					padding: {
						right: 20,
					}
				},
				legend: {
					display: false,
					labels: {
						fontColor: '#FFF',
						usePointStyle: true,
						boxWidth: 8,

					}
				},
				tooltips: {
					mode: 'index',
					intersect: true,
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				},
				hover: {
					mode: 'index',
					intersect: false
				},
				elements: {
					point: {
						radius: 1,
						hoverRadius: 4,
						backgroundColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
						borderWidth: 1,
						hoverBorderWidth: 2
					},
					line: {
						borderWidth: 3
					}
				},
				scales: {
					yAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast') + "aa",
								fontSize: 8,
								maxTicksLimit: 5,
								padding: 10
							},
							gridLines: {
								display: false,
								drawTicks: true,
								drawBorder: false
							}
						}
					],
					xAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast') + "ee",
								fontSize: 8,
								//maxTicksLimit: 7,
								padding: 7
							},
							gridLines: {
								display: false,
								zeroLineColor: "transparent",
								drawTicks: false,
								drawBorder: false
							}
						}
					]
				},
			},
			barChart: {
				maintainAspectRatio: false,
				responsive: true,

				layout: {
					padding: {
						top: 20,
					}
				},
				legend: {
					display: false,
					labels: {
						fontColor: '#FFF',
						usePointStyle: true,
						boxWidth: 8,

					}
				},
				tooltips: {
					mode: 'index',
					intersect: false,
					backgroundColor: 'rgba(0, 0, 0, 1)',

					bodyFontSize: 8.5,  // << change fontsize and color
					bodyFontColor: '#fff',  // << change fontsize and color
					bodyFontStyle: 'bold',
					callbacks: {
						label: function (tooltipItem, data) {
							return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₫';   // // << change value format, seperate per 1,000 with ₫ currency.
						},
					},
				},
				hover: {
					mode: 'index',
					intersect: false
				},
				elements: {
					point: {
						radius: 0,
						hoverRadius: 4,
						backgroundColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
						borderWidth: 1,
						hoverBorderWidth: 2
					},
					line: {
						borderWidth: 3
					}
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
								},   // this return from 300.000.000 to 300M ₫
							},
							gridLines: {
								color: () => lib.getCssVariableValue('--ion-color-primary') + '80',
								display: true,
								drawTicks: false,
								drawBorder: false,
								zeroLineColor: () => lib.getCssVariableValue('--ion-color-primary') + 'e6',
							}
						}
					],
					xAxes: [
						{
							ticks: {
								fontColor: () => lib.getCssVariableValue('--ion-color-primary'),
								fontSize: 10,
								//maxTicksLimit: 7,
								padding: 15
							},
							gridLines: {
								display: false,
								drawTicks: false,
								drawBorder: false,
							}
						},
					]
				},
				plugins: {
					labels: {
						render: () => { },
						fontSize: 12,
					},
				},
				animations: {
					tension: {
						duration: 1000,
						easing: 'linear',
						from: 1,
						to: 0,
					}
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
							}
							else {
								return Intl.NumberFormat().format(value / 1000.0) + 'K - ' + label;
							}


						}
					}
				},
				legend: {
					display: false,
				},
				elements: {
					arc: {
						borderWidth: 1
					},
				},
				plugins: {

					labels: {
						position: 'outside', // << display data label outside piechart segment
						//arc: true,  // << make label curve above piechart segment
						textMargin: 6,   // << spacing
						// render: 'percentage',  // << display in percent
						precision: 0,  // << display same as .toFixed(1), ex: 30.1%
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
						},   // if percentage value smaller than limit, then hide, else display. (to minimize and avoid overlapping datalabels)
					},
					afterDraw: function (chart) {
						if (chart.data.datasets.length === 0) {
							// No data is present
							var ctx = chart.chart.ctx;
							var width = chart.chart.width;
							var height = chart.chart.height
							chart.clear();

							ctx.save();
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.font = "16px normal 'Helvetica Nueue'";
							ctx.fillText('No data to display', width / 2, height / 2);
							ctx.restore();
						}
					}
				},
				animations: {
					tension: {
						duration: 1000,
						easing: 'linear',
						from: 1,
						to: 0,
					}
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
					display: false
				},
				title: {
					display: false,
				},
				animation: {
					animateScale: true,
					animateRotate: true
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
							}
							else {
								return label + ': ' + Intl.NumberFormat().format(value / 1000.0) + ' K';
							}


						}
					}
				},
				layout: {
					padding: {
						left: 5,
						right: 5,
						top: 5,
						bottom: 5
					}
				},
				plugins: {

					labels: [
						{
							render: 'label',
							position: 'outside',
							fontColor: () => lib.getCssVariableValue('--ion-color-primary-contrast'),
							// outsidePadding: 40,
							textMargin: 8
							// showZero: true,
						},
						{
							render: 'percentage',
							fontColor: '#FFF',
							precision: 0,
							//arc: true,
							//position: 'outside',

							position: 'border'

						}]
				},
			}
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
			}
			else if (type == 'dw') {
				let weekDates = lib.getWeekDates(toDay);
				this.rptGlobal.query.fromDate = lib.dateFormat(weekDates[0], 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(weekDates[6], 'yyyy-mm-dd');
			}
			else if (type == 'dm' || type == 'm') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'cm') {//current month
				var first = new Date(toDay.getFullYear(), toDay.getMonth(), 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'pm') {//previous month
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 1, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth(), 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'm3') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 2, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'm6') {
				var first = new Date(toDay.getFullYear(), toDay.getMonth() - 5, 1);
				var lastday = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'q' || type == 'q2' || type == 'q3') {
				var backMonth = type == 'q' ? 3 : (type == 'q2' ? 6 : 9)

				var month = toDay.getMonth() + 1;
				var quarter = (Math.ceil(month / 3));

				var first = new Date(toDay.getFullYear(), quarter * 3 - backMonth, 1);
				var lastday = new Date(toDay.getFullYear(), quarter * 3, 0);

				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}
			else if (type == 'my' || type == 'qy' || type == 'y' || type == 'y2' || type == 'y3') {
				var backYear = (type == 'my' || type == 'qy' || type == 'y') ? 0 : ((type == 'y2') ? 1 : 2)

				var first = new Date(toDay.getFullYear() - backYear, 0, 1);
				var lastday = new Date(toDay.getFullYear(), 12, 0);
				this.rptGlobal.query.fromDate = lib.dateFormat(first, 'yyyy-mm-dd');
				this.rptGlobal.query.toDate = lib.dateFormat(lastday, 'yyyy-mm-dd');
			}

			else if (type == 'setdone') {
				this.rptGlobal.query.type = 'set';

			}
			else if (type == 'set') {
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

	branchQuery(branch) {

	}



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

				data: [] //calc data
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
				Year: y
			});
			rundate.setDate(rundate.getDate() + 1);
		};

		if (this.rptGlobal.query.frequency == 0) {

			var hours = [];
			let l: any;
			for (var i = 0; i < 24; i++) {
				l = ((i < 10 ? '0' : '') + i + ':00');

				this.timeGroups.push({ Label: l, Hour: i });
			}
		}
		else if (this.rptGlobal.query.frequency == 1) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];

				let l = d.Day;
				if (dates.length < 8) {
					let ds = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
					l = ds[d.Date.getDay()];
				}

				this.timeGroups.push({ Label: l, Day: d.Day, Month: d.Month, Quarter: d.Quarter, Year: d.Year });
			}
		}
		else if (this.rptGlobal.query.frequency == 2) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];

				let ms = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
				let l = ms[d.Month - 1];

				let f = this.timeGroups.find(e => e.Month == d.Month && e.Year == d.Year);
				if (!f) {
					this.timeGroups.push({ Label: l, Month: d.Month, Quarter: d.Quarter, Year: d.Year });
				}
			}
		}
		else if (this.rptGlobal.query.frequency == 3) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];
				let l = 'Q' + d.Quarter;

				let f = this.timeGroups.find(e => e.Quarter == d.Quarter && e.Year == d.Year);
				if (!f) {
					this.timeGroups.push({ Label: l, Quarter: d.Quarter, Year: d.Year });
				}
			}
		}
		else if (this.rptGlobal.query.frequency == 4) {
			for (let i = 0; i < dates.length; i++) {
				const d = dates[i];
				let l = 'Y' + d.Year;

				let f = this.timeGroups.find(e => e.Year == d.Year);
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
		}
		else if (g.Month) {
			return g.Month == m && g.Year == y;
		}
		else if (g.Quarter) {
			return g.Quarter == q && g.Year == y;
		}
		else if (g.Year) {
			return g.Year == y;
		}

		return false;
	}

	calcSumGroupData(ds, sumby) {
		let group = [];
		for (let j = 0; j < this.timeGroups.length; j++) {
			const g = this.timeGroups[j];
			let sum = ds.Data.filter((e) => {
				return this.timeGroupCompare(e, g)
			}).map(m => m[sumby]).reduce((a, b) => a + b, 0);
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
	};

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
