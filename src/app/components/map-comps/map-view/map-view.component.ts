import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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
})
export class MapViewComponent extends PageBase {
  addressList = [];
  @Input() set CoordinateList(value) {
    this.addressList = value;
    console.log('Map View!')
  };

  @Output() savePosition = new EventEmitter();

  mapLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {
    lat: 11.0517262,
    lng: 106.8842023,
  };
  bounds;
  options = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    mapTypeControl: false,
    controlSize: 30,
    zoom: 16,
    styles: [{
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }]
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
    public httpClient: HttpClient,
  ) {
    super();

    this.formGroup = formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      Addresses: this.formBuilder.array([])
    });
    this.alwaysReturnProps.push('IDPartner');
    if (!this.env.isMapLoaded) {
      this.mapLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM', 'callback')
        .pipe(map(() => {
          this.env.isMapLoaded = true;
          this.initMap();
          return true;
        }), catchError((err) => {
          console.log(err);
          return of(false)
        }));
    }
    else {
      this.initMap();
    }
  }

  loadedData() {
    this.items = this.addressList;
    let j = 1;
    this.items.forEach((i:any) => {
      i.Lat = i.Coordinate[0].Lat;
      i.Long = i.Coordinate[0].Long;
      let lat: number = + i.Lat;
      let long: number = + i.Long;

      let markerOption: google.maps.MarkerOptions = {
        draggable: true,
        // label: { text: '' + (j++), color: 'white' }, // Mark Number
        // label: {color: 'white' },
        position: {
          lat: lat ? lat : this.center.lat,
          lng: lat ? long : this.center.lng,
        },
        animation: google.maps.Animation.DROP,
      };

      this.bounds.extend({
        lat: lat ? lat : this.center.lat,
        lng: lat ? long : this.center.lng,
      });

      i.option = markerOption;
    });

    this.map.fitBounds(this.bounds, 100);
  }

  initMap() {
    this.bounds = new google.maps.LatLngBounds();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  openInfo(marker: MapMarker, content) {
    this.item = content;

    this.item.Contact = content._Contact._Addresses[0].Contact;
    this.item.Phone1 = content._Contact._Addresses[0].Phone1;
    this.item.Phone2 = content._Contact._Addresses[0].Phone2;
    this.item.AddressLine1 = content._Contact._Addresses[0].AddressLine1;
    this.item.Ward = content._Contact._Addresses[0].Ward;
    this.item.District = content._Contact._Addresses[0].District;
    this.item.Province = content._Contact._Addresses[0].Province;
    this.item.Country = content._Contact._Addresses[0].Country;
    this.item.AddressLine2 = content._Contact._Addresses[0].AddressLine2;

    this.infoWindow.open(marker)
  }

  changePosition(marker: MapMarker, content:any) {

    this.alertCtrl.create({
      message: 'Bạn có chắc muốn di chuyển đến vị trí này?',
      buttons: [
        { text: 'Không', role: 'cancel' },
        {
          text: 'Đồng ý',
          cssClass: 'danger-btn',
          handler: () => {
            this.savePosition.emit({marker, content});
          }
        }
      ]
    }).then(alert => {
      alert.present();
    })
  }
  
}
