import { Injectable } from "@angular/core";
import { br } from "@fullcalendar/core/internal-common";
import { DatasetComponentOption, EChartsOption } from "echarts/types/dist/echarts";
import { BIReport } from "src/app/models/options-interface";
import { lib } from "src/app/services/static/global-functions";


@Injectable({
    providedIn: 'root'
})

/** EChart default options */
export class EChartDefaultOption {
    constructor() {


    }

    /** Chart type */
    chartType: 'pie' | 'donut' | 'bar' = 'pie';

    /** Chart view mode */
    viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

    /** Chart options */
    chartOption: echarts.EChartsOption;

    /** default option */

    get eChartsOption(): EChartsOption {
        return {
            backgroundColor: lib.getCssVariableValue('--ion-color-tint'),
            textStyle: {
                color: lib.getCssVariableValue('--ion-color-dark'),
            },
            legend: {
                show: true,
                bottom: 0,
                type: "scroll",
                padding: [16, 16, 16, 16],
                icon: "circle",
                textStyle: { color: lib.getCssVariableValue('--ion-color-dark') }
            },
            tooltip: {
                //appendToBody: true,
                extraCssText: 'width:auto; max-width: 250px; white-space:pre-wrap;',
                textStyle: { color: lib.getCssVariableValue('--ion-color-dark') },
                borderColor: lib.getCssVariableValue('--menu-right-border-color'),
                backgroundColor: lib.getCssVariableValue('--main-background-top'),

            },
            toolbox: {
                show: false,
                orient: "vertical",
                right: 16,
                itemSize: 20,
                feature: {
                    magicType: { type: ["line", "bar", "stack"] },
                    saveAsImage: {}
                },
                iconStyle: {
                    color: lib.getCssVariableValue('--ion-color-primary'),
                    borderColor: lib.getCssVariableValue('--ion-color-primary'),
                }
            },


        }
    }


    /** Get chart option by type and view mode */
    getChartOption(type: string, viewMode: string, intervalProperty: string = null, intervalType: string, dimensions: string[] = null, items: any[] = null): EChartsOption {

        let fullOption: EChartsOption = {};
        if (type === 'auto') {
            type = this.suggestChartType(intervalProperty, dimensions, items);
            this.suggestDataSeries(fullOption, type, intervalProperty, intervalType, dimensions, items);
        }


        switch (type) {
            case 'pie':
                Object.assign(fullOption.series,
                    {
                        type: 'pie', radius: ['40%', '60%'],
                        label: { show: true, formatter: '{b} {d}%', color: lib.getCssVariableValue('--ion-color-dark') },
                        itemStyle: {
                            borderRadius: 3, borderColor: 'transparent', borderWidth: 1
                        }
                    });

                switch (viewMode) {
                    case 'dashboard':
                        Object.assign(fullOption.series,
                            {
                                type: 'pie', radius: ['40%', '60%'],
                                itemStyle: { borderRadius: 2, borderColor: 'transparent', borderWidth: 1 }
                            });
                        break;
                    case 'mini':
                        Object.assign(fullOption.series,
                            {
                                type: 'pie', label: { show: false }, radius: ['50%', '80%'],
                                itemStyle: { borderRadius: 0, borderColor: 'transparent', borderWidth: 1 }
                            });
                        break;
                }

                break;
            case 'bar':
            case 'line':
                fullOption = Object.assign({
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, },
                    xAxis: {},
                    yAxis: { show: true, axisLine: { show: false } },
                }, fullOption);
                Object.assign(fullOption.tooltip, this.eChartsOption.tooltip);
                Object.assign(fullOption.xAxis, { show: true, type: 'category', axisLine: { show: false } });
                break;
        }

        return this.mergeDefaultChartOption(fullOption, viewMode);

    }

    mergeDefaultChartOption(option: EChartsOption, viewMode: string) {
        let defaultOption = { ...this.eChartsOption };

        switch (viewMode) {
            case 'dashboard':
                Object.assign(defaultOption, {
                    grid: { top: 16, right: 16, bottom: 16, left: 16, containLabel: true },
                    legend: { show: false },
                });
                break;
            case 'mini':
                Object.assign(defaultOption, {
                    grid: { top: 8, right: 8, bottom: 8, left: 8, containLabel: true },
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

    updateSeriesByDimension(option: EChartsOption, type: string, dimensions: string[]) {
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
                                seriesLayoutBy: 'row'
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

    setupBarConfig(option: EChartsOption, x: string, y: string, legendField: string, rawData: any[]) {
        let legendList = rawData.map(d => { return { name: d[legendField] } });

        let dataset: DatasetComponentOption[] = [{ source: rawData }];
        let seriesList = [];

        for (let i = 0; i < legendList.length; i++) {
            const legend = legendList[i];
            dataset.push({
                transform: {
                    type: 'filter',
                    config: { dimension: legendField, value: legend.name }
                }
            });
            seriesList.push({
                name: legend.name,
                type: 'bar',
                stack: 'stack',
                encode: { x: x, y: y },
                datasetIndex: i + 1
            });
        }



    }

    suggestChartType(intervalProperty: string, dimensions: string[], items: any[]): string {
        if (!dimensions || dimensions.length < 1)
            return '';

        const legendProperty = dimensions[0];
        const numIntervals = new Set(items.map(item => item[intervalProperty])).size;
        const numLegends = new Set(items.map(item => item[legendProperty])).size;
        const numDataPoints = items.length;

        if (numLegends === numDataPoints && numIntervals === 1 && numDataPoints <= 10) {
            return 'pie';
        } else if (numDataPoints <= 50 && numLegends <= 10) {
            return 'bar';
        } else if (numDataPoints > 100 || numLegends <= 50) {
            return 'line';
        }
    }

    suggestDataSeries(fullOption: EChartsOption, type: string, intervalProperty: string, intervalType: string, dimensions: string[], items: any[]) {
        if (dimensions?.length) {

            const legendProperty = dimensions[0];
            const valueProperty = dimensions[1];
            switch (type) {
                case 'pie':
                    fullOption.series = {
                        type: type,
                        data: items.map((item) => {
                            return {
                                name: item[legendProperty],
                                value: item[valueProperty]
                            };
                        })
                    };
                    break;
                case 'bar':
                case 'line':
                    const numIntervals = new Set(items.map(item => item[intervalProperty])).size;
                    const legendData = Array.from(new Set(items.map(item => item[legendProperty])));

                    let xData: any[] = [];
                    let series = [];
                    if (numIntervals > 1) {
                        switch (intervalType) {
                            case 'HourOfDay':
                                xData = [...new Set(items.map(item => item[intervalProperty]))]; //Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
                                break;

                            case 'DayOfWeek':
                                xData = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
                                break;

                            case 'MonthOfYear':
                                xData = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                                break;

                            default:
                                xData = [...new Set(items.map(item => item[intervalProperty]))];
                                break;
                        }

                        let idx = 0;
                        series = legendData.map(legend => {
                            idx++;
                            return {
                                name: legend,
                                type: type,
                                emphasis: { focus: 'series' },
                                data: xData.map(x => {
                                    const item = items.find(item => item[legendProperty] === legend && item[intervalProperty].toString().toLowerCase() === x.toString().toLowerCase());
                                    return item ? item[valueProperty] : 0;
                                })
                            }
                        });
                    }

                    fullOption.xAxis = { type: 'category', data: xData };
                    fullOption.series = series;
                    break;
            };

        }

    }

}