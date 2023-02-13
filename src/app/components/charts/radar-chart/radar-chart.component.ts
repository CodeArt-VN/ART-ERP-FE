import { map } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { lib } from 'src/app/services/static/global-functions';
import { EchartsService } from 'src/app/services/echarts.service';
type EChartsOption = echarts.EChartsOption;

@Component({
	selector: 'app-radar-chart',
	templateUrl: './radar-chart.component.html',
	styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnInit {
	@Input() title: string;
	@Input() data: any;
	@Input() type: string;
	@Input() dataLabel: any;
	chartId;

	chartStyle = {
		width: '100%',
		'min-height': '300px',
	}

	constructor(public eChartsService: EchartsService) {
		this.chartId = lib.generateUID();
	}

	ngOnInit() {}
	ngAfterViewInit() {


		var chartDom = document.getElementById(this.chartId);

    	var myChart = echarts.init(chartDom, null, {
      		renderer: 'canvas',
      		useDirtyRect: false,
      		// width: this.chartStyle.width,
      		// height: this.chartStyle.height,
    	});

    	new ResizeObserver(() => myChart.resize()).observe(chartDom);


    	var option: EChartsOption = {};
    	var tempOption = {};

    	var LegendOption: any;

		if (this.type == 'Basic Radar'){
			Object.assign(this.eChartsService.radarChartOpt, this.eChartsService.radarChartOptionGlobal);
			tempOption = this.eChartsService.radarChartOpt;
		}

		Object.assign(option, tempOption);

		option.title['text'] = this.title; 
		option['radar']['indicator'][0] = this.dataLabel;
		option.series[0]['data'] = this.data;
		// option.legend = LegendOption;

		option && myChart.setOption(option);

		myChart.setOption(option);
	}

	getData() {
		var result = [];
		this.data.forEach((element) => {
			if (this.type == 'BasicArea') {
				let data = {
					value: element.data,
					name: element.name,
				};
				result.push(data);
			}
		});
		return result;
	}
}
