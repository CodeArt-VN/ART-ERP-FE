import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, PR_DealProvider, WMS_ItemProvider,  } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { Subject, concat, of } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { lib } from 'src/app/services/static/global-functions';

@Component({
  selector: 'app-pr-deal-detail',
  templateUrl: './pr-deal-detail.page.html',
  styleUrls: ['./pr-deal-detail.page.scss'],
})
export class PRDealDetailPage extends PageBase {
    UoMs = [];
    constructor(
        public pageProvider: PR_DealProvider,
        public itemProvider: WMS_ItemProvider,
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
        this.pageConfig.isDetailPage = true;
        console.log(env.selectedBranch);
        this.formGroup = formBuilder.group({
            IDBranch: [env.selectedBranch],
            Id: new FormControl({ value: '', disabled: true }),
            IDItem: [null, Validators.required],
            IDItemUoM: [null, Validators.required],
            FromDate: ['', Validators.required],
            ToDate: ['', Validators.required],
            FromHour: ['', Validators.required],
            ToHour: ['', Validators.required],
            IsByPercent: [false],
            DiscountByPercent: new FormControl({ value: 0, disabled: true }),
            Quantity:[''],
            MaxPerOrder:[''],
            Price:[0],
            OriginalPrice:new FormControl({ value: '', disabled: true }),
            Code: [''],
            Name: [''],
            Remark: [''],
            Sort: [''],
            Status: [''],
            IsDisabled: new FormControl({ value: '', disabled: true }),
            IsDeleted: new FormControl({ value: '', disabled: true }),
            CreatedBy: new FormControl({ value: '', disabled: true }),
            CreatedDate: new FormControl({ value: '', disabled: true }),
            ModifiedBy: new FormControl({ value: '', disabled: true }),
            ModifiedDate: new FormControl({ value: '', disabled: true }),
        });
    }
    loadedData(event) {
        if (this.item?.IDItem) {
            this.item.FromDate = lib.dateFormat(this.item.FromDate, 'yyyy-mm-dd');
            this.item.ToDate = lib.dateFormat(this.item.ToDate, 'yyyy-mm-dd');
            this.loadSelectedItem(this.item.IDItem);
        }
        else{
            this.itemSearch();
        }
        super.loadedData(event);
        if(this.item.Id == 0){
            this.formGroup.controls.Status.patchValue('New');
            this.formGroup.controls.Status.markAsDirty();

        }
        if(this.formGroup.controls.IsByPercent.value== true){
            this.formGroup.controls.DiscountByPercent.enable();
            this.formGroup.controls.Price.disable();
        }
    }
    segmentView = 's1';
    segmentChanged(ev: any) {
        this.segmentView = ev.detail.value;
    }
    itemList$
    itemListLoading = false;
    itemListInput$ = new Subject<string>();
    itemListSelected = [];
    itemSearch() {
        this.itemListLoading = false;
        this.itemList$ = concat(
            of(this.itemListSelected),
            this.itemListInput$.pipe(
                distinctUntilChanged(),
                tap(() => this.itemListLoading = true),
                switchMap(term => this.itemProvider.search({ Take: 20, Skip: 0, Term: term ? term : this.item.IDItem, AllUoM: true}).pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => this.itemListLoading = false)
                ))

            )
        );
        
    }
    loadSelectedItem(IDItem) {     
        this.itemProvider.search({ Id : IDItem, AllUoM: true}).subscribe(result=>{           
            if (result) {
                
                let OriginalPrice = result[0].UoMs.find(e=>e.Id == this.item.IDItemUoM)?.PriceList[0]?.Price;

                this.formGroup.controls.OriginalPrice.patchValue(OriginalPrice);  
                this.UoMs = result[0].UoMs; 
                this.itemListSelected.push(result[0]);
                this.itemListSelected = [...this.itemListSelected];
                this.itemSearch();
            }
        })
    }
    async changedIDItem(selectedItem) {  
             
		if (selectedItem) {           
            let OriginalPrice = selectedItem.UoMs.find(e=>e.Id == selectedItem.SalesUoM)?.PriceList[0]?.Price;            
            this.UoMs = selectedItem.UoMs; 
            this.formGroup.controls.OriginalPrice.patchValue(OriginalPrice);    
            this.formGroup.controls.IDItemUoM.patchValue(selectedItem.SalesUoM);
            this.formGroup.controls.IDItemUoM.markAsDirty();         
			if (this.itemListSelected.findIndex(d => d.Id == selectedItem.Id) == -1) {
				this.itemListSelected.push(selectedItem);
				this.itemSearch();
			}			
		}
	}
    async changedIDItemUoM(selectedItemUoM) {  
             
		if (selectedItemUoM) {                  
            this.formGroup.controls.OriginalPrice.patchValue(selectedItemUoM?.PriceList[0]?.Price);             	
		}
	}
    IsByPercent(){
        if(this.formGroup.controls.IsByPercent.value == false){
            this.formGroup.controls.DiscountByPercent.enable();
            this.formGroup.controls.Price.patchValue(0);
            this.formGroup.controls.Price.markAsDirty();    
            this.formGroup.controls.Price.disable();
        }else{
            this.formGroup.controls.DiscountByPercent.patchValue(0);
            this.formGroup.controls.DiscountByPercent.markAsDirty();        
            this.formGroup.controls.DiscountByPercent.disable();
            this.formGroup.controls.Price.enable();
        }
        
    }
    async saveChange() { 
        if(this.formGroup.controls.IsByPercent.value == true && this.formGroup.controls.DiscountByPercent.value == 0){
            this.env.showTranslateMessage('Vui lòng nhập % giảm giá', 'warning');
            return false;
        }
        if(this.formGroup.controls.DiscountByPercent.value > 99){
            this.env.showTranslateMessage('% giảm giá không hợp lệ', 'warning');
            return false;
        }
        if(this.formGroup.controls.IsByPercent.value == false && this.formGroup.controls.Price.value == 0){
            this.env.showTranslateMessage('Vui lòng nhập giá sau giảm', 'warning');
            return false;
        } 
        if(this.formGroup.controls.OriginalPrice.value == null || this.formGroup.controls.OriginalPrice.value == 0){
            this.env.showTranslateMessage('Sản phẩm chưa có giá bán', 'warning');
            return false;
        }   
        if(Date.parse('01/01/2011 '+this.formGroup.controls.FromHour.value) > Date.parse('01/01/2011 '+ this.formGroup.controls.ToHour.value)){
            this.env.showTranslateMessage('Giờ bắt đầu phải nhỏ hơn giờ kết thúc', 'warning');
            return false;
        }
        if(new Date(this.formGroup.controls.ToDate.value).getTime() - new Date(this.formGroup.controls.FromDate.value).getTime() < 0){
            this.env.showTranslateMessage('ngày kết thúc phải lớn hơn ngày bắt đầu', 'warning');
            return false;
        }

        super.saveChange2();
    }
}