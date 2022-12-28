import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-control',
  template:`
  <div class="c-control">
	<ion-item class="ion-no-padding ion-no-margin" lines="none" [disabled]="field.disabled" *ngIf="!(field.type == 'toggle')">
		<ion-label class="ion-text-wrap ">
			<label class=" c-label" [attr.for]="field.labelForId">{{field.label}}</label>
			<p *ngIf="field.remark">{{field.remark}}</p>
		</ion-label>
	</ion-item>
	<ng-container [ngSwitch]="field.type">
		<ng-select *ngSwitchCase="'select'" [items]="field.items" (change)="trackChange(field.data)" [formControlName]="field.data.Value" [readonly]="field.disabled" class="c-input" [labelForId]="field.labelForId" [bindLabel]="field.bindLabel? field.bindLabel: 'Name'" [bindValue]="field.bindValue? field.bindValue: 'Id'"></ng-select>
		<input *ngSwitchCase="'string'" [id]="field.labelForId" (change)="trackChange(field.data)" [formControlName]="field.data.Value" [readonly]="field.disabled" class="c-input" type="text">
		<input *ngSwitchCase="'number'" [id]="field.labelForId" (change)="trackChange(field.data)" [formControlName]="field.data.Value" [readonly]="field.disabled" class="c-input" type="number">
	</ng-container>
	<ion-item class="ion-no-padding" lines="none" *ngIf="field.type == 'toggle'">
		<ion-label class="ion-text-wrap">
			<label class="c-label" [attr.for]="field.labelForId">{{field.label}}</label>
			<p *ngIf="field.remark">{{field.remark}}</p>
		</ion-label>
		<ion-toggle [id]="field.labelForId" (click)="trackChange(field.data)" [formControlName]="field.data.Value" [disabled]="field.disabled" slot="end" color="primary"></ion-toggle>
	</ion-item>
</div>
  `
})
export class FormControlComponent implements OnInit {
  @Input() field:any;
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  trackChange(data){
    setTimeout(() => {
      this.onChange.emit(data);
    }, 1);
  }
  
}
