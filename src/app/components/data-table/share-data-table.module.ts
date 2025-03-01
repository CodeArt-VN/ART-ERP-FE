import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

//3th party
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

//Custom component
import { DataTableComponent } from './data-table.component';
import { EmptyMessageChangesService, DataTableEmptyMessageDirective } from './directives/data-table-empty-message-directive';
import { DataTableEmptyMessageTemplateDirective } from './directives/data-table-empty-message-template-directive';
import { ColumnChangesService, DataTableColumnDirective } from './directives/data-table-column-directive';
import { DataTableColumnCellDirective } from './directives/data-table-cell-template-directive';
import { DataTableColumnFilterDirective } from './directives/data-table-filter-template-directive';
import { DataTableColumnHeaderDirective } from './directives/data-table-header-template-directive';
import { DataTableHeaderComponent } from './components/1.header/datatable-header.component';
import { DataTableHeaderCellComponent } from './components/1.header/datatable-header-cell.component';
import { DataTablBodyComponent } from './components/2.body/datatable-body.component';
import { DataTablBodyRowComponent } from './components/2.body/datatable-body-row.component';
import { DataTableBodyCellComponent } from './components/2.body/datatable-body-cell.component';
import { PageMessageComponent } from '../page-message/page-message.component';
import { SvgImageDirective } from 'src/app/directives/svg-image.directive';
import { DataTableFilterCellComponent } from './components/1.header/datatable-filter-cell.component';
import { ShareInputControlsModule } from '../controls/share-input-controls.modules';

@NgModule({
	imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ScrollingModule, IonicModule, TranslateModule, ShareInputControlsModule],
	providers: [ColumnChangesService, EmptyMessageChangesService],
	declarations: [
		SvgImageDirective,
		PageMessageComponent,

		DataTableComponent,
		DataTableEmptyMessageDirective,
		DataTableEmptyMessageTemplateDirective,
		DataTableColumnDirective,
		DataTableColumnCellDirective,
		DataTableColumnFilterDirective,
		DataTableColumnHeaderDirective,
		DataTableHeaderComponent,
		DataTableHeaderCellComponent,
		DataTableFilterCellComponent,
		DataTablBodyComponent,
		DataTablBodyRowComponent,
		DataTableBodyCellComponent,
	],
	exports: [
		SvgImageDirective,
		PageMessageComponent,
		DataTableComponent,
		DataTableEmptyMessageDirective,
		DataTableEmptyMessageTemplateDirective,
		DataTableColumnDirective,
		DataTableColumnCellDirective,
		DataTableColumnFilterDirective,
		DataTableColumnHeaderDirective,
		DataTableHeaderComponent,
		DataTableHeaderCellComponent,
		DataTableFilterCellComponent,
		DataTablBodyComponent,
		DataTablBodyRowComponent,
		DataTableBodyCellComponent,
	],
})
export class ShareDataTableModule {}
