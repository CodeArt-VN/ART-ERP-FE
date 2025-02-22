import { Injectable } from '@angular/core';
import { lib } from 'src/app/services/static/global-functions';

@Injectable({
	providedIn: 'root',
})

/** EChart default options */
export class EChartDefaultOption {
	constructor() {}

	/** Chart type */
	chartType: 'pie' | 'donut' | 'bar' = 'pie';

	/** Chart view mode */
	viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

	/** Chart options */
	chartOption: any;

	/** default option */

	get eChartsOption(): any {
		return {
			backgroundColor: lib.getCssVariableValue('--ion-color-tint'),
			textStyle: {
				color: lib.getCssVariableValue('--ion-color-dark'),
			},
			legend: {
				show: true,
				bottom: 0,
				type: 'scroll',
				padding: [16, 16, 16, 16],
				icon: 'circle',
				textStyle: {
					color: lib.getCssVariableValue('--ion-color-dark'),
				},
			},
			tooltip: {
				appendToBody: true,
				extraCssText: 'width:auto; max-width: 250px; white-space:pre-wrap;',
				textStyle: {
					color: lib.getCssVariableValue('--ion-color-dark'),
				},
				borderColor: lib.getCssVariableValue('--menu-right-border-color'),
				backgroundColor: lib.getCssVariableValue('--main-background-top'),
				confine: true,
			},
			toolbox: {
				show: false,
				orient: 'vertical', //"vertical","horizontal"
				right: 16,
				//itemSize: 25,
				feature: {
					magicType: { type: ['line', 'bar', 'stack'] },
					//saveAsImage: {}
				},
				emphasis: {
					iconStyle: {
						borderColor: lib.getCssVariableValue('--ion-color-primary'),
					},
				},
				iconStyle: {
					//color: lib.getCssVariableValue('--ion-color-primary'),
					borderColor: lib.getCssVariableValue('--ion-color-dark'),
				},
			},
		};
	}

	/** Get chart option by type and view mode */
	getChartOption(
		type: string,
		viewMode: string,
		intervalProperty: string = null,
		intervalType: string,
		dimensions: string[] = null,
		data: any[] = null,
		comparitionData: any[] = null
	): any {
		let fullOption: any = {};
		if (type === 'auto') {
			type = this.suggestChartType(intervalProperty, dimensions, data, comparitionData);
			this.suggestDataSeries(fullOption, type, intervalProperty, intervalType, dimensions, data, comparitionData);
		}

		switch (type) {
			case 'pie':
				Object.assign(fullOption.series, {
					type: 'pie',
					radius: ['40%', '60%'],
					label: {
						show: true,
						formatter: '{b} {d}%',
						color: lib.getCssVariableValue('--ion-color-dark'),
					},
					itemStyle: {
						borderRadius: 3,
						borderColor: 'transparent',
						borderWidth: 1,
					},
				});

				switch (viewMode) {
					case 'dashboard':
						Object.assign(fullOption.series, {
							type: 'pie',
							radius: ['40%', '60%'],
							itemStyle: {
								borderRadius: 2,
								borderColor: 'transparent',
								borderWidth: 1,
							},
						});
						break;
					case 'mini':
						Object.assign(fullOption.series, {
							type: 'pie',
							label: { show: false },
							radius: ['50%', '80%'],
							itemStyle: {
								borderRadius: 0,
								borderColor: 'transparent',
								borderWidth: 1,
							},
						});
						break;
				}

				break;
			case 'bar':
			case 'line':
				fullOption = Object.assign(
					{
						toolbox: { show: true },
						tooltip: {
							trigger: 'axis',
							axisPointer: { type: 'shadow' },
							formatter: function (params) {
								var output = '<div class="e-tooltip"><span class="bold">' + params[0].axisValueLabel + '</span><br/>';
								output += '<table class="w-full">';
								params.reverse().forEach(function (param) {
									const value = param.value;
									if (value !== 0) {
										output += `<tr><td>${param.marker}</td><td>${param.seriesName}</td><td class="e-value">${lib.currencyFormatFriendly(value)}</td></tr>`;
									}
								});
								return output + '</table></div>';
							},
						},

						xAxis: {},
						yAxis: {
							show: true,
							axisLine: { show: false },
							axisLabel: {
								formatter: function (value, index) {
									return lib.currencyFormatFriendly(value);
								},
							},
						},
					},
					fullOption
				);
				Object.assign(fullOption.toolbox, this.eChartsOption.toolbox);
				Object.assign(fullOption.toolbox, { show: true });
				Object.assign(fullOption.tooltip, this.eChartsOption.tooltip);
				Object.assign(fullOption.xAxis, {
					show: true,
					type: 'category',
					axisLine: { show: false },
				});

				switch (viewMode) {
					case 'dashboard':
						break;
					case 'mini':
						Object.assign(fullOption.toolbox, { show: false });
						Object.assign(fullOption.tooltip, { show: false });
						break;
				}

				break;
		}

		return this.mergeDefaultChartOption(fullOption, viewMode);
	}

