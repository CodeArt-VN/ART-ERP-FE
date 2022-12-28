import { ChartOptions } from "chart.js";

export interface ChartDefaultOptions {
    lineChart: ChartOptions;
    barChart: ChartOptions;
    pieChart: ChartOptions;
    dougnutChart: ChartOptions;
    // pieChart: ChartOptions;
    // pieChart: ChartOptions;
  }



//   //https://www.chartjs.org/docs/latest/getting-started/v3-migration.html
//   defaultChartOptions: ChartOptions = {
//     maintainAspectRatio: false,
//     responsive: true,
//     layout: {
//         padding: {
//             right: 20,
//         }
//     },
//     hover: {
//         mode: 'index',
//         intersect: false
//     },
//     elements: {
//         point: {
//             radius: 1,
//             hoverRadius: 4,
//             backgroundColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
//             borderWidth: 1,
//             hoverBorderWidth: 2
//         },
//         line: {
//             borderWidth: 3
//         }
//     },

//     scales: {
//         x: {
//             ticks: {
//                 color: lib.getCssVariableValue('--ion-color-primary-contrast') + "ee",
//                 font: { size: 10 },
//                 //maxTicksLimit: 7,
//                 padding: 7
//             },
//             grid: {
//                 display: false,
//                 //zeroLineColor: "transparent",
//                 drawTicks: false,
//                 drawBorder: false
//             }
//         },
//         y: {
//             ticks: {
//                 color: lib.getCssVariableValue('--ion-color-primary-contrast') + "aa",
//                 font: { size: 10 },
//                 maxTicksLimit: 5,
//                 padding: 10
//             },
//             grid: {
//                 display: false,
//                 drawTicks: true,
//                 drawBorder: false
//             }
//         }
//     },
//     plugins: {
//         title: {
//             display: false,
//         },
//         legend: {
//             display: false,
//             labels: {
//                 color: '#FFF',
//                 usePointStyle: true,
//                 boxWidth: 8,
//             }
//         },
//         tooltip: {
//             mode: 'index',
//             intersect: true,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//     }
// };

// lineChartOptions: ChartOptions = {};

// rptOptions: ChartDefaultOptions = {
//     lineChart: { ...this.defaultChartOptions },
//     barChart: Object.assign({ ...this.defaultChartOptions }, {
//         layout: {
//             padding: {
//                 top: 20,
//             }
//         },
//         elements: {
//             point: {
//                 radius: 0,
//             },
//             line: {
//                 borderWidth: 3
//             }
//         },
//         scales: {
//             x: {
//                 ticks: {
//                     color: ()=>lib.getCssVariableValue('--ion-color-primary'),
//                     font: { size: 8 },
//                     padding: 15
//                 },
//                 grid: {
//                     display: false,
//                     drawTicks: false,
//                     drawBorder: false,
//                 }
//             },
//             y: {
//                 ticks: {
//                     color: ()=>lib.getCssVariableValue('--ion-color-primary'),
//                     font: { size: 8 },
//                     maxTicksLimit: 8,
//                     padding: 20,
//                     callback: function (label, index, labels) {
//                         return label / 1000000 + 'M ₫';
//                     },
//                 },
//                 grid: {
//                     color: ()=>lib.getCssVariableValue('--ion-color-primary') + '80',
//                     display: true,
//                     drawTicks: false,
//                     drawBorder: false,
//                     //zeroLineColor: ()=>lib.getCssVariableValue('--ion-color-primary') + 'e6',
//                 }
//             },

//         },
//         plugins: {
//             tooltip: {
//                 intersect: false,
//                 callbacks: {
//                     label: function (tooltipItem, data) {
//                         return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ₫';   // // << change value format, seperate per 1,000 with ₫ currency.
//                     },
//                 },
//             },
//         },
//     }),
//     pieChart: Object.assign({ ...this.defaultChartOptions }, {
//         borderWidth: 0.1,
//         hoverBorderWidth: 1,

