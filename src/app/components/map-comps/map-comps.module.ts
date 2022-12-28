import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { GoogleMapsModule } from '@angular/google-maps'
import { RouterModule } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { CoordinatePickerComponent } from './coordinate-picker/coordinate-picker.component';



@NgModule({
	imports: [IonicModule,
		CommonModule,
		ShareModule,
		RouterModule,
		NgSelectModule,
		NgOptionHighlightModule,
		FormsModule,
		ReactiveFormsModule,
		GoogleMapsModule,
		NgxMaskModule.forRoot(),
	],
	declarations: [
		MapViewComponent,
		CoordinatePickerComponent
	],
	exports: [
		MapViewComponent,
		CoordinatePickerComponent
	],
})
export class MapCompsModule { }
