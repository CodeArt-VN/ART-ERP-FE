import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, SYS_SchemaProvider, WMS_ZoneProvider,  } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';


@Component({
    selector: 'app-schema-detail',
    templateUrl: './schema-detail.page.html',
    styleUrls: ['./schema-detail.page.scss'],
})
export class SchemaDetailPage extends PageBase {
    dataTypes;
    openedFields;
    public isDisabled = true;
    constructor(
        public pageProvider: SYS_SchemaProvider,
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

        this.pageConfig.isDetailPage = true;
        this.formGroup = this.formBuilder.group({
            Id: new FormControl({ value: '', disabled: true }),
            Code: [''],
            Name: ['', Validators.required],
            Type: ['Dataset', Validators.required],
            Remark: [''],
            Sort: [''],
            Icon: ['star'],
            Color: ['success'],
            Fields: this.formBuilder.array([]),
            IsDisabled: new FormControl({ value: '', disabled: true }),
            IsDeleted: new FormControl({ value: '', disabled: true }),
            CreatedBy: new FormControl({ value: '', disabled: true }),
            CreatedDate: new FormControl({ value: '', disabled: true }),
            ModifiedBy: new FormControl({ value: '', disabled: true }),
            ModifiedDate: new FormControl({ value: '', disabled: true }),
            IsColorModalOpened:[{value: false,disabled:true}],
            IsIconModalOpened:[{value: false,disabled:true}],
            DeletedFields: [[]],
        });

    
    }
    preLoadData(event){
        this.dataTypes = [
            { Name: 'text' },
            { Name: 'number' },
            { Name: 'dataset' },
            { Name: 'select' },
            { Name: 'ng-select-staff' },
            { Name: 'logical' }
          ];
          super.preLoadData(event);
         
    }
    loadedData(event?: any, ignoredFromGroup?: boolean): void {
        if(!this.item.Id){
            this.segmentView='s2';
        }
        // this.item.Fields.forEach(x=> this.addField(x));
        this.item.Fields=this.item.Fields?.sort((a, b) => a.Sort - b.Sort)
        super.loadedData(event, ignoredFromGroup);
        this.patchFormValue();
    }

    private patchFormValue() {
        if (!this.item.Id) {
            this.formGroup.get('Icon').markAsDirty();
            this.formGroup.get('Color').markAsDirty();
            this.formGroup.get('Type').markAsDirty();
        }
        this.patchFieldsValue();
        //this.formGroup?.patchValue(this.item);
       
    }

    private patchFieldsValue() {
        this.formGroup.controls.Fields = new FormArray([]);
        if (this.item.Fields?.length) {
            this.item.Fields.forEach(i => this.addField(i));
        }

        if (!this.pageConfig.canEdit || this.item.IDSaleOrder || this.item._HasChild) {
            this.formGroup.controls.Fields.disable();
        }
    }
   
    addField(field:any, markAsDirty = false) {
        if(Object.keys(field).length === 0) field.IsExpanded = true;
        if(this.openedFields?.length){
            this.openedFields = this.openedFields.filter(x => {
                if (x.get('Code').value === field.Code) {
                  field.IsExpanded = true;
                  return false; 
                }
                return true;
              });
        }
      
        let groups = <FormArray>this.formGroup.controls.Fields;
        let group = this.formBuilder.group({
            IDSchema:  [this.item.Id] ,
            Id: new FormControl({ value: field.Id, disabled: true }),
            Code: [field.Code],
            Name: [field.Name, Validators.required],
            Remark: [field.Remark],
            DataType: [field.DataType || "Text"],
            PropertyType: [field.PropertyType || "Field"],
            Aggregate: [field.Aggregate],
            Sort: [field.Sort],
            Icon: [field.Icon || "star"],
            Color: [field.Color || "success"],
            IsDisabled: new FormControl({ value: field.IsDisabled, disabled: true }),
            IsDeleted: new FormControl({ value: field.IsDeleted, disabled: true }),
            CreatedBy: new FormControl({ value: field.CreatedBy, disabled: true }),
            CreatedDate: new FormControl({ value: field.CreatedDate, disabled: true }),
            ModifiedBy: new FormControl({ value: field.ModifiedBy, disabled: true }),
            ModifiedDate: new FormControl({ value:  field.ModifiedDate, disabled: true }),
            IsExpanded : [{value : field.IsExpanded || false,disabled:true}],
            IsColorModalOpened:[{value: false,disabled:true}],
            IsIconModalOpened:[{value: false,disabled:true}]
        })
        console.log(field);
        groups.push(group);
        
        if (markAsDirty) {
            group.get('IDSchema').markAsDirty();
            group.get('Icon').markAsDirty();
            group.get('Color').markAsDirty();
            group.get('DataType').markAsDirty();
            group.get('PropertyType').markAsDirty();

        }
    }
    

    removeField(g,index){
        this.env.showPrompt('Bạn có chắc muốn xóa?', null, 'Xóa Schema Detail').then(_ => {
            let groups = <FormArray>this.formGroup.controls.Fields;
            //groups.controls[index].get('IsDeleted').setValue(true);
            groups.removeAt(index);
            this.item.Fields.splice(index, 1);
            let deletedFields = this.formGroup.get('DeletedFields').value;
            let deletedId = g.controls.Id.value;
            deletedFields.push(deletedId);

            this.formGroup.get('DeletedFields').setValue(deletedFields);
            this.formGroup.get('DeletedFields').markAsDirty();
          //  groups.controls[index].markAsDirty();
           // groups.controls[index].get('IsDeleted').markAsDirty()
            this.saveChange();
        }).catch(_ => { });

    }
    
    segmentView = 's1';
    segmentChanged(ev: any) {
        this.segmentView = ev.detail.value;
    }

    async saveChange() {
        let submitItem = this.getDirtyValues(this.formGroup);
        super.saveChange2();
    }

    savedChange(savedItem?: any, form?: FormGroup<any>): void {
       //đọc lại trong this.item => lấy ra field đang mở( tạo 1 varible this.openedFields => mảng nhét vô) xong chạy lại
        let groups = <FormArray>this.formGroup.controls.Fields;

        this.openedFields = groups.controls.filter((field:FormGroup) =>field.get('IsExpanded').value)

        super.savedChange(savedItem, form);
        this.item = savedItem;
        this.loadedData();
 
    }
    onSelectColor(e,fg){
        fg.get('Color').setValue(e.Code);
        fg.get('IsColorModalOpened').setValue(false);
        fg.get('Color').markAsDirty();
        this.saveChange()
      }

    onSelectIcon(e,fg){
       fg.get('Icon').setValue(e.Name);
       fg.get('IsIconModalOpened').setValue(false);
       fg.get('Icon').markAsDirty();
       this.saveChange()
    }

    doReorder(ev, groups) {
        groups = ev.detail.complete(groups);
        for (let i = 0; i < groups.length; i++) {
            const g = groups[i];
            g.controls.Sort.setValue(i+1);
            g.controls.Sort.markAsDirty();
        }
        this.saveChange()
    }

    toggleReorder() {
    this.isDisabled = !this.isDisabled;
    }
}