//         plugins: {
//             tooltip: {
//                 enabled: true,
//                 callbacks: {
//                     label: function (tooltipItem, data) {
//                         //var label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' đơn ' + data.labels[tooltipItem.index];
//                         //return label;
//                         var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
//                         var label = data.labels[tooltipItem.index];
//                         if (value >= 1000000) {
//                             return label + ': ' + Intl.NumberFormat().format(value / 1000000.0) + ' triệu';
//                         }
//                         else {
//                             return label + ': ' + Intl.NumberFormat().format(value / 1000.0) + ' K';
//                         }


//                     }
//                 }
//             },
//             datalabels: {
//                 fontsize: 1,
//                 color: '#ffffff',
//                 // innerWidth: 3,
//             },
//             animations: {
//                 tension: {
//                     duration: 1000,
//                     easing: 'linear',
//                     from: 1,
//                     to: 0,
//                 }
//             },
//             labels: {
//                 position: 'outside', // << display data label outside piechart segment
//                 // arc: true,  // << make label curve above piechart segment
//                 textMargin: 6,   // << spacing
//                 // render: 'percentage',  // << display in percent
//                 precision: 1,  // << display same as .toFixed(1), ex: 30.1%
//                 fontSize: 10,
//                 fontStyle: 'bold',
//                 anchor: 'center',
//                 // offset: 10,

//                 // render: (args) => {
//                 // return `${args.label}: ${args.value}%`;
//                 // return `${args.value}`;
//                 // }  // display item Name + Value at the same type (shouldn't use this since names are too long)

//                 render: (args) => {
//                     if (args.percentage < 2.5) {
//                         return '';
//                     }
//                     return args.percentage + '%';
//                 },   // if percentage value smaller than limit, then hide, else display. (to minimize and avoid overlapping datalabels)
//             },
//             afterDraw: function (chart) {
//                 if (chart.data.datasets.length === 0) {
//                     // No data is present
//                     var ctx = chart.chart.ctx;
//                     var width = chart.chart.width;
//                     var height = chart.chart.height
//                     chart.clear();

//                     ctx.save();
//                     ctx.textAlign = 'center';
//                     ctx.textBaseline = 'middle';
//                     ctx.font = "16px normal 'Helvetica Nueue'";
//                     ctx.fillText('No data to display', width / 2, height / 2);
//                     ctx.restore();
//                 }
//             }
//         }
//     }),
//     dougnutChart: Object.assign({ ...this.defaultChartOptions }, {
//         layout: {
//             padding: {
//                 left: 5,
//                 right: 5,
//                 top: 5,
//                 bottom: 5
//             }
//         },
//         elements: {
//     center: {
//       // text: this.centerText,
//       // color: this.chartColors.secondary, // Default is #000000
//       fontStyle: 'Arial', // Default is Arial
//       sidePadding: 20 // Defualt is 20 (as a percentage)
//     }
//   },
//         // cutoutPercentage: 70,
//         // rotation: 1 * Math.PI,
//         // circumference: 1 * Math.PI,
//         animation: {
//             animateScale: true,
//             animateRotate: true
//         },
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     label: function (tooltipItem, data) {
//                         //var label = ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' đơn ' + data.labels[tooltipItem.index];
//                         //return label;
//                         var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
//                         var label = data.labels[tooltipItem.index];
//                         if (value >= 1000000) {
//                             return label + ': ' + Intl.NumberFormat().format(value / 1000000.0) + ' triệu';
//                         }
//                         else {
//                             return label + ': ' + Intl.NumberFormat().format(value / 1000.0) + ' K';
//                         }


//                     }
//                 }
//             },
//             labels: [
//                 {
//                     render: 'label',
//                     position: 'outside',
//                     // outsidePadding: 40,
//                     textMargin: 8
//                     // showZero: true,
//                 },
//                 {
//                     render: 'percentage',
//                     fontColor: '#FFF',
//                     precision: 0,
//                     //arc: true,
//                     //position: 'outside',

//                     position: 'border'

//                 }]
//         }
//     }),
// };