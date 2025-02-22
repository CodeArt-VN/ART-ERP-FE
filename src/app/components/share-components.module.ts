import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

//3th party
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
//
//Custom component
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
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HelpDetailComponent } from '../pages/SYS/help-detail/help-detail.page';
import { PipesModule } from '../pipes/pipes.module';
import { ReorderComponent } from './reorder/reorder.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { FormatQuantityComponent } from './format-quantity/format-quantity.component';

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
		//
		ShareInputControlsModule,
		ShareDataTableModule,
		ShareVisualizationsModule,
		SharePrintingModule,
		PipesModule,
	],
	// providers: [provideNgxMask()],

	declarations: [
		ListToolbarComponent,
		DetailToolbarComponent,
		ToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
		HelpDetailComponent,
		ReorderComponent,
		JsonViewerComponent,
		FormatQuantityComponent,
	],
	exports: [
		HelpDetailComponent,
		ListToolbarComponent,
		DetailToolbarComponent,
		ToolbarComponent,
		ModalDetailToolbarComponent,
		PageTitleComponent,
		QueryFilterComponent,
		ShareInputControlsModule,
		ShareDataTableModule,
		ShareVisualizationsModule,
		SharePrintingModule,
		CommonModule,
		FormsModule,
		ScrollingModule,
		IonicModule,
		ReactiveFormsModule,
		JsonViewerComponent,
		FormatQuantityComponent,
		//NgxMaskDirective,  NgxMaskPipe,
		TranslateModule,
		NgSelectModule,
		NgOptionHighlightModule,
		//FileUploadModule

		PipesModule,
		ReorderComponent,
	],
})
export class ShareComponentsModule {}
