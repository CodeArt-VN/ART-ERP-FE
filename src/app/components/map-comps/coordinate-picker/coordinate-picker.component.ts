import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MapMarker } from '@angular/google-maps';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-coordinate-picker',
    templateUrl: './coordinate-picker.component.html',
    styleUrls: ['./coordinate-picker.component.scss'],
    standalone: false
})
export class CoordinatePickerComponent implements OnInit {
  item;
  @Input() set canEdit(value) {
    this.markerOptions.draggable = value;
  }
  @Input() set address(value) {
    if(value.Lat){
      try{
        value.Lat =parseFloat(value.Lat.replace(',', '.'));
      }catch(err){}
    }
    if(value.Long){
      try{
        value.Long = parseFloat(value.Long.replace(',', '.'));
      }catch(err){}
    }
    this.formGroup?.patchValue(value);
    this.formGroup?.markAsPristine();
  }
  @Output() change = new EventEmitter();

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
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  formGroup;

  center: google.maps.LatLngLiteral = {
    lat: 11.0517262,
    lng: 106.8842023,
  };

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    public loadingController: LoadingController,
    public httpClient: HttpClient,
  ) {
    this.formGroup = formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      Country: [''],
      Province: [''],
      District: [''],
      Ward: [''],
      AddressLine1: ['', Validators.required],
      AddressLine2: [''],
      ZipCode: [''],
      Lat: [''],
      Long: [''],
      Contact: ['', Validators.required],
      Phone1: ['', Validators.required],
      Phone2: [''],
      Remark: [''],
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // if (typeof google === 'object' && typeof google.maps === 'object') {
    // }
    // else {
    //   if (this.Index == 1) {
    //     Promise.all([
    //       this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM&sensor=false', 'callback').toPromise()
    //     ]).then((values: any) => {
    //     });
    //   }
    // }
  }

  saveChange() {
    this.change.emit(this.formGroup.value);
  }

  changePosition(marker: MapMarker) {
    this.formGroup.controls.Lat.setValue(marker.getPosition().lat());
    this.formGroup.controls.Lat.markAsDirty();
    this.formGroup.controls.Long.setValue(marker.getPosition().lng());
    this.formGroup.controls.Long.markAsDirty();
    this.saveChange();
  }

  geocoding;
  findCoordinate() {
    let add = this.formGroup.value;
    let addressTerm =
      (add.AddressLine2 + ', ' || '') +
      (add.AddressLine1 + ', ' || '') +
      (add.Ward + ', ' || '') +
      (add.District + ', ' || '') +
      (add.Province || '');
    addressTerm = addressTerm.replace(/ /g, '+').replace(/\//g, '%2F');

    this.httpClient
      .get(
        'https://maps.google.com/maps/api/geocode/json?address=' +
          addressTerm +
          '&sensor=false&key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM',
      )
      .toPromise()
      .then((data: any) => {
        this.geocoding = data.results[0]?.geometry?.location;
        console.log(data.results[0]);
        console.log(this.geocoding);

        let lat: number = +this.geocoding.lat;
        let long: number = +this.geocoding.lng;
        this.formGroup.controls.Lat.setValue(lat);
        this.formGroup.controls.Lat.markAsDirty();
        this.formGroup.controls.Long.setValue(long);
        this.formGroup.controls.Long.markAsDirty();
        this.saveChange();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  GetCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.formGroup.controls.Lat.setValue(position.coords.latitude);
        this.formGroup.controls.Lat.markAsDirty();
        this.formGroup.controls.Long.setValue(position.coords.longitude);
        this.formGroup.controls.Long.markAsDirty();
        this.saveChange();
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
