import { LineChartComponent } from './line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { TreemapChartComponent } from './treemap-chart/treemap-chart.component';



@NgModule({
	imports: [ CommonModule ],
	declarations: [
    	PieChartComponent, LineChartComponent, BarChartComponent, GaugeChartComponent, TreemapChartComponent
	],
	exports: [
		PieChartComponent, LineChartComponent, BarChartComponent, GaugeChartComponent, TreemapChartComponent
	],
})
export class ShareChartsModule { }
