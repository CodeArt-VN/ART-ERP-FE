import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';
import { OperatorOptions } from "./chart-filter.constants";

@Component({
  selector: 'app-chart-filter',
  templateUrl: './chart-filter.component.html',
  styleUrls: ['./chart-filter.component.scss'],
})
export class ChartFilterComponent extends PageBase {
  @ViewChild(IonModal) modal: IonModal;
  @Input() isOpen: boolean = false;

  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();

  public readonly operatorOptions = OperatorOptions;
  
  constructor(
    public branchProvider: BRA_BranchProvider,
    public rpt: ReportService,
    public env: EnvService,
  ) {
		super();
    
  }
}
