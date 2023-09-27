import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportDataConfig } from 'src/app/models/options-interface';
import { ReportService } from 'src/app/services/report.service';
import { lib } from 'src/app/services/static/global-functions';
import * as echarts from 'echarts';
@Component({
	selector: 'app-pie-chart',
	template: '<div style="height: 100%;" [id]="elId"></div>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EChartComponent implements OnInit {
	@Input() chartType: 'pie' | 'donut' | 'bar' = 'pie';
	@Input() chartOption: echarts.EChartsOption = {};

	/** Chart element Id */
	elId: string = '';

	/** Chart object */
	chart = null;


	

	
	

	/** Chart dataset */
	@Input() set dataset(v: any[]) {
		this.chartOption.dataset = v;
		this.updateChart();
	}

	/** Chart view mode */
	_viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';
	@Input() set viewMode(v: 'full' | 'mini' | 'dashboard') {
		this._viewMode = v;
		this.getChartOption();
		this.updateChart();
	}

	/** get chart option by view mode */
	getChartOption() {
		let defaultOption = this.rpt.echartDefaultOption.getChartOption(this.chartType, this._viewMode);

		if (this.chartOption) {
			Object.assign(defaultOption, this.chartOption);
		}

		this.chartOption = { ...defaultOption };
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
		if (changes.chartOption) {
			Object.assign(this.chartOption, changes.chartOption.currentValue);
			this.updateChart();
		}
	}

	ngOnDestroy() {
		this.chart?.dispose();
	}

	updateChart() {
		if (this.chartOption?.dataset) {
			this.rpt.echartDefaultOption.updateSeriesByDimension(this.chartOption, this.chartType, this.chartOption.dataset['dimensions']);
			this.chart?.setOption(this.chartOption);
		}
	}
}
