import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { EchartsService } from 'src/app/services/echarts.service';
import { lib } from 'src/app/services/static/global-functions';
type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-pie-chart-old',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  containerId = '';
  chartTitle;
  chartSubtext;
  chartData;
  chartSeriesName;
  chartType;
  chartLegend;
  chartItemLabel;
  chartColorTemplate;
  chartStyle = {
    width: 300,
    height: 300,
  };

  @Input() set ChartInfo(value: any) {
    this.containerId = value.Id;
    this.chartTitle = value.Title;
    this.chartSubtext = value.Subtext;
    this.chartSeriesName = value.SeriesName;
    this.chartType = value.Type;
    this.chartStyle = value.Style;
    this.chartLegend = value.Legend;
    this.chartItemLabel = value.ItemLabel;
    this.chartColorTemplate = value.ColorTemplate;
  }

  @Input() set ChartData(value: any) {
    this.chartData = value;
  }

  constructor(public eChartsService: EchartsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.buildPieChart(
      this.containerId,
      this.chartTitle,
      this.chartSubtext,
      this.chartSeriesName,
      this.chartData,
      this.chartType,
      this.chartLegend,
      this.chartItemLabel,
    );
  }

  buildPieChart(divId, chartTitle, chartSubtext, chartSeriesName, chartData, chartType?, showLegend?, showItemLabel?) {
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

    if (chartType == 'Pie') {
      Object.assign(this.eChartsService.pieChartOpt, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.pieChartOpt;
    } else if (chartType == 'Doughnut') {
      Object.assign(this.eChartsService.doughnutChartOpt, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.doughnutChartOpt;
    } else if (chartType == 'Customized Pie') {
      Object.assign(this.eChartsService.customizedPieChartOpt, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.customizedPieChartOpt;
    } else if (chartType == 'Texture On Pie') {
      Object.assign(this.eChartsService.textureOnPieChartOpt, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.textureOnPieChartOpt;
    } else if (chartType == 'Nightingale Chart') {
      Object.assign(this.eChartsService.nightingaleChart, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.nightingaleChart;
    } else if (chartType == 'customDoughnut') {
      Object.assign(this.eChartsService.customDoughnutChartOpt, this.eChartsService.pieChartOptionGlobal);
      tempOption = this.eChartsService.customDoughnutChartOpt;
    }

    if (showLegend) {
      LegendOption = {
        // Tên của các trường dữ liệu
        orient: 'vertical',
        bottom: 'bottom',
      };
    } else {
      LegendOption = null;
    }

    Object.assign(option, tempOption);

    if (!showItemLabel) {
      option.series[0]['label']['show'] = false;
      option.series[0]['labelLine']['show'] = false;
    } else {
      option.series[0]['label']['show'] = true;
      option.series[0]['labelLine']['show'] = true;
    }

    if (chartType == 'customDoughnut') {
      Object.assign(option, { tooltip: null });
    }

    if (this.chartColorTemplate) {
      option.color = this.chartColorTemplate;
    }

    option.title['text'] = chartTitle;
    option.title['subtext'] = chartSubtext;

    option.series[0]['name'] = chartSeriesName;
    option.series[0]['data'] = chartData;

    option.legend = LegendOption;

    option && myChart.setOption(option);
  }
}
