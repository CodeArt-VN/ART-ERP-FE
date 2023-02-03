import { Injectable } from '@angular/core';
import { APIList } from './static/global-variable';
import { CommonService, exService } from './core/common.service';
import { SearchConfig } from './static/search-config';
import { Observable } from 'rxjs';
import { lib } from './static/global-functions';
import { EnvService } from './core/env.service';
import { Subject } from 'rxjs';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends exService {
    public reportTracking = new Subject<any>();



    rptGlobal: any = {
        branch: [
            { Id: 16, Code: 'INGROUP', ShowBtn: false, Name: 'INGROUP', IsHidden: false, IsHiddenDetailColumn: true, Color: '#84ff00' }, //Tổng công ty
            { Id: 1, Code: 'METAFOODS', ShowBtn: false, Name: 'MetaFoods', IsHidden: false, IsHiddenDetailColumn: true, Color: '#772727' },
            { Id: 21, Code: 'INHOLDINGS', ShowBtn: false, Name: 'InHoldings', IsHidden: false, IsHiddenDetailColumn: true, Color: '#00ffae' },
            { Id: 22, Code: 'INHOSPITALITY', ShowBtn: false, Name: 'InHospitality', IsHidden: false, IsHiddenDetailColumn: true, Color: '#ff4200' },
            { Id: 23, Code: 'INDEVELOPMENT', ShowBtn: false, Name: 'InDevelopment', IsHidden: false, IsHiddenDetailColumn: true, Color: '#ffe400' },
            { Id: 24, Code: 'WP_PVD', ShowBtn: false, Name: 'Đồng Xuân', IsHidden: false, IsHiddenDetailColumn: true, Color: '#2b9a00' },
            { Id: 25, Code: 'XuanNam', ShowBtn: false, Name: 'Xuân Nam', IsHidden: false, IsHiddenDetailColumn: true, Color: '#ff00ae' },
            { Id: 26, Code: 'MX', ShowBtn: false, Name: 'Mỹ Xuân', IsHidden: false, IsHiddenDetailColumn: true, Color: '#c000ff' },
            { Id: 27, Code: 'WP_HVT', ShowBtn: false, Name: 'PQTM', IsHidden: false, IsHiddenDetailColumn: true, Color: '#FF5733' },
            // { Id: 28, Code: 'InHospitality', ShowBtn: false, Name: 'InHospitality', IsHidden: false, IsHiddenDetailColumn: true, Color: '#ff4200' },
            // { Id: 29, Code: 'InHospitality', ShowBtn: false, Name: 'InHospitality', IsHidden: false, IsHiddenDetailColumn: true, Color: '#ff4200' },
            // { Id: 446, Code: 'MetaFood', ShowBtn: false, Name: 'MetaFoods', IsHidden: false, IsHiddenDetailColumn: true, Color: '#772727' },
            { Id: 467, Code: '06NBK', ShowBtn: false, Name: '06NBK', IsHidden: false, IsHiddenDetailColumn: true, Color: '#5DADE2' }

        ],
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
                        backgroundColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
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
                                fontColor: ()=>lib.getCssVariableValue('--ion-color-primary-contrast') + "aa",
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
                                fontColor: ()=>lib.getCssVariableValue('--ion-color-primary-contrast') + "ee",
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
                        backgroundColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
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
                                fontColor: ()=>lib.getCssVariableValue('--ion-color-primary'),
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
                                color: ()=>lib.getCssVariableValue('--ion-color-primary') + '80',
                                display: true,
                                drawTicks: false,
                                drawBorder: false,
                                zeroLineColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
                            }
                        }
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: ()=>lib.getCssVariableValue('--ion-color-primary'),
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
                borderColor: ()=>lib.getCssVariableValue('--ion-color-primary'),
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
                                return  Intl.NumberFormat().format(value / 1000000.0) + 'M - ' + label;
                            }
                            else {
                                return Intl.NumberFormat().format(value / 1000.0) + 'K - '+ label;
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
                        fontColor: ()=>lib.getCssVariableValue('--ion-color-dark'),
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
                            fontColor: ()=>lib.getCssVariableValue('--ion-color-primary-contrast'),
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

    mockData = [
        {
            "IDBranch": 0,
            "Date": "2020-01-01",
            "Cost": 667243657,
            "FixedCost": 268833935,
            "VariableCost": 398409722,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1472672532,
            "Event": 3,
            "NumberOfGuest": 1211,
            "Corporate": null,
            "Personal": 1472672532
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-02",
            "Cost": 667037703,
            "FixedCost": 278292053,
            "VariableCost": 388745650,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 252390000,
            "Event": 2,
            "NumberOfGuest": 69,
            "Corporate": null,
            "Personal": 252390000
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-03",
            "Cost": 588933274,
            "FixedCost": 265073606,
            "VariableCost": 323859668,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 118920000,
            "Event": 1,
            "NumberOfGuest": 60,
            "Corporate": 118920000,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-04",
            "Cost": 690480657,
            "FixedCost": 272075541,
            "VariableCost": 418405116,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 2479041055,
            "Event": 5,
            "NumberOfGuest": 2086,
            "Corporate": 1701346000,
            "Personal": 777695055
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-05",
            "Cost": 568870367,
            "FixedCost": 267077030,
            "VariableCost": 301793337,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 4303886604,
            "Event": 12,
            "NumberOfGuest": 4175,
            "Corporate": 254488000,
            "Personal": 4049398604
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-06",
            "Cost": 2059488377,
            "FixedCost": 271212030,
            "VariableCost": 1788276347,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3158269946,
            "Event": 9,
            "NumberOfGuest": 3590,
            "Corporate": 148000000,
            "Personal": 3010269946
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-07",
            "Cost": 574981932,
            "FixedCost": 270173791,
            "VariableCost": 304808141,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 842659630,
            "Event": 3,
            "NumberOfGuest": 871,
            "Corporate": 842659630,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-08",
            "Cost": 505514313,
            "FixedCost": 265719038,
            "VariableCost": 239795275,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1131828000,
            "Event": 5,
            "NumberOfGuest": 922,
            "Corporate": 1131828000,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-09",
            "Cost": 495314780,
            "FixedCost": 276007673,
            "VariableCost": 219307107,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1201895000,
            "Event": 4,
            "NumberOfGuest": 1050,
            "Corporate": 676320000,
            "Personal": 525575000
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-10",
            "Cost": 646009419,
            "FixedCost": 268093280,
            "VariableCost": 377916139,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 4827230455,
            "Event": 6,
            "NumberOfGuest": 3735,
            "Corporate": 4827230455,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-11",
            "Cost": 663609975,
            "FixedCost": 273763881,
            "VariableCost": 389846094,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 5105763020,
            "Event": 11,
            "NumberOfGuest": 3643,
            "Corporate": 3964051565,
            "Personal": 1141711455
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-12",
            "Cost": 1412718728,
            "FixedCost": 265503780,
            "VariableCost": 1147214948,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 8095789680,
            "Event": 13,
            "NumberOfGuest": 6669,
            "Corporate": 4963612400,
            "Personal": 3132177280
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-13",
            "Cost": 667907459,
            "FixedCost": 317198880,
            "VariableCost": 350708579,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 5691286324,
            "Event": 16,
            "NumberOfGuest": 6076,
            "Corporate": 1489477600,
            "Personal": 4201808724
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-14",
            "Cost": 523783757,
            "FixedCost": 265031530,
            "VariableCost": 258752227,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 2175644779,
            "Event": 7,
            "NumberOfGuest": 2436,
            "Corporate": 1941485000,
            "Personal": 234159779
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-15",
            "Cost": 960564949,
            "FixedCost": 515981689,
            "VariableCost": 444583260,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3504718500,
            "Event": 6,
            "NumberOfGuest": 2875,
            "Corporate": 3504718500,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-16",
            "Cost": 862199280,
            "FixedCost": 274834280,
            "VariableCost": 587365000,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 4609791055,
            "Event": 9,
            "NumberOfGuest": 3642,
            "Corporate": 4396836500,
            "Personal": 212954555
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-17",
            "Cost": 595876394,
            "FixedCost": 292763266,
            "VariableCost": 303113128,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3433133420,
            "Event": 15,
            "NumberOfGuest": 3056,
            "Corporate": 1862463000,
            "Personal": 1570670420
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-18",
            "Cost": 648720365,
            "FixedCost": 274372767,
            "VariableCost": 374347598,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 5028410215,
            "Event": 15,
            "NumberOfGuest": 4423,
            "Corporate": 4373196402,
            "Personal": 655213813
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-19",
            "Cost": 377369445,
            "FixedCost": 269649794,
            "VariableCost": 107719651,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 5046166477,
            "Event": 15,
            "NumberOfGuest": 4570,
            "Corporate": 2057270000,
            "Personal": 2988896477
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-20",
            "Cost": 1064916805,
            "FixedCost": 654203618,
            "VariableCost": 410713187,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 6956290747,
            "Event": 14,
            "NumberOfGuest": 7092,
            "Corporate": 3425060000,
            "Personal": 3531230747
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-21",
            "Cost": 355104932,
            "FixedCost": 265031280,
            "VariableCost": 90073652,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3716901644,
            "Event": 12,
            "NumberOfGuest": 4526,
            "Corporate": 2379750000,
            "Personal": 1337151644
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-22",
            "Cost": 336537709,
            "FixedCost": 265980280,
            "VariableCost": 70557429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1932078000,
            "Event": 7,
            "NumberOfGuest": 1857,
            "Corporate": 1932078000,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-23",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3137816281,
            "Event": 11,
            "NumberOfGuest": 2394,
            "Corporate": 2540369180,
            "Personal": 597447101
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-24",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 5072109000,
            "Event": 7,
            "NumberOfGuest": 3644,
            "Corporate": 4495709000,
            "Personal": 576400000
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-25",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 4211400346,
            "Event": 13,
            "NumberOfGuest": 3699,
            "Corporate": 4211400346,
            "Personal": null
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-26",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 3922948979,
            "Event": 10,
            "NumberOfGuest": 3599,
            "Corporate": 3744594000,
            "Personal": 178354979
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-27",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 4672586635,
            "Event": 11,
            "NumberOfGuest": 4886,
            "Corporate": 3986396900,
            "Personal": 686189735
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-28",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1002439891,
            "Event": 8,
            "NumberOfGuest": 2640,
            "Corporate": 324269880,
            "Personal": 678170011
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-29",
            "Cost": 334708709,
            "FixedCost": 265031280,
            "VariableCost": 69677429,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 1513624329,
            "Event": 5,
            "NumberOfGuest": 840,
            "Corporate": 1278224329,
            "Personal": 235400000
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-30",
            "Cost": 363343755,
            "FixedCost": 275108680,
            "VariableCost": 88235075,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 566150000,
            "Event": 2,
            "NumberOfGuest": 516,
            "Corporate": 452000000,
            "Personal": 114150000
        },
        {
            "IDBranch": 0,
            "Date": "2020-01-31",
            "Cost": 11856389748,
            "FixedCost": 1416058775,
            "VariableCost": 10440330973,
            "CostTarget": 1417771812,
            "SaleTarget": 2859876314,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-01",
            "Cost": 424740829,
            "FixedCost": 350886483,
            "VariableCost": 73854346,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 688946400,
            "Event": 2,
            "NumberOfGuest": 271,
            "Corporate": null,
            "Personal": 688946400
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-02",
            "Cost": 599251548,
            "FixedCost": 464381918,
            "VariableCost": 134869630,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 252390000,
            "Event": 2,
            "NumberOfGuest": 69,
            "Corporate": null,
            "Personal": 252390000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-03",
            "Cost": 2629244354,
            "FixedCost": 2526151325,
            "VariableCost": 103093029,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-04",
            "Cost": 490909519,
            "FixedCost": 349054645,
            "VariableCost": 141854874,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1701346000,
            "Event": 2,
            "NumberOfGuest": 1056,
            "Corporate": 1701346000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-05",
            "Cost": 427626496,
            "FixedCost": 347354645,
            "VariableCost": 80271851,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2565038000,
            "Event": 5,
            "NumberOfGuest": 1685,
            "Corporate": 254488000,
            "Personal": 2310550000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-06",
            "Cost": 2013413944,
            "FixedCost": 379354645,
            "VariableCost": 1634059299,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1244775000,
            "Event": 3,
            "NumberOfGuest": 940,
            "Corporate": 148000000,
            "Personal": 1096775000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-07",
            "Cost": 596979052,
            "FixedCost": 368025115,
            "VariableCost": 228953937,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 641899500,
            "Event": 2,
            "NumberOfGuest": 371,
            "Corporate": 641899500,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-08",
            "Cost": 467813823,
            "FixedCost": 373440645,
            "VariableCost": 94373178,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1131828000,
            "Event": 5,
            "NumberOfGuest": 922,
            "Corporate": 1131828000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-09",
            "Cost": 424277621,
            "FixedCost": 349008695,
            "VariableCost": 75268926,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 857675000,
            "Event": 2,
            "NumberOfGuest": 630,
            "Corporate": 332100000,
            "Personal": 525575000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-10",
            "Cost": 522441589,
            "FixedCost": 370112461,
            "VariableCost": 152329128,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1354378455,
            "Event": 4,
            "NumberOfGuest": 976,
            "Corporate": 1354378455,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-11",
            "Cost": 571810883,
            "FixedCost": 349314645,
            "VariableCost": 222496238,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 4201557565,
            "Event": 8,
            "NumberOfGuest": 2382,
            "Corporate": 3373641565,
            "Personal": 827916000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-12",
            "Cost": 1341828804,
            "FixedCost": 347104645,
            "VariableCost": 994724159,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 3258547000,
            "Event": 8,
            "NumberOfGuest": 2239,
            "Corporate": 693603000,
            "Personal": 2564944000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-13",
            "Cost": 552410905,
            "FixedCost": 469830145,
            "VariableCost": 82580760,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2721790600,
            "Event": 7,
            "NumberOfGuest": 1986,
            "Corporate": 1489477600,
            "Personal": 1232313000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-14",
            "Cost": 465220558,
            "FixedCost": 371154645,
            "VariableCost": 94065913,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1720035000,
            "Event": 2,
            "NumberOfGuest": 1360,
            "Corporate": 1720035000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-15",
            "Cost": 697178583,
            "FixedCost": 446886397,
            "VariableCost": 250292186,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1828787500,
            "Event": 4,
            "NumberOfGuest": 1000,
            "Corporate": 1828787500,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-16",
            "Cost": 1062941515,
            "FixedCost": 755760136,
            "VariableCost": 307181379,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 3479522000,
            "Event": 6,
            "NumberOfGuest": 1992,
            "Corporate": 3479522000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-17",
            "Cost": 555931966,
            "FixedCost": 383046645,
            "VariableCost": 172885321,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2201680500,
            "Event": 8,
            "NumberOfGuest": 1476,
            "Corporate": 1443063000,
            "Personal": 758617500
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-18",
            "Cost": 603159492,
            "FixedCost": 353696690,
            "VariableCost": 249462802,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 3193106002,
            "Event": 10,
            "NumberOfGuest": 1914,
            "Corporate": 3193106002,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-19",
            "Cost": 369381123,
            "FixedCost": 347163645,
            "VariableCost": 22217478,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 3396595000,
            "Event": 10,
            "NumberOfGuest": 2434,
            "Corporate": 1268470000,
            "Personal": 2128125000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-20",
            "Cost": 689658443,
            "FixedCost": 385812145,
            "VariableCost": 303846298,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2446384000,
            "Event": 5,
            "NumberOfGuest": 2182,
            "Corporate": 2446384000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-21",
            "Cost": 763306855,
            "FixedCost": 728581081,
            "VariableCost": 34725774,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1632940000,
            "Event": 6,
            "NumberOfGuest": 1346,
            "Corporate": 921990000,
            "Personal": 710950000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-22",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1223088000,
            "Event": 5,
            "NumberOfGuest": 1077,
            "Corporate": 1223088000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-23",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2018827000,
            "Event": 8,
            "NumberOfGuest": 1224,
            "Corporate": 1495642000,
            "Personal": 523185000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-24",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 3077555000,
            "Event": 6,
            "NumberOfGuest": 1684,
            "Corporate": 2501155000,
            "Personal": 576400000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-25",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 2349905346,
            "Event": 8,
            "NumberOfGuest": 2149,
            "Corporate": 2349905346,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-26",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1758018000,
            "Event": 5,
            "NumberOfGuest": 1438,
            "Corporate": 1758018000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-27",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 1424822500,
            "Event": 3,
            "NumberOfGuest": 1036,
            "Corporate": 1424822500,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-28",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 44980000,
            "Event": 1,
            "NumberOfGuest": 20,
            "Corporate": 44980000,
            "Personal": null
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-29",
            "Cost": 374489588,
            "FixedCost": 347054645,
            "VariableCost": 27434943,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 602570000,
            "Event": 4,
            "NumberOfGuest": 340,
            "Corporate": 367170000,
            "Personal": 235400000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-30",
            "Cost": 729430484,
            "FixedCost": 689289595,
            "VariableCost": 40140889,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 114150000,
            "Event": 1,
            "NumberOfGuest": 60,
            "Corporate": null,
            "Personal": 114150000
        },
        {
            "IDBranch": 21,
            "Date": "2020-01-31",
            "Cost": 5226949631,
            "FixedCost": 1681791915,
            "VariableCost": 3545157716,
            "CostTarget": 531789677.4,
            "SaleTarget": 1156064516,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-01",
            "Cost": 285627689,
            "FixedCost": 249917507,
            "VariableCost": 35710182,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 783726132,
            "Event": 1,
            "NumberOfGuest": 940,
            "Corporate": null,
            "Personal": 783726132
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-02",
            "Cost": 348295077,
            "FixedCost": 241329202,
            "VariableCost": 106965875,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-03",
            "Cost": 402965313,
            "FixedCost": 265022439,
            "VariableCost": 137942874,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 118920000,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": 118920000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-04",
            "Cost": 382796153,
            "FixedCost": 237329202,
            "VariableCost": 145466951,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 545176361,
            "Event": 2,
            "NumberOfGuest": 60,
            "Corporate": null,
            "Personal": 545176361
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-05",
            "Cost": 397887780,
            "FixedCost": 290102018,
            "VariableCost": 107785762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1614032587,
            "Event": 6,
            "NumberOfGuest": 500,
            "Corporate": null,
            "Personal": 1614032587
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-06",
            "Cost": 380029685,
            "FixedCost": 293400701,
            "VariableCost": 86628984,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1913494946,
            "Event": 6,
            "NumberOfGuest": 1910,
            "Corporate": null,
            "Personal": 1913494946
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-07",
            "Cost": 278154020,
            "FixedCost": 240876202,
            "VariableCost": 37277818,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": 2650,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-08",
            "Cost": 334729366,
            "FixedCost": 237429202,
            "VariableCost": 97300164,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-09",
            "Cost": 335375557,
            "FixedCost": 268457059,
            "VariableCost": 66918498,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 301800000,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": 301800000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-10",
            "Cost": 565219241,
            "FixedCost": 417893503,
            "VariableCost": 147325738,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 3472852000,
            "Event": 2,
            "NumberOfGuest": 360,
            "Corporate": 3472852000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-11",
            "Cost": 345747590,
            "FixedCost": 249942228,
            "VariableCost": 95805362,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 904205455,
            "Event": 2,
            "NumberOfGuest": 2759,
            "Corporate": 590410000,
            "Personal": 313795455
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-12",
            "Cost": 397672281,
            "FixedCost": 305124519,
            "VariableCost": 92547762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 4837242680,
            "Event": 5,
            "NumberOfGuest": 1161,
            "Corporate": 4270009400,
            "Personal": 567233280
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-13",
            "Cost": 460940213,
            "FixedCost": 368556786,
            "VariableCost": 92383427,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 2850314300,
            "Event": 8,
            "NumberOfGuest": 4430,
            "Corporate": null,
            "Personal": 2850314300
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-14",
            "Cost": 463700145,
            "FixedCost": 351023845,
            "VariableCost": 112676300,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 221450000,
            "Event": 2,
            "NumberOfGuest": 3890,
            "Corporate": 221450000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-15",
            "Cost": 337576892,
            "FixedCost": 265564837,
            "VariableCost": 72012055,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1675931000,
            "Event": 2,
            "NumberOfGuest": 196,
            "Corporate": 1675931000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-16",
            "Cost": 694146252,
            "FixedCost": 526107306,
            "VariableCost": 168038946,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1130269055,
            "Event": 3,
            "NumberOfGuest": 1875,
            "Corporate": 917314500,
            "Personal": 212954555
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-17",
            "Cost": 311515026,
            "FixedCost": 272755948,
            "VariableCost": 38759078,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1070099123,
            "Event": 6,
            "NumberOfGuest": 1650,
            "Corporate": 419400000,
            "Personal": 650699123
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-18",
            "Cost": 317890243,
            "FixedCost": 265137371,
            "VariableCost": 52752872,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1835304213,
            "Event": 5,
            "NumberOfGuest": 1080,
            "Corporate": 1180090400,
            "Personal": 655213813
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-19",
            "Cost": 266770200,
            "FixedCost": 239094551,
            "VariableCost": 27675649,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1649571477,
            "Event": 5,
            "NumberOfGuest": 2509,
            "Corporate": 788800000,
            "Personal": 860771477
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-20",
            "Cost": 443957683,
            "FixedCost": 386836734,
            "VariableCost": 57120949,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 2407861357,
            "Event": 6,
            "NumberOfGuest": 2136,
            "Corporate": null,
            "Personal": 2407861357
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-21",
            "Cost": 261589764,
            "FixedCost": 239129202,
            "VariableCost": 22460562,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1119110000,
            "Event": 2,
            "NumberOfGuest": 3170,
            "Corporate": 1119110000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-22",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 708990000,
            "Event": 2,
            "NumberOfGuest": 930,
            "Corporate": 708990000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-23",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1044727180,
            "Event": 2,
            "NumberOfGuest": 780,
            "Corporate": 1044727180,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-24",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1994554000,
            "Event": 1,
            "NumberOfGuest": 960,
            "Corporate": 1994554000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-25",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1861495000,
            "Event": 5,
            "NumberOfGuest": 1960,
            "Corporate": 1861495000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-26",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 1986576000,
            "Event": 4,
            "NumberOfGuest": 1550,
            "Corporate": 1986576000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-27",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 2517264398,
            "Event": 4,
            "NumberOfGuest": 1801,
            "Corporate": 2221944400,
            "Personal": 295319998
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-28",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 67689880,
            "Event": 2,
            "NumberOfGuest": 2040,
            "Corporate": 67689880,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-29",
            "Cost": 257393964,
            "FixedCost": 237329202,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": 50,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-30",
            "Cost": 259113926,
            "FixedCost": 239049164,
            "VariableCost": 20064762,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 452000000,
            "Event": 1,
            "NumberOfGuest": 456,
            "Corporate": 452000000,
            "Personal": null
        },
        {
            "IDBranch": 22,
            "Date": "2020-01-31",
            "Cost": 4724651725,
            "FixedCost": 1313515943,
            "VariableCost": 3411135782,
            "CostTarget": 480885360.9,
            "SaleTarget": 924779540.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-01",
            "Cost": 557679129,
            "FixedCost": 268833935,
            "VariableCost": 288845194,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 783726132,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-02",
            "Cost": 425202198,
            "FixedCost": 278292053,
            "VariableCost": 146910145,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-03",
            "Cost": 347897371,
            "FixedCost": 265073606,
            "VariableCost": 82823765,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-04",
            "Cost": 403158832,
            "FixedCost": 272075541,
            "VariableCost": 131083291,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 118920000,
            "Event": 1,
            "NumberOfGuest": 530,
            "Corporate": null,
            "Personal": 232518694
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-05",
            "Cost": 380812754,
            "FixedCost": 267077030,
            "VariableCost": 113735724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 545176361,
            "Event": 2,
            "NumberOfGuest": 580,
            "Corporate": null,
            "Personal": 124816017
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-06",
            "Cost": 338800094,
            "FixedCost": 271212030,
            "VariableCost": 67588064,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1614032587,
            "Event": 6,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-07",
            "Cost": 308750177,
            "FixedCost": 270173791,
            "VariableCost": 38576386,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1913494946,
            "Event": 6,
            "NumberOfGuest": 500,
            "Corporate": 200760130,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-08",
            "Cost": 313840971,
            "FixedCost": 265719038,
            "VariableCost": 48121933,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-09",
            "Cost": 353127356,
            "FixedCost": 276007673,
            "VariableCost": 77119683,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": 60,
            "Corporate": 42420000,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-10",
            "Cost": 346354553,
            "FixedCost": 268093280,
            "VariableCost": 78261273,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 301800000,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-11",
            "Cost": 345308375,
            "FixedCost": 273763881,
            "VariableCost": 71544494,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 3472852000,
            "Event": 2,
            "NumberOfGuest": 100,
            "Corporate": 0,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-12",
            "Cost": 325446807,
            "FixedCost": 265503780,
            "VariableCost": 59943027,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 904205455,
            "Event": 2,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-13",
            "Cost": 492943272,
            "FixedCost": 317198880,
            "VariableCost": 175744392,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 4837242680,
            "Event": 5,
            "NumberOfGuest": 200,
            "Corporate": null,
            "Personal": 119181424
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-14",
            "Cost": 317041544,
            "FixedCost": 265031530,
            "VariableCost": 52010014,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 2850314300,
            "Event": 8,
            "NumberOfGuest": 880,
            "Corporate": 0,
            "Personal": 234159779
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-15",
            "Cost": 638260708,
            "FixedCost": 515981689,
            "VariableCost": 122279019,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 221450000,
            "Event": 2,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-16",
            "Cost": 386978955,
            "FixedCost": 274834280,
            "VariableCost": 112144675,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1675931000,
            "Event": 2,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-17",
            "Cost": 384231995,
            "FixedCost": 292763266,
            "VariableCost": 91468729,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1130269055,
            "Event": 3,
            "NumberOfGuest": 500,
            "Corporate": null,
            "Personal": 161353797
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-18",
            "Cost": 346504691,
            "FixedCost": 274372767,
            "VariableCost": 72131924,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1070099123,
            "Event": 6,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-19",
            "Cost": 327476318,
            "FixedCost": 269649794,
            "VariableCost": 57826524,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1835304213,
            "Event": 5,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-20",
            "Cost": 703949558,
            "FixedCost": 654203618,
            "VariableCost": 49745940,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1649571477,
            "Event": 5,
            "NumberOfGuest": 1740,
            "Corporate": 978676000,
            "Personal": 1123369390
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-21",
            "Cost": 297918596,
            "FixedCost": 265031280,
            "VariableCost": 32887316,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 2407861357,
            "Event": 6,
            "NumberOfGuest": 2250,
            "Corporate": 338650000,
            "Personal": 626201644
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-22",
            "Cost": 289038004,
            "FixedCost": 265980280,
            "VariableCost": 23057724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1119110000,
            "Event": 2,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-23",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 708990000,
            "Event": 2,
            "NumberOfGuest": 210,
            "Corporate": null,
            "Personal": 74262101
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-24",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1044727180,
            "Event": 2,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-25",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1994554000,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-26",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1861495000,
            "Event": 5,
            "NumberOfGuest": 360,
            "Corporate": null,
            "Personal": 178354979
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-27",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 1986576000,
            "Event": 4,
            "NumberOfGuest": 1810,
            "Corporate": 339630000,
            "Personal": 390869737
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-28",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 2517264398,
            "Event": 4,
            "NumberOfGuest": 2570,
            "Corporate": 211600000,
            "Personal": 678170011
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-29",
            "Cost": 287209004,
            "FixedCost": 265031280,
            "VariableCost": 22177724,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 67689880,
            "Event": 2,
            "NumberOfGuest": 500,
            "Corporate": 911054329,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-30",
            "Cost": 303138104,
            "FixedCost": 275108680,
            "VariableCost": 28029424,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 452000000,
            "Event": 1,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
        {
            "IDBranch": 23,
            "Date": "2020-01-31",
            "Cost": 4900096250,
            "FixedCost": 1416058775,
            "VariableCost": 3484037475,
            "CostTarget": 405096774.2,
            "SaleTarget": 779032258.1,
            "DoanhThu": 0,
            "Event": 0,
            "NumberOfGuest": null,
            "Corporate": null,
            "Personal": null
        },
    ];

    mockPO = [
        {
            "IDBranch": 21,
            "Date": "2019-01-24",
            "CustomerCode": "C04209",
            "CustomerName": "CÔNG TY CỔ PHẦN KINH DOANH BẤT ĐỘNG SẢN CÁT TƯỜNG",
            "Type": "Corporate",
            "DoanhThu": "1,716,970,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-16",
            "CustomerCode": "C03033",
            "CustomerName": "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY DỰNG RICONS",
            "Type": "Corporate",
            "DoanhThu": "1,640,680,936"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-04",
            "CustomerCode": "C00825",
            "CustomerName": "CTY TNHH ĐẦU TƯ XÂY DỰNG UNICONS",
            "Type": "Corporate",
            "DoanhThu": "1,497,184,480"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-11",
            "CustomerCode": "C00902",
            "CustomerName": "VĂN PHÒNG ĐẠI DIỆN NOVARTIS PHARMA SERVICES AG TẠI TP. HCM",
            "Type": "Corporate",
            "DoanhThu": "1,495,018,065"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-12",
            "CustomerCode": "P00624",
            "CustomerName": "Tuấn Anh - Ái My",
            "Type": "Personal",
            "DoanhThu": "1,420,450,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-20",
            "CustomerCode": "C00037",
            "CustomerName": "CÔNG TY CỔ PHẦN GIÁO DỤC QUỐC TẾ VIỆT ÚC",
            "Type": "Corporate",
            "DoanhThu": "1,326,142,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-05",
            "CustomerCode": "P00452",
            "CustomerName": "Ms. Tuyết (Saigon Today)",
            "Type": "Personal",
            "DoanhThu": "1,200,750,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-05",
            "CustomerCode": "P00419",
            "CustomerName": "Thủy Tiên - Anh Duy",
            "Type": "Personal",
            "DoanhThu": "1,109,800,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-16",
            "CustomerCode": "C01830",
            "CustomerName": "TỔNG CÔNG TY CỔ PHẦN BIA – RƯỢU – NƯỚC GIẢI KHÁT SÀI GÒN",
            "Type": "Corporate",
            "DoanhThu": "1,046,390,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-14",
            "CustomerCode": "C03534",
            "CustomerName": "CÔNG TY CỔ PHẦN TẬP ĐOÀN THỜI TRANG THÁI TUẤN",
            "Type": "Corporate",
            "DoanhThu": "956,285,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-27",
            "CustomerCode": "C04218",
            "CustomerName": "CÔNG TY CỔ PHẦN QUỐC TẾ ANH VĂN HỘI VIỆT MỸ",
            "Type": "Corporate",
            "DoanhThu": "948,925,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-12",
            "CustomerCode": "P00556",
            "CustomerName": "Anh Phương - Lan Hương",
            "Type": "Personal",
            "DoanhThu": "939,510,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-19",
            "CustomerCode": "P00496",
            "CustomerName": "Tiến Đạt - Minh Thư",
            "Type": "Personal",
            "DoanhThu": "887,625,000"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-13",
            "CustomerCode": "C04104",
            "CustomerName": "CÔNG TY CỔ PHẨN BẤT ĐỘNG SẢN ĐẠI PHÚC LAND",
            "Type": "Corporate",
            "DoanhThu": "831,727,600"
        },
        {
            "IDBranch": 21,
            "Date": "2019-01-11",
            "CustomerCode": "P00461",
            "CustomerName": "Hồng Trang - Đức Đạt",
            "Type": "Personal",
            "DoanhThu": "827,916,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-12",
            "CustomerCode": "C01103",
            "CustomerName": "COTECONS",
            "Type": "Corporate",
            "DoanhThu": "3,143,160,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-10",
            "CustomerCode": "C02166",
            "CustomerName": "INTEL",
            "Type": "Corporate",
            "DoanhThu": "2,145,930,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-24",
            "CustomerCode": "C00139",
            "CustomerName": "XÂY DỰNG HÒA BÌNH",
            "Type": "Corporate",
            "DoanhThu": "1,994,554,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-27",
            "CustomerCode": "C00313",
            "CustomerName": "VIỆT TIẾN",
            "Type": "Corporate",
            "DoanhThu": "1,787,592,400"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-10",
            "CustomerCode": "C03384",
            "CustomerName": "YEAH 1",
            "Type": "Corporate",
            "DoanhThu": "1,326,922,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-15",
            "CustomerCode": "C02383",
            "CustomerName": "ĐẦU TƯ THÁI BÌNH",
            "Type": "Corporate",
            "DoanhThu": "1,154,373,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-26",
            "CustomerCode": "C00125",
            "CustomerName": "HSBC",
            "Type": "Corporate",
            "DoanhThu": "1,084,394,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-25",
            "CustomerCode": "C03392",
            "CustomerName": " THẾ GIỚI NHÀ",
            "Type": "Corporate",
            "DoanhThu": "935,145,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-12",
            "CustomerCode": "C00812",
            "CustomerName": "GỖ AN CƯỜNG",
            "Type": "Corporate",
            "DoanhThu": "913,918,400"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-19",
            "CustomerCode": "C00690",
            "CustomerName": "COCA COLA",
            "Type": "Corporate",
            "DoanhThu": "788,800,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-01",
            "CustomerCode": "W00568",
            "CustomerName": "Ngọc Bội - Hỷ Bình",
            "Type": "Personal",
            "DoanhThu": "783,726,132"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-23",
            "CustomerCode": "C03056",
            "CustomerName": "Ô TÔ SÀI GÒN",
            "Type": "Corporate",
            "DoanhThu": "756,800,000"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-13",
            "CustomerCode": "W00477",
            "CustomerName": "Bảo Anh - Hoàng Long",
            "Type": "Personal",
            "DoanhThu": "690,363,350"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-20",
            "CustomerCode": "W00509",
            "CustomerName": "Huỳnh Thy - Lê Văn",
            "Type": "Personal",
            "DoanhThu": "606,384,540"
        },
        {
            "IDBranch": 22,
            "Date": "2019-01-11",
            "CustomerCode": "C00794",
            "CustomerName": "KIMBERRLY CLARK",
            "Type": "Corporate",
            "DoanhThu": "590,410,000"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-20",
            "CustomerCode": "PVD47",
            "CustomerName": "CHỊ OANH( DD)",
            "Type": "Personal",
            "DoanhThu": "1,048,265,100"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-20",
            "CustomerCode": "PVD19",
            "CustomerName": "LEGATO",
            "Type": "Corporate",
            "DoanhThu": "978,676,000"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-29",
            "CustomerCode": "PVD22",
            "CustomerName": "KHƠ THỊ",
            "Type": "Corporate",
            "DoanhThu": "911,054,329"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-21",
            "CustomerCode": "PVD49",
            "CustomerName": "QUANG VINH - HOÀNG ANH",
            "Type": "Personal",
            "DoanhThu": "406,391,184"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-27",
            "CustomerCode": "PVD21",
            "CustomerName": "CÔNG TY TNHH DẠ KHÚC (Làm cho Vạn Xuân)",
            "Type": "Corporate",
            "DoanhThu": "339,630,000"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-21",
            "CustomerCode": "PVD20",
            "CustomerName": "DCT",
            "Type": "Corporate",
            "DoanhThu": "338,650,000"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-28",
            "CustomerCode": "PVD55",
            "CustomerName": "HOÀNG TÔN - HẢI YẾN",
            "Type": "Personal",
            "DoanhThu": "275,655,254"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-14",
            "CustomerCode": "PVD44",
            "CustomerName": "GIÁNG HƯƠNG",
            "Type": "Personal",
            "DoanhThu": "234,159,779"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-04",
            "CustomerCode": "PVD41",
            "CustomerName": "ANH  THIỆU",
            "Type": "Personal",
            "DoanhThu": "232,518,694"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-28",
            "CustomerCode": "PVD23",
            "CustomerName": "SỰ KIỆN VIỆT (Làm cho Bcons)",
            "Type": "Corporate",
            "DoanhThu": "211,600,000"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-28",
            "CustomerCode": "PVD57",
            "CustomerName": "XUÂN VINH",
            "Type": "Personal",
            "DoanhThu": "202,125,147"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-07",
            "CustomerCode": "PVD14",
            "CustomerName": "MMT CORPORATION",
            "Type": "Corporate",
            "DoanhThu": "200,760,130"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-26",
            "CustomerCode": "PVD54",
            "CustomerName": "ĐỨC KỲ - THỊ THANH",
            "Type": "Personal",
            "DoanhThu": "178,354,979"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-27",
            "CustomerCode": "PVD59",
            "CustomerName": "NGỌC NGHĨA - THẢO ANH",
            "Type": "Personal",
            "DoanhThu": "164,974,420"
        },
        {
            "IDBranch": 23,
            "Date": "2019-01-17",
            "CustomerCode": "PVD45",
            "CustomerName": "ANH NAM - CHỊ HẰNG",
            "Type": "Personal",
            "DoanhThu": "161,353,797"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-12",
            "CustomerCode": "C01103",
            "CustomerName": "COTECONS",
            "Type": "Corporate",
            "DoanhThu": "3,143,160,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-10",
            "CustomerCode": "C02166",
            "CustomerName": "INTEL",
            "Type": "Corporate",
            "DoanhThu": "2,145,930,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-24",
            "CustomerCode": "C00139",
            "CustomerName": "XÂY DỰNG HÒA BÌNH",
            "Type": "Corporate",
            "DoanhThu": "1,994,554,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-27",
            "CustomerCode": "C00313",
            "CustomerName": "VIỆT TIẾN",
            "Type": "Corporate",
            "DoanhThu": "1,787,592,400"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-24",
            "CustomerCode": "C04209",
            "CustomerName": "CÔNG TY CỔ PHẦN KINH DOANH BẤT ĐỘNG SẢN CÁT TƯỜNG",
            "Type": "Corporate",
            "DoanhThu": "1,716,970,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-16",
            "CustomerCode": "C03033",
            "CustomerName": "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY DỰNG RICONS",
            "Type": "Corporate",
            "DoanhThu": "1,640,680,936"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-04",
            "CustomerCode": "C00825",
            "CustomerName": "CTY TNHH ĐẦU TƯ XÂY DỰNG UNICONS",
            "Type": "Corporate",
            "DoanhThu": "1,497,184,480"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-11",
            "CustomerCode": "C00902",
            "CustomerName": "VĂN PHÒNG ĐẠI DIỆN NOVARTIS PHARMA SERVICES AG TẠI TP. HCM",
            "Type": "Corporate",
            "DoanhThu": "1,495,018,065"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-12",
            "CustomerCode": "P00624",
            "CustomerName": "Tuấn Anh - Ái My",
            "Type": "Personal",
            "DoanhThu": "1,420,450,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-10",
            "CustomerCode": "C03384",
            "CustomerName": "YEAH 1",
            "Type": "Corporate",
            "DoanhThu": "1,326,922,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-20",
            "CustomerCode": "C00037",
            "CustomerName": "CÔNG TY CỔ PHẦN GIÁO DỤC QUỐC TẾ VIỆT ÚC",
            "Type": "Corporate",
            "DoanhThu": "1,326,142,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-05",
            "CustomerCode": "P00452",
            "CustomerName": "Ms. Tuyết (Saigon Today)",
            "Type": "Personal",
            "DoanhThu": "1,200,750,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-15",
            "CustomerCode": "C02383",
            "CustomerName": "ĐẦU TƯ THÁI BÌNH",
            "Type": "Corporate",
            "DoanhThu": "1,154,373,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-05",
            "CustomerCode": "P00419",
            "CustomerName": "Thủy Tiên - Anh Duy",
            "Type": "Personal",
            "DoanhThu": "1,109,800,000"
        },
        {
            "IDBranch": 0,
            "Date": "2019-01-26",
            "CustomerCode": "C00125",
            "CustomerName": "HSBC",
            "Type": "Corporate",
            "DoanhThu": "1,084,394,000"
        }
    ];


    constructor(
        public commonService: CommonService,
        public env: EnvService,

    ) {
        super(APIList.ACCOUNT_ApplicationUser, SearchConfig.getSearchFields('ACCOUNT_ApplicationUser'), commonService);
        //this.rptGlobal.branch = [];
        this.dateQuery('d');
    }

    publishChange(data: any) {
        this.reportTracking.next(data);
    }

    Tracking(): Subject<any> {
        return this.reportTracking;
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

    getData(IDBranch) {
        return this.mockData.filter(d => d.IDBranch == IDBranch && this.rptGlobal.query.fromDate <= d.Date && d.Date <= this.rptGlobal.query.toDate);
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
                hoverBackgroundColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
                color: b.Color,
                IDBranch: b.Id,
                Data: this.getData(b.Id), //raw data
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

        if (this.rptGlobal.query.frequency == 1) {
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

    buildSoLuongTiecChart(canvasElement) {
        let result = new Observable(ob => {
            let datasets = this.buildDataset();


            for (let i = 0; i < datasets.length; i++) {
                const ds = datasets[i];
                ds.showLine = true;
                ds.fill = false;
                ds.data = this.calcSumGroupData(ds, 'Event');
            }

            let ctx = canvasElement.nativeElement.getContext("2d");

            var data = {
                labels: this.timeGroups.map(m => m.Label),
                datasets: datasets,
            };

            let chart = new Chart(ctx, {
                type: 'line',
                options: this.rptGlobal.rptOptions.lineChart,
                data: data,
            });

            ob.next(chart);
        });
        return result;
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



    buildBarChart(chart, ctx, data) {

        //ctx.height = 255;
        // var width = ctx.width;
        // var height = ctx.height;
        ctx = ctx.getContext("2d");

        if (chart != null)
            chart.destroy();

        chart = new Chart(ctx, {
            type: 'bar',
            options: this.rptGlobal.rptOptions.barChart,
            data: data,
        });
    }



    buildPieChart(chart, ctx, data) {
        // ctx.height = 200;
        // ctx.weight = 200;
        // var width = ctx.width;
        // var height = ctx.height;
        ctx = ctx.getContext("2d");

        if (chart != null)
            chart.destroy();

        chart = new Chart(ctx, {
            type: 'pie',
            options: this.rptGlobal.rptOptions.pieChart,
            data: data,
        });


    }

    //// amcharts Code 
    amColumnRoot;
    amPieRoot;
    amGaugeRoot;
    amLineRoot;
    amTwoLevelPieRoot;
    amColumnLineMixRoot;
    amTrendLinesRoot;
    amHighlightingRoot;
    amSortedBarRoot;
    amClusterColumnRoot;
    amStackedBarRoot;
    amStackedColumnRoot;
    amGroupedSortedColumnRoot;
    amMultilevelTreeRoot;

    DisposeChart(chart) {
        if(chart) {
            chart?.dispose();
        }
    }

    newColumnRoot(string) {
        this.DisposeChart(this.amColumnRoot)
        return this.amColumnRoot = am5.Root.new(string);
    }

    newPieRoot(string) {
        this.DisposeChart(this.amPieRoot)
        return this.amPieRoot = am5.Root.new(string);
    }

    newGaugeRoot(string) {
        this.DisposeChart(this.amGaugeRoot)
        return this.amGaugeRoot = am5.Root.new(string);
    }

    newLineRoot(string) {
        this.DisposeChart(this.amLineRoot)
        return this.amLineRoot = am5.Root.new(string);
    }

    newTwoLevelPieRoot(string) {
        this.DisposeChart(this.amTwoLevelPieRoot)
        return this.amTwoLevelPieRoot = am5.Root.new(string);
    }

    newColumnLineMixRoot(string) {
        this.DisposeChart(this.amColumnLineMixRoot)
        return this.amColumnLineMixRoot = am5.Root.new(string);
    }

    newTrendLinesRoot(string) {
        this.DisposeChart(this.amTrendLinesRoot)
        return this.amTrendLinesRoot = am5.Root.new(string);
    }

    newHighlightingRoot(string) {
        this.DisposeChart(this.amHighlightingRoot)
        return this.amHighlightingRoot = am5.Root.new(string);
    }

    newSortedBarRoot(string) {
        this.DisposeChart(this.amSortedBarRoot)
        return this.amSortedBarRoot = am5.Root.new(string);
    }

    newClusterColumnRoot(string) {
        this.DisposeChart(this.amClusterColumnRoot)
        return this.amClusterColumnRoot = am5.Root.new(string);
    }

    newStackedBarRoot(string) {
        this.DisposeChart(this.amStackedBarRoot)
        return this.amStackedBarRoot = am5.Root.new(string);
    }

    newStackedColumnRoot(string) {
        this.DisposeChart(this.amStackedColumnRoot)
        return this.amStackedColumnRoot = am5.Root.new(string);
    }

    newGroupedSortedColumnRoot(string) {
        this.DisposeChart(this.amGroupedSortedColumnRoot)
        return this.amGroupedSortedColumnRoot = am5.Root.new(string);
    }

    newMultilevelTreeRoot(string) {
        this.DisposeChart(this.amMultilevelTreeRoot)
        return this.amMultilevelTreeRoot = am5.Root.new(string);
    }

    AmChartGlobal: any = {
        pieOpt: {
            Chart: {
                // startAngle: 0,  // 
                endAngle: 270,  // Tạo hình vòng tròn (0 >> 360), hoặc tạo thành nửa vòng tròn ( -270 >> 90 )
                // radius: am5.percent(60), // Độ to, nhỏ của vòng tròn pie chart
                // innerRadius: am5.percent(0) // Độ rỗng của pie chart >> để tạo donut chart
            }

        },
        gaugeOpt: {
            Chart: {
                panX: false,
                panY: false,
                startAngle: 160,
                endAngle: 380
            },
            AxisRenderer: {
                innerRadius: -40
            },
            ClockHand: {
                pinRadius: am5.percent(20),
                radius: am5.percent(100),
                bottomWidth: 40
            },
            Label: {
                fill: am5.color(0xffffff),
                centerX: am5.percent(50),
                textAlign: "center",
                centerY: am5.percent(50),
                fontSize: "3em"
            }
        },
        twolevelpieOpt: {

        },
        columnlinemixOpt: {

        },
        trendlinesOpt: {
            Chart: {
                focusable: true,
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX"
            }
        },
        highlightingOpt: {
            Chart: {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                maxTooltipDistance: 0
            }
        },
        stackedbarOpt: {
            Chart: {}
        }
    }




}
