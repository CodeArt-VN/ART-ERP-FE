import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, WMS_ZoneProvider,  } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';


@Component({
    selector: 'app-schema-detail',
    templateUrl: './schema-detail.page.html',
    styleUrls: ['./schema-detail.page.scss'],
})
export class SchemaDetailPage extends PageBase {
    dataTypes;
    public isDisabled = true;
    constructor(
        public pageProvider: WMS_ZoneProvider,
        public branchProvider: BRA_BranchProvider,
        public env: EnvService,
        public navCtrl: NavController,
        public route: ActivatedRoute,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public cdr: ChangeDetectorRef,
        public loadingController: LoadingController,
        public commonService: CommonService,
    ) {
        
        super();
   
    }
    preLoadData(event){
        this.dataTypes = [
            { Name: 'Text' },
            { Name: 'Number' },
            { Name: 'Dataset' },
            { Name: 'select' },
            { Name: 'ng-select-staff' }
          ];

        this.pageConfig.isDetailPage = true;
        
        this.item = { Id: 1, Code: 'SaleOrder', Name: 'Sale orders', Type: 'Dataset', ModifiedDate: '2023-01-01', Icon: 'star', Color: 'success',Remark:'Đơn hàng',Sort:1  },

        this.item.Fields = [
        { IDitem: 1, Id: 1, Code: 'OrderDate', Name: 'Ngày lên đơn', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 0, Remark: '',Color:'blue' },
        { IDitem: 1, Id: 2, Code: 'Status', Name: 'Status', Type: 'Text', Icon: 'star', Aggregate: '', Sort: 1, Remark: '' ,Color:'red'},
        { IDitem: 1, Id: 3, Code: 'Count', Name: 'Count of documents', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 2, Remark: '' ,Color:'pink'},
        { IDitem: 1, Id: 4, Code: 'Total', Name: 'Sum of total', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 3, Remark: '',Color:'secondary' },
        { IDitem: 1, Id: 5, Code: 'Discount', Name: 'Sum of discount', Type: 'Number', Icon: 'star', Aggregate: '', Sort: 4, Remark: '',Color:'success' },
        ]

        this.formGroup = this.formBuilder.group({
            Id: new FormControl({ value: this.item.Id, disabled: true }),
            Code: [this.item?.Code? this.item?.Code : ''],
            Name: [this.item?.Name? this.item?.Name : '', Validators.required],
            Remark: [this.item?.Remark? this.item?.Remark : ''],
            Sort: [this.item?.Sort? this.item?.Sort : ''],
            Icon: [this.item?.Icon? this.item?.Icon : ''],
            Color: [this.item?.Color? this.item?.Color : ''],
            Fields: this.formBuilder.array([]),
            IsDisabled: new FormControl({ value: '', disabled: true }),
            IsDeleted: new FormControl({ value: '', disabled: true }),
            CreatedBy: new FormControl({ value: '', disabled: true }),
            CreatedDate: new FormControl({ value: '', disabled: true }),
            ModifiedBy: new FormControl({ value: '', disabled: true }),
            ModifiedDate: new FormControl({ value: '', disabled: true }),
            IsColorModalOpened:[{value: false,disabled:true}],
            IsIconModalOpened:[{value: false,disabled:true}]
        });

       this.item.Fields.forEach(x=> this.addField(x));
    }

    private addField(field:any) {
        let groups = <FormArray>this.formGroup.controls.Fields;
        let group = this.formBuilder.group({
            Id: new FormControl({ value: field.Id, disabled: true }),
            Code: [field.Code],
            Name: [field.Name, Validators.required],
            Remark: [field.Remark],
            DataType: [field.Type],
            Aggregate: [field.Aggregate],
            Sort: [field.Sort],
            Icon: [field.Icon],
            Color: [field.Color],
            IsDisabled: new FormControl({ value: '', disabled: true }),
            IsDeleted: new FormControl({ value: '', disabled: true }),
            CreatedBy: new FormControl({ value: '', disabled: true }),
            CreatedDate: new FormControl({ value: '', disabled: true }),
            ModifiedBy: new FormControl({ value: '', disabled: true }),
            ModifiedDate: new FormControl({ value: '', disabled: true }),
            IsExpanded : [{value:false,disabled:true}],
            IsColorModalOpened:[{value: false,disabled:true}],
            IsIconModalOpened:[{value: false,disabled:true}]
        })
        groups.push(group);
    }

    removeField(idx){
        this.env.showPrompt('Bạn có chắc muốn xóa?', null, 'Xóa Schema Detail').then(_ => {
            let groups = <FormArray>this.formGroup.controls.Fields;
            groups.removeAt(idx);
        }).catch(_ => { });
    }
    
    segmentView = 's1';
    segmentChanged(ev: any) {
        this.segmentView = ev.detail.value;
    }

    async saveChange() {
        super.saveChange2();
    }

    onSelectColor(e,fg){
        fg.get('Color').setValue(e.Code);
        fg.get('IsColorModalOpened').setValue(false);
    }

    onSelectIcon(e,fg){
       fg.get('Icon').setValue(e.Name);
       fg.get('IsIconModalOpened').setValue(false);
    }

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        const fields = this.formGroup.get('Fields') as FormArray;
        let tempIndex =  fields.value[ev.detail.from].Sort;
        fields.value[ev.detail.from].Sort =  fields.value[ev.detail.to].Sort
        fields.value[ev.detail.to].Sort = tempIndex;
        ev.detail.complete();
      }

    toggleReorder() {
    this.isDisabled = !this.isDisabled;
    }
}