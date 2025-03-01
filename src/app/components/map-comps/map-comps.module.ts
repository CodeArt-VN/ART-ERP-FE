import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { CoordinatePickerComponent } from './coordinate-picker/coordinate-picker.component';
import { AddressComponent } from './address/address.component';

@NgModule({
	imports: [IonicModule, CommonModule, ShareModule, RouterModule, FormsModule, ReactiveFormsModule, GoogleMapsModule],
	declarations: [MapViewComponent, CoordinatePickerComponent, AddressComponent],
	exports: [MapViewComponent, CoordinatePickerComponent, AddressComponent],
})
export class MapCompsModule {}
