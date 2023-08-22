import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
import { InputControlComponent } from './controls/input-control.component';
import { FieldControlComponent } from './controls/field-control.component';

import { QueryFilterComponent } from './query-filter/query-filter.component';
import { BranchBreadcrumbsComponent } from './branch-breadcrumbs/branch-breadcrumbs.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { CardMultiRowComponent } from './visualizations/card-multi-row/card-multi-row.component';
import { ReportChartComponent } from './visualizations/report-chart/report-chart.component';
import { ShareDataTableModule } from './data-table/share-data-table.module';




@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ScrollingModule,

		IonicModule,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		NgxMaskModule.forRoot(),
		FileUploadModule,
		ShareDataTableModule,
		ShareDirectivesModule,
	],
	declarations: [
		
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
		CardMultiRowComponent,
		ReportChartComponent,
	],
	exports: [
		
		GroupControlComponent,
		FieldControlComponent,
		FormControlComponent,
		InputControlComponent,
		BranchBreadcrumbsComponent,
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
		CardMultiRowComponent,
		ReportChartComponent,
		ShareDataTableModule,
		ShareDirectivesModule,
		CommonModule,
		FormsModule,
		ScrollingModule,
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
