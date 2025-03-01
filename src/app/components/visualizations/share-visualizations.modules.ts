import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

//3th party
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

//Custom component
import { ShareInputControlsModule } from '../controls/share-input-controls.modules';
import { ReportConfigComponent } from './report-config/report-config.component';
import { CardMultiRowComponent } from './card-multi-row/card-multi-row.component';
import { ReportChartComponent } from './report-chart/report-chart.component';
import { EChartComponent } from './types/e-chart/e-chart.component';
import { FilterComponent } from '../filter/filter.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareDataTableModule } from '../data-table/share-data-table.module';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ScrollingModule, IonicModule, TranslateModule, ShareInputControlsModule, DragDropModule, ShareDataTableModule],
	declarations: [FilterComponent, ReportConfigComponent, ReportChartComponent, CardMultiRowComponent, EChartComponent],
	exports: [FilterComponent, ReportConfigComponent, ReportChartComponent, CardMultiRowComponent, EChartComponent],
})
export class ShareVisualizationsModule {}
