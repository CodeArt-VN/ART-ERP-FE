import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { lib } from 'src/app/services/static/global-functions';
import * as echarts from 'echarts';
@Component({
	selector: 'app-pie-chart',
	template: '<div style="height: 100%;" [id]="elId"></div>',

})
export class EChartComponent implements OnInit {
	elId: string = ''; //Chart element Id
	chart = null; //Chart object

	@Input() chartType: string = 'auto';
	@Input() viewMode: 'full' | 'mini' | 'dashboard';
	@Input() chartOption: echarts.EChartsOption = {};
	@Input() dimensions: string[] = [];
	@Input() viewDimension:string;
	@Input() dataIntervalProperty: string;
	@Input() dataIntervalType: string;

	@Input() chartScript: string;
	
	@Input() data: any[] = [];

	/** Chart dataset 
	 * @deprecated	Not use anymore
	*/
	@Input() set dataset(v: any[]) {
		if (v) {
			this.chartOption.dataset = v;
			this.updateChart();	
		}
	}

	constructor(public rpt: ReportService) {
		this.elId = lib.generateCode();
	}

	ngOnInit() { }

	ngAfterViewInit() {
		var chartDom = document.getElementById(this.elId);
		this.chart = echarts.init(chartDom);
		this.chart.on('click', function (params) {
			console.log(params.name);
		});
		setTimeout(() => {
			this.updateChart();
		}, 0);
		new ResizeObserver(() => this.chart.resize()).observe(chartDom);
	}

	ngOnChanges(changes: any) {
		console.log(changes);
		
		if (changes.chartOption && changes.chartOption.currentValue) {
			Object.assign(this.chartOption, changes.chartOption.currentValue);	
		}


		this.updateChart();
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
		 
		this.chart?.setOption(finalChartOption, true);


	}

	calcChartOption(option : echarts.EChartsOption, js: string ): echarts.EChartsOption{
		
		let li = lib;
		eval(js);
		return option;
	}
}