	mergeDefaultChartOption(option: any, viewMode: string) {
		let defaultOption = { ...this.eChartsOption };

		switch (viewMode) {
			case 'dashboard':
				Object.assign(defaultOption, {
					grid: {
						top: 16,
						right: 16,
						bottom: 16,
						left: 16,
						containLabel: true,
					},
					legend: { show: false },
				});
				break;
			case 'mini':
				Object.assign(defaultOption, {
					grid: {
						top: 8,
						right: 8,
						bottom: 8,
						left: 8,
						containLabel: true,
					},
					toolbox: { show: false },
					legend: { show: false },
				});
				break;
		}

		if (option) {
			Object.assign(defaultOption, option);
		}
		return defaultOption;
	}

	updateSeriesByDimension(option: any, type: string, dimensions: string[]) {
		if (option && dimensions.length > 1) {
			switch (type) {
				// case 'pie':
				//     option.series[0].encode = { value: dimension[1], itemName: dimension[0] };
				//     break;
				case 'bar':
					option.series = [];
					for (let i = 0; i < dimensions.length; i++) {
						if (i > 0) {
							const d = dimensions[i];
							option.series.push({
								type: 'bar',
								seriesLayoutBy: 'row',
								//encode: { x: dimensions[0], y: dimensions[1] }
							});
						}
					}

					break;
				default:
					break;
			}
		}
	}

	setupBarConfig(option: any, x: string, y: string, legendField: string, rawData: any[]) {
		let legendList = rawData.map((d) => {
			return { name: d[legendField] };
		});

		let dataset: any[] = [{ source: rawData }];
		let seriesList = [];

		for (let i = 0; i < legendList.length; i++) {
			const legend = legendList[i];
			dataset.push({
				transform: {
					type: 'filter',
					config: { dimension: legendField, value: legend.name },
				},
			});
			seriesList.push({
				name: legend.name,
				type: 'bar',
				stack: 'stack',
				encode: { x: x, y: y },
				datasetIndex: i + 1,
			});
		}
	}

	suggestChartType(intervalProperty: string, dimensions: string[], data: any[], comparitionData: any[]): string {
		if (!dimensions || dimensions.length < 1) return '';

		const legendProperty = dimensions[0];
		const numIntervals = new Set(data.map((item) => item[intervalProperty])).size;
		const numLegends = new Set(data.map((item) => item[legendProperty])).size;
		const numDataPoints = data.length;

		if (dimensions.length > 2) {
			return 'bar';
		} else if (numLegends === numDataPoints && numIntervals === 1) {
			return 'pie';
		} else if (numDataPoints <= 50) {
			return 'bar';
		} else {
			return 'line';
		}
	}

	suggestDataSeries(fullOption: any, type: string, intervalProperty: string, intervalType: string, dimensions: string[], data: any[], comparitionData: any[]) {
		if (dimensions?.length) {
			let legendProperty = dimensions[0];
			const valueProperty = dimensions[dimensions.length - 1];
			switch (type) {
				case 'pie':
					fullOption.series = [
						{
							type: type,
							radius: ['45%', '60%'],
							data: data.map((item) => {
								return {
									name: item[legendProperty],
									value: item[valueProperty],
								};
							}),
						},
					];

					if (comparitionData?.length)
						fullOption.series.push({
							type: type,
							name: 'Comparition data',
							radius: [0, '30%'],
							label: { show: false },
							labelLine: { show: false },
							data: comparitionData.map((item) => {
								return {
									name: item[legendProperty],
									value: item[valueProperty],
								};
							}),
						});
					break;
				case 'bar':
				case 'line':
					const numInterval = new Set(data.map((item) => item[intervalProperty])).size;

					let categoryProperty = intervalProperty;

					if (numInterval == 1 && dimensions.length > 2) {
						legendProperty = dimensions[1];
						categoryProperty = dimensions[0];
					}

					const numCategories = new Set(data.map((item) => item[categoryProperty])).size;
					const legendData = Array.from(new Set(data.map((item) => item[legendProperty])));

					let xData: any[] = [];
					let series = [];
					if (numCategories > 0) {
						switch (intervalType) {
							case 'HourOfDay':
								xData = [...new Set(data.map((item) => item[categoryProperty]))]; //Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
								break;

							case 'DayOfWeek':
								xData = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
								break;

							case 'MonthOfYear':
								xData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
								break;

							default:
								xData = [...new Set(data.map((item) => item[categoryProperty]))];
								break;
						}

						let idx = 0;
						series = legendData.map((legend) => {
							idx++;
							return {
								name: legend,
								type: type,
								emphasis: { focus: 'series' },
								data: xData.map((x) => {
									//if dimensions.length > 2 then filter by legend and category and sum value
									if (dimensions.length > 2) {
										const its = data.filter(
											(item) => item[legendProperty] === legend && item[categoryProperty]?.toString().toLowerCase() === x?.toString().toLowerCase()
										);
										return its.reduce((a, b) => a + b[valueProperty], 0);
									} else {
										const item = data.find(
											(item) => item[legendProperty] === legend && item[categoryProperty]?.toString().toLowerCase() === x?.toString().toLowerCase()
										);
										return item ? item[valueProperty] : 0;
									}
								}),
							};
						});
					}

					fullOption.xAxis = { type: 'category', data: xData };
					fullOption.series = series;
					break;
			}
		}
	}
}
