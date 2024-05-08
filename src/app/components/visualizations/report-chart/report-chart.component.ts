import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  compareBy: string[] = []; //Compare by to pass to chart component
  measureBy: string[] = []; //Measure by to show card row and pass to chart component
  rawData: any[] = []; //Raw data from services
  comparitionData: any[] = []; //Comparition data

  report: BIReport = null; //Report config

  chartType: string = 'auto'; //Chart type
  chartScript: string; //Chart script
  chartOption: echarts.EChartsOption = null; //Chart option

  /** Set data directly to the component without going through the data subscription */
  @Input() set data(ds) {
    if (ds) {
      this.updateDataset(ds);
    }
  }

  /** Report Id to find report config */
  _reportId: number;
  @Input() set reportId(v: number) {
    if (v) {
      if (!this._reportId || this._reportId != v) {
        setTimeout(() => {
          if (this.viewDimension) this.changeViewDimension.emit(this.viewDimension);
          this.rpt.getReportData(this._reportId);
        }, 300);
      }

      this._reportId = v;
      let temp = this.rpt.getReport(this._reportId);
      this.report = JSON.parse(JSON.stringify(temp));
      this.buildForm(this.report.DataConfig);
      this.compareBy = this.report.DataConfig.CompareBy.map((x) => x.Title || x.Property);
      this.measureBy = this.report.DataConfig.MeasureBy.map((x) => x.Title || x.Property);
      this.dataIntervalProperty = this.report.DataConfig.Interval?.Title || this.report.DataConfig.Interval?.Property;
      this.dataIntervalType = this.report.DataConfig.Interval.Type;

      if (this.report.Dimensions?.length > 0) this.dimensions = this.report.Dimensions;
      else this.updateDimensions();

      if (!this.viewDimension || !this.dimensions.includes(this.viewDimension)) {
        this.viewDimension =
          this.report.viewDimension ||
          this.report.DataConfig.MeasureBy[0]?.Title ||
          this.report.DataConfig.MeasureBy[0]?.Property;
      }

      this.chartScript = this.report.ChartScript;

      if (!this.report.DataConfig.Schema.Id) {
        this.rptLoaded = true;
        this.isLoading = false;
      }

      if (this.report.DataConfig.Schema.Type == 'None' || this.report?.ChartConfig?.series) {
        this.chartType = 'fixed';
      }
      if (this.report.ChartConfig) {
        this.chartOption = this.report.ChartConfig;
      }
    }
  }

  /** grid item in dashboard - to set UI responsive */
  _gridItem: any;
  @Input() set gridItem(v) {
    this._gridItem = v;
    console.log('gridItem', v);
    if (this._gridItem?.WidgetConfig?.ViewDimension) {
      this.onViewDimensionChange(this._gridItem.WidgetConfig.ViewDimension);
    }
  }

  /** switch between Dimensions */
  @Input() viewDimension: string;

  /** View chart in dashboard or report view */
  @HostBinding('class') @Input() viewMode: 'full' | 'mini' | 'dashboard' = 'dashboard';

  /**	More toolbar */
  @ViewChild('toolPopover') toolPopover;

  constructor(
    private env: EnvService,
    public rpt: ReportService,
    public formBuilder: FormBuilder,
  ) {

    

  }

  ngOnInit() {
    this.subscriptions.push(
      this.rpt.regReportTrackingData(this._reportId).subscribe((ds) => {
        this.updateDataset(ds);
        this.rptLoaded = true;
        this.isLoading = false;
      }),
    );

    this.subscriptions.push(
      this.rpt.reportConfigTracking.subscribe((reportId) => {
        if (reportId == this._reportId || !this._reportId) {
          this.reportId = reportId;
        }
      }),
    );

    this.subscriptions.push(
      this.env.getEvents().subscribe((data) => {
        if (data.Code == 'changeBranch') {
          this.onReloadData();
        }
      }),
    );
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    //Unsubscribe all
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  dimensions: string[] = [];
  updateDimensions() {
    if (this.report.DataConfig.CompareBy.length > 0) {
      this.dimensions = this.report.DataConfig.CompareBy.map((x) => x.Title || x.Property);
      if (this.viewDimension) {
        this.dimensions.push(this.viewDimension);
      } else if (this.report.DataConfig.MeasureBy.length) {
        this.dimensions.push(this.report.DataConfig.MeasureBy[0].Title || this.report.DataConfig.MeasureBy[0].Property);
      }
    }

    // if (this.viewDimension && this.report.DataConfig.CompareBy.length > 0) {
    // 	this.dimensions = [
    // 		(this.report.DataConfig.CompareBy[0].Title || this.report.DataConfig.CompareBy[0].Property),
    // 		this.viewDimension
    // 	];
    // }
    // else if (this.report.DataConfig.CompareBy.length > 0 && this.report.DataConfig.MeasureBy.length > 0) {
    // 	this.dimensions = [
    // 		(this.report.DataConfig.CompareBy[0].Title || this.report.DataConfig.CompareBy[0].Property),
    // 		(this.report.DataConfig.MeasureBy[0].Title || this.report.DataConfig.MeasureBy[0].Property)
    // 	];
    // }
  }

  /**
   * Set dataset data
   * @param ds Data form services
   */
  updateDataset(ds) {
    if (!ds) return;
    let elements = document.querySelectorAll('.updatedtime-label' + this.report.Id);
    elements.forEach((element) => {
      //element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add('blink');
      setTimeout(() => {
        element.classList.remove('blink');
      }, 2000);
    });
    this.dataFetchDate = ds.dataFetchDate;
    this.rawData = ds.data;
    this.comparitionData = ds.comparitionData || [];

    this.report?.DataConfig.MeasureBy.forEach((m) => {
      m.Value = this.rawData.map((x) => x[m.Title || m.Property]).reduce((a, b) => +a + +b, 0);
      m.ComparitionValue = this.comparitionData.map((x) => x[m.Title || m.Property]).reduce((a, b) => +a + +b, 0);
      if (!m.ComparitionValue) m.ComparitionValue = 0;
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
    } else {
      this.viewMode = 'mini';
    }
  }

  /** Open report handle in dashboard */
  @Output() openReport = new EventEmitter();
  onOpenReport() {
    this.isToolPopoverOpen = false;
    setTimeout(() => {
      this.openReport.emit(this.report);
    }, 0);
  }

  /** Reload data */
  onReloadData() {
    this.isLoading = true;
    this.rpt.getReportData(this._reportId, true);
  }

  compareObjects(o1: any, o2: any): boolean {
    return JSON.stringify(o1) == JSON.stringify(o2);
  }

  @Output() chartClick = new EventEmitter();
  onChartClick(e) {
    this.chartClick.emit(e);
  }

  @Output() dataChange = new EventEmitter();
  onDataChange(e) {
    this.dataChange.emit(e);
  }

  @ViewChild('popover') popover;
  isOpenDatePicker = false;
  isOpenCompareBy = false;
  pickerControl: any;
  pickerGroupName: string;

  presentDatePicker(event, control, groupName) {
    this.pickerGroupName = groupName;
    this.pickerControl = control;
    this.popover.event = event;
    this.calcAbsoluteDate(groupName == 'TimeFrame-To');
    this.isOpenDatePicker = true;
  }

  dismissDatePicker(apply: boolean = false) {
    if (!this.isOpenDatePicker) return;

    if (!apply) {
      this.form.patchValue(this.report?.DataConfig);
    } else {
      this.report.DataConfig = this.form.getRawValue();
      this.onChangeTimeRange(this.report.DataConfig);
    }
    this.isOpenDatePicker = false;
  }

  calcAbsoluteDate(isFullfillDate = false) {
    if (this.pickerControl.controls.Type.value == 'Relative') {
      let tempDate = this.rpt.calcTimeValue(this.pickerControl.getRawValue(), isFullfillDate);
      if (tempDate) {
        this.pickerControl.controls.Value.value = tempDate.toJSON();
      }
    }
  }

  pickDate(pDate) {
    if (this.pickerControl.controls.Type.value != pDate.Type) {
      this.pickerControl.controls.Type.setValue(pDate.Type);
      this.pickerControl.controls.Type.markAsDirty();
    }

    if (pDate.Type == 'Relative') {
      if (this.pickerControl.controls.IsPastDate.value != pDate.IsPastDate) {
        this.pickerControl.controls.IsPastDate.setValue(pDate.IsPastDate);
        this.pickerControl.controls.IsPastDate.markAsDirty();
      }
      if (this.pickerControl.controls.Period.value != pDate.Period) {
        this.pickerControl.controls.Period.setValue(pDate.Period);
        this.pickerControl.controls.Period.markAsDirty();
      }
      if (this.pickerControl.controls.Amount.value != pDate.Amount) {
        this.pickerControl.controls.Amount.setValue(pDate.Amount);
        this.pickerControl.controls.Amount.markAsDirty();
      }
      this.calcAbsoluteDate(this.pickerGroupName == 'TimeFrame-To');
    } else {
      if (this.pickerControl.controls.Value.value != pDate.Value.detail.value) {
        this.pickerControl.controls.Value.setValue(pDate.Value.detail.value);
        this.pickerControl.controls.Value.markAsDirty();
      }
    }
  }

  segmentTimeframeChanged(e) {
    this.pickerControl.controls.Type.value = e.detail.value;
  }


  form: FormGroup;

  buildForm(c: ReportDataConfig) {
    this.form = this.formBuilder.group({
      TimeFrame: this.formBuilder.group({
        From: this.formBuilder.group({
          Type: [c.TimeFrame?.From?.Type],
          IsPastDate: [c.TimeFrame?.From?.IsPastDate],
          Period: [c.TimeFrame?.From?.Period],
          Amount: [c.TimeFrame?.From?.Amount],
          Value: [c.TimeFrame?.From?.Value],
        }),
        To: this.formBuilder.group({
          Type: [c.TimeFrame?.To?.Type],
          IsPastDate: [c.TimeFrame?.To?.IsPastDate],
          Period: [c.TimeFrame?.To?.Period],
          Amount: [c.TimeFrame?.To?.Amount],
          Value: [c.TimeFrame?.To?.Value],
        }),
      }),
      
    });
  }
  @Output() timeRangeChange = new EventEmitter();
  onChangeTimeRange(e) {
    this.timeRangeChange.emit(e);
  }
}
