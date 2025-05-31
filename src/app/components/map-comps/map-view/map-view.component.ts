import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
	selector: 'app-map-view',
	templateUrl: './map-view.component.html',
	styleUrls: ['./map-view.component.scss'],
	standalone: false,
})
export class MapViewComponent extends PageBase {
	@ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;

	addressList = [];
	@Input() set CoordinateList(value) {
		this.addressList = value;
	}

	@Input() IsDragable: boolean = false;

	@Output() savePosition = new EventEmitter();

	mapLoaded: Observable<boolean>;

	bounds;
	options = {
		scrollwheel: false,
		disableDoubleClickZoom: true,
		streetViewControl: false,
		mapTypeControl: false,
		controlSize: 30,
		zoom: 16,
		styles: [
			{
				featureType: 'poi',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
			{
				featureType: 'transit',
				stylers: [
					{
						visibility: 'off',
					},
				],
			},
		],
	};

	constructor(
		// public pageProvider: CRM_RouteDetailProvider,
		public env: EnvService,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public httpClient: HttpClient
	) {
		super();

		this.formGroup = formBuilder.group({
			Id: new FormControl({ value: '', disabled: true }),
			Addresses: this.formBuilder.array([]),
		});

		if (!this.env.isMapLoaded) {
			this.mapLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM', 'callback').pipe(
				map(() => {
					this.env.isMapLoaded = true;
					this.initMap();
					return true;
				}),
				catchError((err) => {
					console.log(err);
					return of(false);
				})
			);
		} else {
			this.initMap();
		}
	}

	loadedData() {
		this.items = this.addressList;

		this.intervalFitBound = setInterval(() => {
			if (this.map && google) {
				let j = 1;
				this.items.forEach((i: any) => {
					i.Lat = i.Address?.Lat;
					i.Long = i.Address?.Long;
					let lat: number = +i.Lat;
					let long: number = +i.Long;

					if (lat && long) {
						let markerOption = {
							draggable: this.IsDragable,
							position: { lat: lat, lng: long },
							animation: google.maps.Animation.DROP,
							icon: {
								path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
								scale: 1.5, // Size of the marker
								fillColor: i.Color || '#FF5733', // Marker color (default to orange if no color is provided)
								fillOpacity: 0.8, // Opacity of the color
								strokeWeight: 0.5, // Border thickness
								//strokeColor: i.Color, // Border color
							},
						};

						this.bounds.extend({ lat: lat, lng: long });

						i.option = markerOption;
					}
				});

				this.map.fitBounds(this.bounds, 100);
				clearInterval(this.intervalFitBound);
			}
		}, 500);
	}

	intervalFitBound = null;

	initMap() {
		this.bounds = new google.maps.LatLngBounds();
	}

	openInfo(marker: MapMarker, content) {
		this.item = content;
		this.infoWindow.open(marker);
	}

	changePosition(marker: MapMarker, content: any) {
		this.alertCtrl
			.create({
				message: 'Bạn có chắc muốn di chuyển đến vị trí này?',
				buttons: [
					{ text: 'Không', role: 'cancel' },
					{
						text: 'Đồng ý',
						cssClass: 'danger-btn',
						handler: () => {
							this.savePosition.emit({ marker, content });
						},
					},
				],
			})
			.then((alert) => {
				alert.present();
			});
	}
}
