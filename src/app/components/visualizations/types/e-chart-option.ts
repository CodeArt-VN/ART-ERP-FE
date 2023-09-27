import { Injectable } from "@angular/core";
import { DatasetComponentOption, EChartsOption } from "echarts/types/dist/echarts";
import { lib } from "src/app/services/static/global-functions";


@Injectable({
    providedIn: 'root'
})

/** EChart default options */
export class EChartDefaultOption {

    /**
     *
     */
    constructor() {


    }

    /** Chart type */
    chartType: 'pie' | 'donut' | 'bar' = 'pie';

    /** Chart view mode */
    viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

    /** Chart options */
    chartOption: echarts.EChartsOption;

    /** default option */
    eChartsOption: EChartsOption = {
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
            appendToBody: true,
            extraCssText: 'width:auto; max-width: 250px; white-space:pre-wrap;',
            textStyle: {
                color: lib.getCssVariableValue('--ion-color-dark'),
            },
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
        }
    }

    /** Pie chart full option */
    pieChartFullOption: EChartsOption = {
        series: {
            type: 'pie',
            label: { show: true },
            radius: ['40%', '60%'],
            itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 1 }
        }
    };

    /** Pie chart dashboard option */
    pieChartDashboardOption: EChartsOption = {
        legend: {
            show: false,
        },
        series: {
            type: 'pie',
            label: { show: true },
            radius: ['40%', '60%'],
            itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 1 }
        }
    };

    /** Pie chart mini option */
    pieChartMiniOption: EChartsOption = {
        toolbox: { show: false },
        legend: { show: false },
        series: {
            type: 'pie',
            label: { show: false },
            radius: ['50%', '80%'],
            itemStyle: { borderRadius: 2, borderColor: 'transparent', borderWidth: 1 }
        }
    };

    /** Bar chart full option */
    barChartFullOption: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {

        },
        series: [
            { type: 'bar' },
        ],
    };

    /** Bar chart dashboard option */
    barChartDashboardOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
            },
        ],
    };

    /** Bar chart mini option */
    barChartMiniOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
            },
        ],
    };

    /** Get chart option by type and view mode */
    getChartOption(type: string, viewMode: string): EChartsOption {
        let option = { ...this.eChartsOption };

        switch (type) {
            case 'pie':
                switch (viewMode) {
                    case 'full':
                        Object.assign(option, this.pieChartFullOption);
                        break;
                    case 'mini':
                        Object.assign(option, this.pieChartMiniOption);
                        break;
                    case 'dashboard':
                        Object.assign(option, this.pieChartDashboardOption);
                        break;
                    default:
                        break;
                }
                break;
            case 'bar':
                switch (viewMode) {
                    case 'full':
                        Object.assign(option, this.barChartFullOption);
                        break;
                    case 'mini':
                        Object.assign(option, this.barChartMiniOption);
                        break;
                    case 'dashboard':
                        Object.assign(option, this.barChartDashboardOption);
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;

        }

        console.log(option);

        return option;

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

    setupBarConfig(option: EChartsOption, x:string, y:string, legendField: string, rawData: any[]) {
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
                datasetIndex: i+1
            });
        }
        

        
    }


}