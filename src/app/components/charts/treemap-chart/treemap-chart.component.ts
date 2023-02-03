import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EchartsService } from 'src/app/services/echarts-pie.service';
import { lib } from 'src/app/services/static/global-functions';
type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss'],
})
export class TreemapChartComponent implements OnInit {

  containerId = '';
  chartTitle;
  chartSubtext;
  chartData;
  chartSeriesName;
  chartType;
  chartLegend;
  chartStyle = {
    width: 300,
    height: 300,
  }

  @Input() set ChartInfo(value:any) {
    this.containerId = value.Id;
    this.chartTitle = value.Title;
    this.chartSubtext = value.Subtext;
    this.chartSeriesName = value.SeriesName;
    this.chartType = value.Type;
    this.chartStyle = value.Style;
    this.chartLegend = value.Legend;
  }

  @Input() set ChartData(value:any) {
    this.chartData = value;
  }

	constructor(
    public eChartsService: EchartsService,
  ) { }

  ngOnInit() {}

  
  ngAfterViewInit() {
    this.buildTreeChart(this.containerId, this.chartTitle, this.chartSubtext, this.chartSeriesName, this.chartData, this.chartType, this.chartLegend);
  }

	buildTreeChart(divId, chartTitle, chartSubtext, chartSeriesName, chartData, chartType?, showLegend?) {
		var chartDom = document.getElementById(divId);

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

    if (chartType == 'Treemap'){
      Object.assign(this.eChartsService.treeChartOpt, this.eChartsService.treeChartOptionGlobal);
      tempOption = this.eChartsService.treeChartOpt;
    }

    if (showLegend) {
      LegendOption =  { // Tên của các trường dữ liệu
				orient: 'vertical',
        bottom: 'bottom'
			}
    }
    else {
      LegendOption = null;
    }

    Object.assign(option, tempOption);

    option.title['text'] = chartTitle; 
    option.title['subtext'] = chartSubtext;

    option.series[0]['name'] = chartSeriesName;
    option.series[0]['data'] = chartData;

    option.legend = LegendOption;

		option && myChart.setOption(option);
	}

}
