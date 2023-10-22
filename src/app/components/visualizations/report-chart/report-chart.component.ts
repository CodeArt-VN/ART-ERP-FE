import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BIReport, ReportDataConfig } from 'src/app/models/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-chart',
	templateUrl: './report-chart.component.html',
	styleUrls: ['./report-chart.component.scss'],
})
export class ReportChartComponent implements OnInit {
	subscriptions: Subscription[] = []; //Subscriptions	
	rptLoaded = false; //Set true when first data come
	isLoading = true; //Show loading when data is loading
	dataFetchDate: Date; //To show last time load data
	dataIntervalProperty: string; //To pass to chart component
	dataIntervalType: string; //To pass to chart component
	rawData: any[] = []; //Raw data from services
	
	reportConfig: BIReport = null; //Report config
	chartType: string = 'auto'; //Chart type
	chartScript: string; //Chart script
	chartOption: echarts.EChartsOption = null; //Chart option
	
	

	/** Set data directly to the component without going through the data subscription */
	@Input() set data(ds){
		if (ds) {
			this.updateDataset(ds);
		}
	}

	/** Report Id to find report config */
	_reportId: number;
	@Input() set reportId(v: number) {
		if (v) {
			this._reportId = v;
			this.reportConfig = this.rpt.getReportConfig(this._reportId);
			this.dataIntervalProperty = this.reportConfig.DataConfig.Interval.Title || this.reportConfig.DataConfig.Interval.Property;
			this.dataIntervalType = this.reportConfig.DataConfig.Interval.Type;
			this.dimensions = this.reportConfig.Dimensions;
			this.viewDimension = this.reportConfig.viewDimension || this.reportConfig.DataConfig.MeasureBy[0].Title || this.reportConfig.DataConfig.MeasureBy[0].Property;
			this.chartScript = this.reportConfig.ChartScript;
			if (this.reportConfig.DataConfig.Schema.Type == 'None') {
				this.chartType = 'fixed';
			}
			if (this.reportConfig.ChartConfig) {
				this.chartOption = this.reportConfig.ChartConfig;	
			}
			
			

			this.subscriptions.push(
				this.rpt.regReportTrackingData(this._reportId).subscribe(ds => {
					this.updateDataset(ds);
					this.rptLoaded = true;
					this.isLoading = false;
	
					console.log('report chart component regReportTrackingData');
					
				})
			);

			setTimeout(() => {
				this.rpt.getReportData(this._reportId);
				this.updateDimensions();
			}, 300);
			if (this.viewDimension) {
				setTimeout(() => {
					this.changeViewDimension.emit(this.viewDimension);	
				}, 0);
				
			}
		}
	}

	/** grid item in dashboard - to set UI responsive */
	_gridItem: any;
	@Input() set gridItem(v){
		this._gridItem = v;
	}

	/** switch between Dimensions */
	@Input() viewDimension: string;

	/** View chart in dashboard or report view */
	@HostBinding('class') @Input() viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

	/**	More toolbar */
	@ViewChild('toolPopover') toolPopover;


	constructor(private env: EnvService, public rpt: ReportService) {
	}

	ngOnInit() { }

	
	ngAfterViewInit() {}

	ngOnDestroy() {
		//Unsubscribe all
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	
	dimensions: string[] = [];
	updateDimensions() {
		if (this.viewDimension) {
			this.dimensions = [this.reportConfig.DataConfig.CompareBy[0].Property, this.viewDimension];
		}
		else {
			this.dimensions = [this.reportConfig.DataConfig.CompareBy[0].Property, this.reportConfig.DataConfig.MeasureBy[0].Property];
		}
	}

	/**
	 * Set dataset data
	 * @param ds Data form services
	 */
	updateDataset(ds){
		if (!ds) return;
		let elements = document.querySelectorAll('.updatedtime-label'+this.reportConfig.Id);
		elements.forEach(element => {
			//element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.classList.add('blink');
            setTimeout(() => {
                element.classList.remove('blink');
            }, 2000);
		});
		this.dataFetchDate = ds.dataFetchDate;
		this.rawData = ds.data;

		this.reportConfig?.DataConfig.MeasureBy.forEach((m) => {
			m.Value = this.rawData.map(x => x[(m.Title || m.Property)]).reduce((a, b) => (+a) + (+b), 0);
		});
	}

	

	/**	Control tool popover */
	isToolPopoverOpen = false;
	presentToolPopover(e: Event) {
		this.toolPopover.event = e;
		this.isToolPopoverOpen = true;
	}

	/**	Delete chart form dashboard event */
	@Output() delete = new EventEmitter();
	onDeleteClick(ev) {
		this.delete.emit(ev);
	}

	/**
	 * Change view dimension
	 * @param v Dimension
	 */
	onViewDimensionChange(v) {
		this.viewDimension = v;
		this.updateDimensions();
		setTimeout(() => {
			this.changeViewDimension.emit(v);
		}, 0);
		
	}
	@Output() changeViewDimension = new EventEmitter();

	/**
	 * Toggle mini and full chart in report view
	 */
	toggleMiniChart() {
		if (this.viewMode == 'mini') {
			this.viewMode = 'full';
		}
		else {
			this.viewMode = 'mini';
		}
	}

	/** Open report handle in dashboard */
	@Output() openReport = new EventEmitter();
	onOpenReport() {
		this.isToolPopoverOpen = false;
		setTimeout(() => {
			this.openReport.emit(this.reportConfig);	
		}, 0);
		
	}

	/** Reload data */
	onReloadData(){
		this.isLoading = true;
		this.rpt.getReportData(this._reportId, true);
	}

	compareObjects(o1: any, o2: any): boolean {
		return JSON.stringify(o1) == JSON.stringify(o2);
	}
}
