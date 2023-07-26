import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as echarts from "echarts";
import { ChartOptionService } from 'src/app/services/chart-option.sevice';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() title : string
  @Input() data : any
  @Input() type: string
  @Input() label: any
  chartId;

  chartStyle = {
    width: '100%',
    'min-height': '100%',
  }

  constructor(public chartOptionService :ChartOptionService){
    
  }
  ngOnInit() {
    this.chartId =Math.random()
  }
  
  ngAfterViewInit(){
    var chartDom = document.getElementById(this.chartId);
    var myChart = echarts.init(chartDom);

    new ResizeObserver(() => myChart.resize()).observe(chartDom);

    var option = this.chartOptionService.lineChartOption;
    option.xAxis.data = this.label
    option.title.text=this.title
    Object.assign(option,{    
      series: this.getSeries()
    });  
    
    if(this.type=="TemperatureChange"){
      Object.assign(option.yAxis,{
        axisLabel: {
        formatter: '{value} °C',
        }
      })
    }
    if(this.type == "AreaPieces"){
      Object.assign(option.yAxis,{
        boundaryGap: [0, '30%']
      })
    }
    myChart.setOption(option);

  }
  getSeries(){
    var result=[]
    this.data.forEach(element => {
      if(this.type=="BasicLine"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          lineStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="SmoothedLine"){
        let series= {
          name: element.name,
          data: element.data,
          type: 'line',
          smooth: true,
          lineStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="BasicArea"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          areaStyle: {},
          lineStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="StackedLine"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          stack: 'Total',
          lineStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="StackedArea"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          stack: 'Total',
          areaStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="GradientStackedArea"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          stack: 'Total',
          smooth: true,
          showSymbol: false,
          areaStyle: {color: element.color},
          itemStyle: {color: element.color},
        }
        result.push(series)
      }
      if(this.type=="TemperatureChange"){
        let series= {
          name: element.name,          
          data: element.data,
          type: 'line',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        }
        result.push(series)
      }
      
    });
     return result
  }

}
