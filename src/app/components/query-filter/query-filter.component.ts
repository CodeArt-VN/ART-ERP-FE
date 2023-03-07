import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/report.service';
import { BRA_BranchProvider } from 'src/app/services/static/services.service';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.scss'],
})
export class QueryFilterComponent extends PageBase {

  branchList = [];

  @Output() changeFrequencyComp = new EventEmitter();
  @Output() changeDateFilterComp = new EventEmitter();
  @Output() toogleBranchDatasetComp = new EventEmitter();

  constructor(
    public branchProvider: BRA_BranchProvider,
    public rpt: ReportService,
    public env: EnvService,
  ) {
    super();

    this.query.IDParent = 16;

    this.pageConfig.subscribeEvent = this.env.getEvents().subscribe((data) => {
      if (data.Code == 'changeBranch') {
          this.changeBranchBtn();
      }
      else {
          this.refresh();
      }
  });
  }

  ngOnInit() {
    this.branchProvider.read({Type: 'Tổng công ty / Công ty', IsDeleted: false}).then((resutl:any) => {
      this.branchList = resutl.data;
      // console.log(this.branchList);

      this.changeBranchBtn();
    });

  }

  changeBranchBtn() {
    if (this.env.selectedBranch == 16) {
        this.branchList.forEach(b => {
            b.ShowBtn = true;
            b.IsHidden = false;
        });
    }
    else {
        let currentBranch = this.branchList.find(b => b.Id == this.env.selectedBranch);
        this.branchList.forEach(b => {
            b.ShowBtn = false;
            b.IsHidden = true;
        });
        if (currentBranch) {
            currentBranch.ShowBtn = true;
            currentBranch.IsHidden = false;
        };
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
