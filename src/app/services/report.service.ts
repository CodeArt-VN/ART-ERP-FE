import { Injectable } from '@angular/core';
import { APIList } from './static/global-variable';
import { CommonService, exService } from './core/common.service';
import { SearchConfig } from './static/search-config';
import { Observable, Subscription } from 'rxjs';
import { lib } from './static/global-functions';
import { EnvService } from './core/env.service';
import { Subject } from 'rxjs';
import { ReportConfig, Schema, TimeConfig } from '../models/options-interface';
import { EChartsOption } from 'echarts';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    public reportDataTracking = new Subject<any>();
    public reportConfigTracking = new Subject<any>();

    //In memory

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

        dayOfWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        monthOfYear: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    };

    schemaList: Schema[] = [
        { Id: 1, Code: 'SaleOrder', Name: 'Sale orders', Type: 'Dataset', ModifiedDate: '2023-01-01' },
        { Id: 1, Code: 'ARInvoice', Name: 'A/R Invoice dataset', Type: 'Dataset', ModifiedDate: '2023-01-01' },
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

    reportList: ReportConfig[] = [
        {
            ReprotInfo: { Id: 1, Code: 'BillStatusReport', Name: 'POS SO Status', Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Icon: 'restaurant', Color: 'danger', Type: 'bar' },
            TimeFrame: { Dimension: 'OrderDate', From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 1 }, To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 } },
            CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
            Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders' },
            Transform: {
                Filter: {
                    Dimension: 'logical', Operator: 'AND',
                    Logicals: [
                        { Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
                        { Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) }, //'Splitted', 'Merged',
                        { Dimension: 'CalcTotal', Operator: '>', Value: '0' },
                        // { Dimension: 'OrderDate', Operator: '>=', Value: '2023-08-19' }, auto from timeframe
                        // { Dimension: 'OrderDate', Operator: '<=', Value: new Date() },
                        {
                            Dimension: 'logical', Operator: 'OR', Logicals: [
                                { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
                                // { Dimension: 'Type', Operator: '=', Value: 'FMCG' },
                            ]
                        },
                    ]
                },
            },
            Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate-Hour' },
            CompareBy: [
                //{ Property: 'IDBranch' },
                { Property: 'Status' },
            ],
            //isGroupByCompareProperties: true, //=> chưa dùng đến
            MeasureBy: [
                { Property: 'Id', Method: 'count', Title: 'Count' },

                // { Property: 'TotalBeforeDiscount', Method: 'sum', Title: 'BeforeDiscount' },
                // { Property: 'TotalDiscount', Method: 'sum', Title: 'TotalDiscount' },
                // { Property: 'TotalAfterDiscount', Method: 'sum', Title: 'AfterDiscount' },
                // { Property: 'Tax', Method: 'sum', Title: 'Tax' },
                // { Property: 'TotalAfterTax', Method: 'sum', Title: 'TotalAfterTax' },
                // { Property: 'Received', Method: 'sum', Title: 'Received' },
                // { Property: 'Debt', Method: 'sum', Title: 'Debt' },
                // { Property: 'CalcTotalAdditions', Method: 'sum', Title: 'Additions' },
                { Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
            ]
        },
        {
            ReprotInfo: { Id: 2, Code: 'BillStatusReport', Name: 'POS SO Status', Remark: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Icon: 'restaurant', Color: 'danger', Type: 'pie' },
            TimeFrame: { Dimension: 'OrderDate', From: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 2 }, To: { Type: 'Relative', IsPastDate: true, Period: 'Day', Amount: 0 } },
            CompareTo: { Type: 'Relative', IsPastDate: true, Period: 'Week', Amount: 1 },
            Schema: { Id: 1, Code: 'SALE_Order', Name: 'Sale orders' },
            Transform: {
                Filter: {
                    Dimension: 'logical', Operator: 'AND',
                    Logicals: [
                        { Dimension: 'IDBranch', Operator: 'IN', Value: this.env.selectedBranchAndChildren },
                        { Dimension: 'Status', Operator: 'IN', Value: JSON.stringify(['New', 'Confirmed', 'Scheduled', 'Picking', 'Delivered', 'Done', 'Cancelled', 'InDelivery']) }, //'Splitted', 'Merged',
                        { Dimension: 'CalcTotal', Operator: '>', Value: '0' },
                        // { Dimension: 'OrderDate', Operator: '>=', Value: '2023-08-19' }, auto from timeframe
                        // { Dimension: 'OrderDate', Operator: '<=', Value: new Date() },
                        {
                            Dimension: 'logical', Operator: 'OR', Logicals: [
                                { Dimension: 'Type', Operator: '=', Value: 'POSOrder' },
                                // { Dimension: 'Type', Operator: '=', Value: 'FMCG' },
                            ]
                        },
                    ]
                },
            },
            Interval: { Property: 'OrderDate', Type: 'Day', Title: 'OrderDate-Hour' },
            CompareBy: [
                //{ Property: 'IDBranch' },
                { Property: 'Status' },
            ],
            //isGroupByCompareProperties: true, //=> chưa dùng đến
            MeasureBy: [
                { Property: 'Id', Method: 'count', Title: 'Count' },

                // { Property: 'TotalBeforeDiscount', Method: 'sum', Title: 'BeforeDiscount' },
                // { Property: 'TotalDiscount', Method: 'sum', Title: 'TotalDiscount' },
                // { Property: 'TotalAfterDiscount', Method: 'sum', Title: 'AfterDiscount' },
                // { Property: 'Tax', Method: 'sum', Title: 'Tax' },
                // { Property: 'TotalAfterTax', Method: 'sum', Title: 'TotalAfterTax' },
                // { Property: 'Received', Method: 'sum', Title: 'Received' },
                // { Property: 'Debt', Method: 'sum', Title: 'Debt' },
                // { Property: 'CalcTotalAdditions', Method: 'sum', Title: 'Additions' },
                { Property: 'CalcTotal', Method: 'sum', Title: 'CalcTotal' },
            ]
        }

    ];

    reportDataTrackingList = [
        // {
        //     schemaId: Number
        //     tracking: Subject
        // }
    ];

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

    pieChartOption: EChartsOption = {
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

    pieChartMiniOption: EChartsOption = {
        toolbox: {show: false},
        legend: { show: false },
        series: {
            type: 'pie',
            label: { show: false },
            radius: ['50%', '80%'],
            itemStyle: { borderRadius: 2, borderColor: 'transparent', borderWidth: 1 }
        }
    };

    constructor(
        public commonService: CommonService,
        public env: EnvService,

    ) {
        Object.assign(this.pieChartOption, this.eChartsOption);

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
    getReportConfig(reportId: number): ReportConfig {
        let reportConfig = this.reportList.find(d => d.ReprotInfo.Id == reportId);
        if (!reportConfig && !reportId)
            this.env.showTranslateMessage('Report with Id=' + reportId + ' not found!', 'danger');

        return reportConfig;
    }

    /**
     * Save report config
     * @param config Report config value
     */
    saveReportConfig(config: ReportConfig) {
        let reportConfig = this.getReportConfig(config.ReprotInfo.Id) || {};
        Object.assign(reportConfig, config);

        //TODO: save to db
    }

    /**
     * Check report has view data
     * @param reportId Report id
     */
    checkNewDataAvailble(reportId: number) {
        //if has new data => call update
        let reportConfig = this.getReportConfig(reportId);

        this.commonService.connect('POST', 'BI/Schema/CheckNewDataAvailble', reportConfig)
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
        let localDataset = this.reportDatasetList.find(d => d.id == reportId);
        let trackingData = this.reportDataTrackingList.find(d => d.id == reportId);
        if (!(localDataset && trackingData)) {
            console.log('Need to regReportTrackingData first');
        }

        if (localDataset.data) {
            trackingData.tracking.next(localDataset);
        }


        //if there is no data => check local storage
        if (checkNewData || !localDataset.data) {

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

        reportConfig.Schema.DataFetchDate = localDataset.dataFetchDate;

        this.commonService.connect('POST', 'BI/Schema/QueryReportData', reportConfig)
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


    runTestReport(config: ReportConfig){
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
