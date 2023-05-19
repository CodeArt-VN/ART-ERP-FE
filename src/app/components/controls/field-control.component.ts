import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lib } from 'src/app/services/static/global-functions';

@Component({
	selector: 'app-field-control',
	template: `
  <div class="c-control" *ngIf="field.data">
	<ion-item class="ion-no-padding ion-no-margin" lines="none" [disabled]="field.disabled" *ngIf="!(field.type == 'toggle')">
		<ion-label class="ion-text-wrap ">
			<label class=" c-label" [attr.for]="field.labelForId">{{field.label}} <a (click)="reset(field)" class="clickable" *ngIf="field.data.ValueObject != null">[reset]</a></label>
			<p *ngIf="field.remark">{{field.remark}}</p>
		</ion-label>
	</ion-item>
	<ng-container [ngSwitch]="field.type">
		<ng-select *ngSwitchCase="'select-staff'" [multiple]="field.multiple" [items]="field.DataSource | async" [typeahead]="field.SearchInput" [loading]="field.SearchLoading" [virtualScroll]="true" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" [labelForId]="field.labelForId" [bindLabel]="field.bindLabel? field.bindLabel: 'Name'" [bindValue]="field.bindValue">
			<ng-template ng-multi-label-tmp let-items="items" let-clear="clear">
				<ion-chip *ngFor="let i of items">
					<ion-avatar ><ion-img #img [src]="field.imgPath + i.Code + '.jpg'" (ionError)="img.src = 'assets/avartar-empty.jpg'"></ion-img></ion-avatar>
					<ion-label>{{i.FullName}}</ion-label>
					<ion-icon (click)="clear(i)" name="close-circle"></ion-icon>
				</ion-chip>
			</ng-template>
			<ng-template ng-option-tmp let-i="item" let-search="searchTerm">
				<div *ngIf="i">
					<ion-avatar ><ion-img #img [src]="field.imgPath + i.Code + '.jpg'" (ionError)="img.src = 'assets/avartar-empty.jpg'"></ion-img></ion-avatar>
					<span [ngOptionHighlight]="search">{{i.FullName}}</span><br>
					<small>#<b><span class="important" [ngOptionHighlight]="search">{{i.Id}} - {{i.Code}}</span></b> <span *ngIf="i.Phone"> | điện thoại: <b [ngOptionHighlight]="search">{{i.Phone}}</b></span></small>
				</div>
			</ng-template>
		</ng-select>
		<ng-select *ngSwitchCase="'select-contact'" [multiple]="field.multiple" [items]="field.DataSource | async" [typeahead]="field.SearchInput" [loading]="field.SearchLoading" [virtualScroll]="true" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" [labelForId]="field.labelForId" [bindLabel]="field.bindLabel? field.bindLabel: 'Name'" [bindValue]="field.bindValue">
			llllll
			<ng-template ng-label-tmp let-i="item" let-a="item.Address">
				{{i.Name}}
				<small *ngIf="a">
					<span *ngIf="a.AddressLine1"> | {{a.AddressLine1}}</span>
					<span *ngIf="a.Ward">, {{a.Ward}}</span>
					<span *ngIf="a.District">, {{a.District}}</span>
					<span *ngIf="a.Province">, {{a.Province}}</span>
				</small>
			</ng-template>
			<ng-template ng-option-tmp let-i="item" let-a="item.Address" let-search="searchTerm">
				<div *ngIf="i">
					<div>
						<span [ngOptionHighlight]="search">{{i.Name}}</span>
						<span *ngIf="i.WorkPhone"> | <small> <b [ngOptionHighlight]="search">{{i.WorkPhone}}</b> </small></span>
					</div>
					<small *ngIf="a">
						<b *ngIf="i.Code"><span class="important" [ngOptionHighlight]="search">{{i.Code}}</span></b>
						<span *ngIf="a.AddressLine1"> | {{a.AddressLine1}}</span>
						<span *ngIf="a.Ward">, {{a.Ward}}</span>
						<span *ngIf="a.District">, {{a.District}}</span>
						<span *ngIf="a.Province">, {{a.Province}}</span>
						<br *ngIf="a.AddressLine2 || a.Contact">
						<span *ngIf="a.AddressLine2">{{a.AddressLine2}}</span>
						<span *ngIf="a.Contact"> |  {{a.Contact}}</span>
						<span *ngIf="a.Phone1"> - {{a.Phone1}}</span>
						<span *ngIf="a.Phone2"> - {{a.Phone2}}</span>
					</small>
				</div>
			</ng-template>
		
			<ng-template ng-multi-label-tmp let-items="items" let-clear="clear">
				<ion-chip *ngFor="let i of items">
					<ion-label>{{i.Name}}</ion-label>
					<ion-icon (click)="clear(i)" name="close-circle"></ion-icon>
				</ion-chip>
			</ng-template>
			
		</ng-select>
		<ng-select *ngSwitchCase="'select-branch'" [searchFn]="searchShowAllChildren" [items]="field.items" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" [labelForId]="field.labelForId" [bindLabel]="field.bindLabel? field.bindLabel: 'Name'" [bindValue]="field.bindValue" [virtualScroll]="true" placeholder="Chọn đơn vị...">
			<ng-template ng-option-tmp let-i="item" let-search="searchTerm">
				<div *ngIf="i">
					<div> <span *ngFor="let l of i.levels">&nbsp;&nbsp;&nbsp;</span> <ion-text [color]=" i.Type == 'Company'? 'primary':'dark'" [ngOptionHighlight]="search">{{i.Name}}</ion-text></div>
				</div>
			</ng-template>
		</ng-select>
		<ng-select *ngSwitchCase="'select'" [items]="field.items" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" [labelForId]="field.labelForId" [bindLabel]="field.bindLabel? field.bindLabel: 'Name'" [bindValue]="field.bindValue"></ng-select>
		<input *ngSwitchCase="'string'" [id]="field.labelForId" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" type="text">
		<input *ngSwitchCase="'number'" [id]="field.labelForId" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" type="number">
		<textarea *ngSwitchCase="'textarea'" [id]="field.labelForId" (change)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [readonly]="field.disabled" class="c-input no-check-dirty" rows="3" type="textarea"></textarea>
	</ng-container>
	<ion-item class="ion-no-padding" lines="none" *ngIf="field.type == 'toggle'">
		<ion-label class="ion-text-wrap">
			<label class="c-label" [attr.for]="field.labelForId">{{field.label}} <a (click)="reset(field)" class="clickable" *ngIf="field.data.ValueObject != null">[reset]</a></label>
			<p *ngIf="field.remark">{{field.remark}}</p>
		</ion-label>
		<ion-toggle [id]="field.labelForId" (click)="trackChange(field.data)" [(ngModel)]="field.data.ValueObject" [disabled]="field.disabled" slot="end" color="primary"></ion-toggle>
	</ion-item>
</div>
  `
})
export class FieldControlComponent implements OnInit {
	@Input() field: any;
	@Output() onChange = new EventEmitter();

	constructor() { }

	ngOnInit() {
		
	}

	trackChange(data) {
		setTimeout(() => {
			this.onChange.emit(data);
		}, 1);
	}

	reset(field){
		field.data.ValueObject = null;
		this.trackChange(field.data);
	}

	searchResultIdList = { term: '', ids: [] };
	searchShowAllChildren = (term: string, item: any) => {
		if (this.searchResultIdList.term != term) {
			this.searchResultIdList.term = term;
			this.searchResultIdList.ids = lib.searchTreeReturnId(this.field.items, term);
		}
		return this.searchResultIdList.ids.indexOf(item.Id) > -1;
	}

}
