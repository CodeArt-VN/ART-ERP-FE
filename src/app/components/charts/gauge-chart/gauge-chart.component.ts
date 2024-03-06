import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartOptionService } from 'src/app/services/chart-option.sevice';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent implements OnInit {
  @Input() data: any;
  chartId;
  constructor(public chartOptionService: ChartOptionService) {}

  ngOnInit() {
    this.chartId = Math.random();
  }

  ngAfterViewInit() {
    var chartDom = document.getElementById(this.chartId);
    var myChart = echarts.init(chartDom);

    var option = this.chartOptionService.gaugeChartOption;

    option.series[0].data = [
      {
        value: this.data,
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '0%'],
        },
      },
    ];
    myChart.setOption(option);
    new ResizeObserver(() => myChart.resize()).observe(chartDom);
  }
}
