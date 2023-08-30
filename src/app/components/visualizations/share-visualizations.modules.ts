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





@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ScrollingModule, ExperimentalScrollingModule,
		IonicModule,
		TranslateModule,

		ShareInputControlsModule,
	],
	declarations: [
        ReportConfigComponent,
        ReportChartComponent,
        CardMultiRowComponent,

	],
	exports: [
        ReportConfigComponent,
        ReportChartComponent,
        CardMultiRowComponent,
	],
})
export class ShareVisualizationsModule { }
