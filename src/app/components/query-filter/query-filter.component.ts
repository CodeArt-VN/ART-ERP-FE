import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';

@Component({
    selector: 'app-query-filter',
    templateUrl: './query-filter.component.html',
    styleUrls: ['./query-filter.component.scss'],
    standalone: false
})
export class QueryFilterComponent extends PageBase {
  reportBranchList = [];
  colorList = [
    '#84ff00',
    '#772727',
    '#00ffae',
    '#ff4200',
    '#ffe400',
    '#2b9a00',
    '#ff00ae',
    '#c000ff',
    '#FF5733',
    '#5DADE2',
  ];

  @Output() changeFrequencyComp = new EventEmitter();
  @Output() changeDateFilterComp = new EventEmitter();
  @Output() toogleBranchDatasetComp = new EventEmitter();

  constructor(
    public branchProvider: BRA_BranchProvider,
    public rpt: ReportService,
    public env: EnvService,
  ) {
    super();

    this.pageConfig.subscribeEvent = this.env.getEvents().subscribe((data) => {
      if (data.Code == 'changeBranch') {
        this.changeBranchBtn();
      } else {
        this.refresh();
      }
    });

    let template = {
      ShowBtn: true,
      IsHidden: true,
      IsHiddenDetailColumn: true,
    };

    this.reportBranchList = this.env.branchList.filter((b) => b.Type == 'Company');
    for (let index = 0; index < this.reportBranchList.length; index++) {
      let val = this.reportBranchList[index];
      Object.assign(val, template);
      val.Color = this.colorList[index];
    }

    this.changeBranchBtn();
  }

  changeBranchBtn() {
    if (this.env.selectedBranch == 16) {
      this.reportBranchList.forEach((b) => {
        b.ShowBtn = true;
        b.IsHidden = false;
      });
    } else {
      let currentBranch = this.reportBranchList.find((b) => b.Id == this.env.selectedBranch);
      this.reportBranchList.forEach((b) => {
        b.ShowBtn = false;
        b.IsHidden = false;
      });

      if (currentBranch) {
        currentBranch.ShowBtn = true;
        currentBranch.IsHidden = false;
      }
    }
  }

  emit(eventName, data) {
    this[eventName].emit(data);
  }

  changeFrequency(data) {
    this.emit('changeFrequencyComp', data);
  }

  changeDateFilter(data) {
    this.emit('changeDateFilterComp', data);
  }

  toogleBranchDataset(data) {
    this.emit('toogleBranchDatasetComp', data);
  }
}
