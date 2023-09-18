import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportConfig } from 'src/app/models/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
	selector: 'app-report-chart',
	templateUrl: './report-chart.component.html',
	styleUrls: ['./report-chart.component.scss'],
})
export class ReportChartComponent implements OnInit {
	/**	Set true when first data come */
	rptLoaded = false;
	isLoading = true;
	/**	Last time load data */
	dataFetchDate: Date;

	/**	Subscript event form data tracking and more */
	_subscriptions: Subscription[] = [];

	/** Report config AND chart option */
	_reportConfig: ReportConfig = null;
	_chartOption: echarts.EChartsOption;
	_dataset = {
		dimensions: [],
		source: []
	};

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
			this._reportConfig = this.rpt.getReportConfig(this._reportId);

			this._subscriptions.push(
				this.rpt.regReportTrackingData(this._reportId).subscribe(ds => {
					this.updateDataset(ds);
					this.rptLoaded = true;
					this.isLoading = false;
	
					console.log('report chart component regReportTrackingData');
					
				})
			);

			setTimeout(() => {
				this.rpt.getReportData(this._reportId);
				this.updateChartOption();
			}, 300);
		}
	}

	/** grid item in dashboard - to set UI responsive */
	_gridItem: any;
	@Input() set gridItem(v){
		this._gridItem = v;
	}

	/** switch between Dimensions */
	@Input() viewDimension: string = 'Count';

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
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	/**
	 * Set chart option by viewMode AND update chart
	 */
	updateChartOption() {
		if (!this._chartOption)
			this._chartOption = {};
		
		Object.assign(this._chartOption, this.viewMode == "mini" ? this.rpt.pieChartMiniOption : this.rpt.pieChartOption);

		if (this.viewDimension) {
			this._dataset.dimensions = [this._reportConfig.CompareBy[0].Property, this.viewDimension];
			this._chartOption.dataset = this._dataset;
		}
		this._chartOption = {...this._chartOption};
		
	}

	/**
	 * Set dataset data
	 * @param ds Data form services
	 */
	updateDataset(ds){
		this.dataFetchDate = ds.dataFetchDate;
		this._dataset.source = ds.data;
		this._dataset = {...this._dataset};

		this._reportConfig.MeasureBy.forEach((m) => {
			m.Value = this._dataset.source.map(x => x[(m.Title || m.Property)]).reduce((a, b) => (+a) + (+b), 0);
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
		this.updateChartOption();
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

		this.updateChartOption();
	}

	/** Open report handle in dashboard */
	@Output() openReport = new EventEmitter();
	onOpenReport() {
		this.isToolPopoverOpen = false;
		setTimeout(() => {
			this.openReport.emit(this.reportId);	
		}, 0);
		
	}

	/** Reload data */
	onReloadData(){
		this.isLoading = true;
		this.rpt.getReportData(this._reportId, true);
	}

}
