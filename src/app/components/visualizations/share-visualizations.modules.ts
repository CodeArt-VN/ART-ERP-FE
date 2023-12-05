import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

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





@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ScrollingModule, ExperimentalScrollingModule,
		IonicModule,
		TranslateModule,
		DragDropModule,
		ShareInputControlsModule,
	],
	declarations: [
		FilterComponent,
        ReportConfigComponent,
        ReportChartComponent,
        CardMultiRowComponent,
		EChartComponent,

	],
	exports: [
		FilterComponent,
        ReportConfigComponent,
        ReportChartComponent,
        CardMultiRowComponent,
		EChartComponent,
	],
})
export class ShareVisualizationsModule { }
