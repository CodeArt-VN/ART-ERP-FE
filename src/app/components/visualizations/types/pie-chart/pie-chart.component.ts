import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportConfig } from 'src/app/models/options-interface';
import { ReportService } from 'src/app/services/report.service';
import { lib } from 'src/app/services/static/global-functions';
import * as echarts from 'echarts';
@Component({
	selector: 'app-pie-chart',
	templateUrl: './pie-chart.component.html',
	styleUrls: ['./pie-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {
	/** Chart element Id */
	elId: string = '';

	/** Chart object */
	myChart = null;

	/** Chart options */
	_chartOption: echarts.EChartsOption;
	@Input() 
	set chartOption(v : echarts.EChartsOption) {
		if (v) {
			Object.assign(this._chartOption, v);
			this.updateChart();
		}
	}
	
	/** Chart dataset */
	_dataset: any | any[];
	@Input() set dataset(v : any[]) {
		this._chartOption.dataset = v;
		this.updateChart();
	}
	

	constructor(public rpt: ReportService) {
		let defaultOption = {...rpt.pieChartOption};
		if (this._chartOption) {
			Object.assign(defaultOption, this._chartOption);	
		}

		this._chartOption = {...defaultOption};
		this.elId = lib.generateCode();
	}

	ngOnInit() { }

	ngAfterViewInit() {
		var chartDom = document.getElementById(this.elId);
		this.myChart = echarts.init(chartDom);
		this.myChart.on('click', function (params) {
			console.log(params.name);
		});
		setTimeout(() => {
			this.updateChart();
		}, 0);
		new ResizeObserver(() => this.myChart.resize()).observe(chartDom);
	}
	
	updateChart() {
		if (this._chartOption?.dataset) {
			this.myChart?.setOption(this._chartOption);	
		}
		
	}
}
