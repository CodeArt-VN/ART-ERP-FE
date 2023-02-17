import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EchartsService } from 'src/app/services/echarts.service';
import { lib } from 'src/app/services/static/global-functions';
type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.scss'],
})
export class FunnelChartComponent implements OnInit {
  chartId: any;
  @Input() Title: string;
  @Input() Type: string;
  @Input() Data: any;
  @Input() Label: string[];
  Option: echarts.EChartsOption;

  chartStyle = {
    width: '100%',
    'min-height': '300px',
  }

  constructor(public eChartsService: EchartsService,) {
    this.chartId = lib.generateUID();
  }


	ngOnInit() { }

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

    if (this.Type == 'Basic Funnel'){
      Object.assign(this.eChartsService.funnelChartOpt, this.eChartsService.funnelChartOptionGlobal);
      tempOption = this.eChartsService.funnelChartOpt;
    }


    Object.assign(option, tempOption);



    option.legend['data'] = this.Label;
    option.title['text'] = this.Title; 
    option.title['subtext'] = '';

    option.series[0]['name'] = '';
    option.series[0]['data'] = this.Data;

    option.legend = LegendOption;

		option && myChart.setOption(option);
	}
}

