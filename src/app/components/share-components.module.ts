import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//3th party
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxMaskModule } from 'ngx-mask';
import { FileUploadModule } from 'ng2-file-upload';

//Custom component
import { ShareDirectivesModule } from '../directives/share-directives.module';
import { PageMessageComponent } from './page-message/page-message.component';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { DetailToolbarComponent } from './detail-toolbar/detail-toolbar.component';
import { ModalDetailToolbarComponent } from './modal-detail-toolbar/modal-detail-toolbar.component';
import { GroupControlComponent } from './group-control/group-control.component';
import { FormControlComponent } from './controls/form-control.component';
import { FieldControlComponent } from './controls/field-control.component';

import { QueryFilterComponent } from './query-filter/query-filter.component';
import { BranchBreadcrumbsComponent } from './branch-breadcrumbs/branch-breadcrumbs.component';




@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		IonicModule,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		NgxMaskModule.forRoot(),
		FileUploadModule,

		ShareDirectivesModule,
	],
	declarations: [
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		BranchBreadcrumbsComponent,
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageMessageComponent,
		QueryFilterComponent
	],
	exports: [
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		BranchBreadcrumbsComponent,
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageMessageComponent,
		QueryFilterComponent,
		ShareDirectivesModule,
		
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		NgxMaskModule,
		FileUploadModule
	],
})
export class ShareComponentsModule { }
