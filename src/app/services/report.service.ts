import { Injectable } from '@angular/core';
import { APIList } from './static/global-variable';
import { CommonService, exService } from './core/common.service';
import { SearchConfig } from './static/search-config';
import { Observable } from 'rxjs';
import { lib } from './static/global-functions';
import { EnvService } from './core/env.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends exService {
    public reportTracking = new Subject<any>();

    commonOptions = {
        /**
         * Timeframe is the period in which BI will examine all your data during that time frame
         * Can use relate date like '-90' 90 days ago
         * or absolute date linke '2023-08-01'
         */
        timeframe: [
            { code: '-0', name: 'Today' },
            { code: '-1', name: 'Yesterday' },
            { code: '-2', name: '2 days ago' },
            { code: '-7', name: '7 days ago' },
            { code: '-30', name: '30 days ago' },
            { code: '-90', name: '90 days ago' },
        ],

        /**
         * The comparison to compare the results of the chart to a previous period
         */
        compareTo: [
            { code: '-1D', name: 'Previous day' },
            { code: '-1W', name: 'Previous week' },
            { code: '-2W', name: 'Previous 2 weeks' },
            { code: '-1M', name: 'Previous month' },
            { code: '-1Q', name: 'Previous quater' },
            { code: '-1Y', name: 'Previous year' },
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
            { code: 'Text', name: 'Text', icon: '', disabled: true },
            { code: '=', name: 'is', icon: '' },
            { code: 'contains', name: 'contains', icon: '' },
            { code: 'Text', name: 'starts with', icon: '' },
            { code: 'Text', name: 'ends with', icon: '' },
            { code: 'Text', name: 'is not', icon: '' },
            { code: 'Text', name: 'does not contain', icon: '' },
            { code: 'Text', name: 'does not start with', icon: '' },
            { code: 'Text', name: 'does not end with', icon: '' },
            { code: 'Text', name: 'matches regexp', icon: '' },

            { code: 'Text', name: 'Number', icon: '', disabled: true },
            { code: 'Text', name: 'equals', icon: '' },
            { code: 'Text', name: 'greater than', icon: '' },
            { code: 'Text', name: 'less than', icon: '' },
            { code: 'Text', name: 'greater than or equals', icon: '' },
            { code: 'Text', name: 'less than or equals', icon: '' },
            { code: 'Text', name: 'does not equal', icon: '' },

            { code: 'Text', name: 'Boolean', icon: '', disabled: true },
            { code: 'Text', name: 'true', icon: '' },
            { code: 'Text', name: 'false', icon: '' }
        ],

        measureMethod: [
            { code: 'count', name: 'Count {0}', icon: '' },
            { code: 'sum', name: 'Sum of {0}', icon: '' },
            { code: 'max', name: 'Max of {0}', icon: '' },
            { code: 'min', name: 'Min of {0}', icon: '' },
            { code: 'average', name: 'Average {0}', icon: '' },
        ],

        dayOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        monthOfYear: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    };

    schemaList = [
        {
            Id: 1, Code: 'ARInvoice', Name: 'A/R Invoice dataset', ModifiedDate: '2023-01-01', LastData: '2023-01-01',
            Columns: [
                { Id: 1, Code: 'Status', Name: 'A/R invoice status', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
                { Id: 1, Code: 'Count', Name: 'Count of documents', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
                { Id: 1, Code: 'Total', Name: 'Sum of total', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },
                { Id: 1, Code: 'Discount', Name: 'Sum of discount', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' },

                //Sample dataset: [{Status: 'New', Count: 37, Total: 23000000, Discount: 9800000}]
            ]
        }
    ];

    datasetManage = {
        lastSchemaModifiedDate: '2023-01-01',

    };



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
