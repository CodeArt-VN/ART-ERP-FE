import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { lib } from 'src/app/services/static/global-functions';

import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';

declare var echarts: any;

@Component({
	selector: 'app-e-chart',
	template: '<div style="height: 100%;" [id]="elId"></div>',
	standalone: false,
})
export class EChartComponent implements OnInit {
	elId: string = ''; //Chart element Id
	chart = null; //Chart object

	@Input() chartType: string = 'auto';
	@Input() viewMode: 'full' | 'mini' | 'dashboard';
	@Input() chartOption: any = {};
	@Input() dimensions: string[] = [];
	@Input() viewDimension: string;
	@Input() compareBy: string[] = [];
	@Input() measureBy: string[] = [];
	@Input() dataIntervalProperty: string;
	@Input() dataIntervalType: string;

	@Input() chartScript: string;

	@Input() data: any[] = [];
	@Input() comparitionData: any[] = [];

	constructor(
		public rpt: ReportService,
		public dynamicScriptLoaderService: DynamicScriptLoaderService
	) {
		this.elId = lib.generateCode();
	}

	ngOnInit() {}

	ngAfterViewInit() {
		this.loadEchartLib();
		new ResizeObserver(() => this.chart?.resize()).observe(document.getElementById(this.elId));
	}

	loadEchartLib() {
		if (typeof echarts !== 'undefined') this.initChart();
		else
			this.dynamicScriptLoaderService
				.loadResources(thirdPartyLibs.echart.source)
				.then(() => this.initChart())
				.catch((error) => console.error('Error loading script', error));
	}

	ngOnChanges(changes: any) {
		if (this.chart) {
			if (changes.chartOption && changes.chartOption.currentValue) {
				Object.assign(this.chartOption, changes.chartOption.currentValue);
			}
			this.updateChart();
		}
	}

	ngOnDestroy() {
		this.chart?.dispose();
	}

	initChart() {
		this.chart = echarts.init(document.getElementById(this.elId));
		this.chart.on('click', (params) => {
			this.onChartClick(params);
		});
		this.updateChart();
	}

	updateChart() {
		let finalChartOption = {};
		switch (this.chartType) {
			case 'auto':
				if (this.data.length) {
					finalChartOption = this.rpt.echartDefaultOption.getChartOption(
						this.chartType,
						this.viewMode,
						this.dataIntervalProperty,
						this.dataIntervalType,
						this.dimensions,
						this.data,
						this.comparitionData
					);
				}
				break;

			case 'bar':
			case 'line':
				this.rpt.echartDefaultOption.updateSeriesByDimension(this.chartOption, this.chartType, this.chartOption.dataset['dimensions']);
				finalChartOption = this.chartOption;
				break;
			case 'fixed':
				finalChartOption = this.rpt.echartDefaultOption.mergeDefaultChartOption(this.chartOption, this.viewMode);
				break;
			case 'manual':
				finalChartOption = this.chartOption;
				break;
		}

		if (this.chartScript) {
			finalChartOption = this.calcChartOption(finalChartOption, this.chartScript);
		}

		setTimeout(() => {
			this.chart?.setOption(finalChartOption, true);
		}, 0);
	}

	calcChartOption(option, js: string) {
		let li = lib;
		let ec = echarts;
		eval(js);
		return option;
	}

	@Output() chartClick = new EventEmitter();
	onChartClick(e) {
		this.chartClick.emit(e);
	}

	@Output() dataChange = new EventEmitter();
	outData(e) {
		this.dataChange.emit(e);
	}
}
