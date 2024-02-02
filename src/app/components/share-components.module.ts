import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

//3th party
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FileUploadModule } from 'ng2-file-upload';

//Custom component
import { ShareDirectivesModule } from '../directives/share-directives.module';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { DetailToolbarComponent } from './detail-toolbar/detail-toolbar.component';
import { ModalDetailToolbarComponent } from './modal-detail-toolbar/modal-detail-toolbar.component';

import { QueryFilterComponent } from './query-filter/query-filter.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ShareDataTableModule } from './data-table/share-data-table.module';

//import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ShareInputControlsModule } from './controls/share-input-controls.modules';
import { ShareVisualizationsModule } from './visualizations/share-visualizations.modules';
import { SharePrintingModule } from './printing/share-printing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ScrollingModule,
		IonicModule,
		//NgxMaskDirective,  NgxMaskPipe,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		FileUploadModule,

		ShareInputControlsModule,
		ShareDataTableModule,
		ShareVisualizationsModule,
		ShareDirectivesModule,
		SharePrintingModule
	],
	// providers: [provideNgxMask()],

	declarations: [
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
	],
	exports: [
		ListToolbarComponent,
		DetailToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
		ShareInputControlsModule,
		ShareDataTableModule,
		ShareVisualizationsModule,
		SharePrintingModule,
		ShareDirectivesModule,
		CommonModule,
		FormsModule,
		ScrollingModule,
		IonicModule,
		ReactiveFormsModule,
		//NgxMaskDirective,  NgxMaskPipe,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		FileUploadModule
	],
})
export class ShareComponentsModule { }
