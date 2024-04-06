import { LineChartComponent } from './line-chart/line-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { TreemapChartComponent } from './treemap-chart/treemap-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { FunnelChartComponent } from './funnel-chart/funnel-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    GaugeChartComponent,
    TreemapChartComponent,
    RadarChartComponent,
    FunnelChartComponent,
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    GaugeChartComponent,
    TreemapChartComponent,
    RadarChartComponent,
    FunnelChartComponent,
  ],
})
export class ShareChartsModule {}
