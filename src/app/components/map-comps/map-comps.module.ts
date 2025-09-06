import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';

import { ShareModule } from 'src/app/share.module';
import { MapViewComponent } from './map-view/map-view.component';
import { CoordinatePickerComponent } from './coordinate-picker/coordinate-picker.component';
import { AddressComponent } from './address/address.component';

@NgModule({
	imports: [IonicModule, CommonModule, ShareModule, RouterModule, FormsModule, ReactiveFormsModule, GoogleMapsModule],
	declarations: [MapViewComponent, CoordinatePickerComponent, AddressComponent],
	exports: [MapViewComponent, CoordinatePickerComponent, AddressComponent],
})
export class MapCompsModule {}
