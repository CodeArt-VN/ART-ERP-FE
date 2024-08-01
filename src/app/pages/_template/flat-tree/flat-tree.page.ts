import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  NavController,
  ModalController,
  AlertController,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import {
  BI_ReportProvider,
  BRA_BranchProvider,
  SYS_FormProvider,
} from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-flat-tree',
  templateUrl: 'flat-tree.page.html',
  styleUrls: ['flat-tree.page.scss'],
})
export class FlatTreePage extends PageBase {
  @ViewChild('toolPopover') toolPopover;

  groupControl = {
    groupList: [{
      Code: 'View1',
      Name: 'View 1',
    },
    {
      Code: 'View2',
      Name: 'View 2',
    },
    ],
    selectedGroup: null,
  };
  segmentView = {
    Page: 'View1',
    ShowSpinner: true,
  };
  constructor(
    public pageProvider: BI_ReportProvider,
    public formProvider: SYS_FormProvider,
    public branchProvider: BRA_BranchProvider,
    public modalController: ModalController,
    public popoverCtrl: PopoverController,

    public location: Location,
    public env: EnvService,

    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    private config: NgSelectConfig,
  ) {
    super();
    this.pageConfig.isDetailPage = true;
    this.pageConfig.isFeatureAsMain = true;
    this.pageConfig.isShowFeature = true;
    this.formGroup = formBuilder.group({
      IDBranch: new FormControl({ value: null, disabled: false }),
      Id: new FormControl({ value: '0', disabled: true }),
      Code: ['', Validators.required],
      Name: ['', Validators.required],
      Remark: new FormControl(),
      Sort: [''],
      IsDisabled: new FormControl({ value: '', disabled: true }),
      CreatedBy: new FormControl({ value: '', disabled: true }),
      CreatedDate: new FormControl({ value: '', disabled: true }),
      ModifiedBy: new FormControl({ value: '', disabled: true }),
      ModifiedDate: new FormControl({ value: '', disabled: true }),
    });
  }

  preLoadData(event) {

    super.preLoadData();
    setTimeout(() => {
      this.groupControl.selectedGroup = this.groupControl.groupList[0];
    }, 0);
  }



 
  onGroupChange(g) {
    this.pageConfig.isSubActive = true;
    this.groupControl.selectedGroup = g;
    this.segmentView.Page = g.Code;
  }
}
