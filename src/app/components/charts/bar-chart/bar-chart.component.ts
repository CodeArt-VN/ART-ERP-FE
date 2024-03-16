import * as echarts from 'echarts';
import { Component, OnInit, Input } from '@angular/core';
import { lib } from 'src/app/services/static/global-functions';
import { ChartOptionService } from 'src/app/services/chart-option.sevice';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  Id: any;
  @Input() Title: string;
  @Input() Type: string;
  @Input() Data: any;
  @Input() Label: string[];
  Option: echarts.EChartsOption;

  chartStyle = {
    width: '100%',
    'min-height': '300px',
  };

  constructor(public chartservice: ChartOptionService) {
    this.Id = lib.generateUID();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.Data.forEach((m) => {
      Object.assign(m, { type: 'bar' });
    });

    this.Option = {};
    this.Option = this.chartservice.ChartOption;
    Object.assign(this.Option.title, { text: this.Title });
    this.Option.tooltip = {};
    this.Option.legend = {};

    if (this.Type == 'background') {
      this.Data.forEach((m) => {
        Object.assign(m, {
          showBackground: true,
          backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
        });
      });
    } else if (this.Type == 'Horizontal Bar') {
      this.Option.xAxis = { type: 'value' };
      this.Option.yAxis = { type: 'category', data: this.Label };
    } else {
      this.Option.xAxis = { type: 'category', data: this.Label };
      this.Option.yAxis = { type: 'value' };
    }

    this.Option.series = this.Data;
    this.Option.legend.show = false;

    let chartDom = document.getElementById(this.Id)!;
    let myChart = echarts.init(chartDom);
    myChart.setOption(this.Option);
    new ResizeObserver(() => myChart.resize()).observe(chartDom);
  }
}
