import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { lib } from 'src/app/services/static/global-functions';
import * as echarts from 'echarts';
@Component({
	selector: 'app-e-chart',
	template: '<div style="height: 100%;" [id]="elId"></div>',

})
export class EChartComponent implements OnInit {
	elId: string = ''; //Chart element Id
	chart = null; //Chart object

	@Input() chartType: string = 'auto';
	@Input() viewMode: 'full' | 'mini' | 'dashboard';
	@Input() chartOption: echarts.EChartsOption = {};
	@Input() dimensions: string[] = [];
	@Input() viewDimension: string;
	@Input() dataIntervalProperty: string;
	@Input() dataIntervalType: string;

	@Input() chartScript: string;

	@Input() data: any[] = [];


	constructor(public rpt: ReportService) {
		this.elId = lib.generateCode();
	}

	ngOnInit() { }

	ngAfterViewInit() {
		console.log('ngAfterViewInit', this.elId);

		var chartDom = document.getElementById(this.elId);
		this.chart = echarts.init(chartDom);
		this.chart.on('click', (params) => {
			this.onChartClick(params);
		});
		setTimeout(() => {
			this.updateChart();
		}, 0);
		new ResizeObserver(() => this.chart.resize()).observe(chartDom);
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

	updateChart() {
		let finalChartOption = {};
		switch (this.chartType) {
			case 'auto':
				if (this.data.length) {
					finalChartOption = this.rpt.echartDefaultOption.getChartOption(this.chartType, this.viewMode, this.dataIntervalProperty, this.dataIntervalType, this.dimensions, this.data);
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
		};

		if (this.chartScript) {
			finalChartOption = this.calcChartOption(finalChartOption, this.chartScript);
		}

		console.log('finalChartOption', finalChartOption);
		setTimeout(() => {
			this.chart?.setOption(finalChartOption, true);
		}, 0);
		


	}

	calcChartOption(option: echarts.EChartsOption, js: string): echarts.EChartsOption {

		let li = lib;
		eval(js);
		return option;
	}

	@Output() chartClick = new EventEmitter();
	onChartClick(e) {
		this.chartClick.emit(e);
	}
}
