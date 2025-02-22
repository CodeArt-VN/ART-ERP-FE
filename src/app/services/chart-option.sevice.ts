import { Injectable } from '@angular/core';
import { lib } from './static/global-functions';

@Injectable({
	providedIn: 'root',
})
export class ChartOptionService {
	ChartOption: echarts.EChartsOption;
	constructor() {
		this.ChartOption = {
			title: {
				text: '',
				//left: 'center',
				//bottom: 0,
				textStyle: {
					color: lib.getCssVariableValue('--ion-color-primary'),
					fontSize: 20,
				},
			},

			backgroundColor: lib.getCssVariableValue('--ion-color-tint'),
		};
	}

	globalChartOption = {
		title: {
			left: 'left',
			textStyle: {
				color: lib.getCssVariableValue('--ion-color-primary'),
				fontSize: 20,
			},
			text: '',
		},
		grid: {
			containLabel: true,
			left: '5%', // small padding
			right: '5%', // small padding
			top: 70, // pixels from top (makes room for legend)
			bottom: 30, // pixels from bottom (makes room for x-axis)
		},
		toolbox: {
			show: true,
			feature: {
				magicType: { type: ['line', 'bar'] },
			},
		},

		tooltip: {
			trigger: 'axis',
		},
		yAxis: {
			type: 'value',
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [],
		},
		backgroundColor: lib.getCssVariableValue('--ion-color-tint'),
	};

	lineChartOption = Object.assign({}, this.globalChartOption);

	gaugeChartOption = Object.assign(
		{},
		{
			series: [
				{
					type: 'gauge',
					startAngle: 90,
					endAngle: -270,
					pointer: {
						show: false,
					},
					progress: {
						show: true,
						overlap: false,
						clip: false,
						itemStyle: {
							borderWidth: 0,
							borderColor: '#464646',
						},
					},
					axisLine: {
						lineStyle: {
							width: 20,
						},
					},
					splitLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
					},
					data: null,
					detail: {
						color: 'inherit',
						formatter: '{value}%',
						fontSize: 20,
					},
				},
			],
		}
	);
}
