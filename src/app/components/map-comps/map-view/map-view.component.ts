import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker, MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable, interval, of } from 'rxjs';
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

  @Output() savePosition = new EventEmitter();

  mapLoaded: Observable<boolean>;
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
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
  waypoints = [];
  origin;
  destination;
  intervalGetAddress = null;
  intervalSetdirectionsResults = null;
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
    private mapDirectionsService: MapDirectionsService,
  ) {
    super();

    this.formGroup = formBuilder.group({
      Id: new FormControl({ value: '', disabled: true }),
      Addresses: this.formBuilder.array([]),
    });

    if (!this.env.isMapLoaded) {
      this.mapLoaded = httpClient
        .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAtyM-Th784YwQUTquYa0WlFIj8C6RB2uM', 'callback')
        .pipe(
          map(() => {
            this.env.isMapLoaded = true;
            this.initMap();
            return true;
          }),
          catchError((err) => {
            console.log(err);
            return of(false);
          }),
        );
    } else {
      this.initMap();
    }
  }

  async loadedData() {
    this.items = this.addressList;
    await this.getCurrentLocation();
    this.intervalFitBound = setInterval(() => {
      if (this.map && google) {
        let j = 1;
        this.items.forEach((i: any) => {
          i.Lat = i.Coordinate[0].Lat;
          i.Long = i.Coordinate[0].Long;
          let lat: number = +i.Lat;
          let long: number = +i.Long;
          this.waypoints.push({ location: { lat: lat, lng: long }, stopover: true });
          if (lat && long) {
            let markerOption: google.maps.MarkerOptions = {
              draggable: true,
              // label: { text: '' + (j++), color: 'white' },
              position: { lat: lat, lng: long },
              animation: google.maps.Animation.DROP,
            };

            this.bounds.extend({ lat: lat, lng: long });

            i.option = new google.maps.Marker(markerOption);
          }
        });
        if(this.waypoints.length > 0){
          this.destination = this.findFarthestPoint(
            this.origin,
            this.waypoints.map((m) => m.location).filter((d) => d.lat != 0 && d.lng != 0),
          );
          let item = this.items.find(
            (i) =>
              i.Coordinate[0].Lat == this.destination.lat.toString() &&
              i.Coordinate[0].Long == this.destination.lng.toString(),
          );
          if (item) {
            let index = this.items.indexOf(item);
            this.items.splice(index, 1);
            let lat: number = +item.Coordinate[0].lat;
            let long: number = +item.Coordinate[0].lng;
            let markerOption1: google.maps.MarkerOptions = {
              draggable: true,
              // label: { text: '' + (j++), color: 'white' },
              position: { lat: parseFloat(item.Coordinate[0].Lat), lng: parseFloat(item.Coordinate[0].Long) },
              animation: google.maps.Animation.DROP,
              icon: {
                path: google.maps.SymbolPath.CIRCLE, // Hình dạng tròn
                fillColor: '#b50f04', // Màu đỏ
                fillOpacity: 0.8,
                strokeColor: '#FFFFFF', // Màu viền trắng
                strokeWeight: 2,
                scale: 10, // Kích thước của hình tròn
              },
            };
            item.option = markerOption1;
            this.items = [...this.items, ...[item]];
          }
        }
       

        this.map.fitBounds(this.bounds, 100);
        clearInterval(this.intervalFitBound);
      }
    }, 500);

    //Vẽ tuyến đường
    // this.intervalSetdirectionsResults = setInterval(() => {
    //   if (this.origin && this.waypoints.length > 0) {
    //     console.log('directionsResults ne :', this.origin, this.waypoints);
    //     const request: google.maps.DirectionsRequest = {
    //       destination: this.destination, // điểm cuối
    //       origin: this.origin, // điểm đầu
    //       waypoints: this.waypoints, // điểm dừng
    //       travelMode: google.maps.TravelMode.DRIVING,
    //       optimizeWaypoints: true, // Tối ưu hóa thứ tự điểm dừng
    //     };
    //     this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map((response) => response.result));
    //     clearInterval(this.intervalSetdirectionsResults);
    //   }
    // }, 500);
  }
 
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // Lưu tọa độ vào origin

          this.origin = { lat, lng };

          // this.items = [...this.items, ...[{ Coordinate: [{ Lat: lat, Long: lng }] }]];
          let address = await this.getAddressFromCoordinates(lat, lng);
          console.log('Address ne :', address);

          let markerOption: google.maps.MarkerOptions = {
            draggable: true,
            // label: { text: '' + (j++), color: 'white' },
            position: { lat: this.origin.lat, lng: this.origin.lng },
            animation: google.maps.Animation.DROP,
            icon: {
              path: google.maps.SymbolPath.CIRCLE, // Hình dạng tròn
              fillColor: '#0505f0', // Màu đỏ
              fillOpacity: 0.8,
              strokeColor: '#FFFFFF', // Màu viền trắng
              strokeWeight: 2,
              scale: 10, // Kích thước của hình tròn
            },
          };
          this.bounds.extend({ lat: this.origin.lat, lng: this.origin.lng });

          this.origin.option = markerOption;
          this.map.fitBounds(this.bounds, 100);
          this.items = [
            ...this.items,
            ...[
              {
                _Contact: {
                  CustomerName: 'Vị trí hiện tại',
                  _Addresses: [
                    {
                      AddressLine1: address,
                      Contact: 'Vị trí hiện tại',
                      Phone1: '',
                      Phone2: '',
                      Ward: '',
                      District: '',
                      Province: '',
                      Country: '',
                      AddressLine2: '',
                    },
                  ],
                },
                Coordinate: [{ Lat: lat, Long: lng }],
                option: markerOption,
              },
            ],
          ];
          console.log('ITems ne :', this.items);
        },
        (error) => {
          console.error('Không thể lấy vị trí:', error);
          this.env.showMessage('Không thể lấy vị trí', 'danger');
        },
      );
    } else {
      console.error('Trình duyệt không hỗ trợ Geolocation');
    }
  }

  getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.intervalGetAddress = setInterval(() => {
        if (google) {
          const geocoder = new google.maps.Geocoder();
          const latLng = new google.maps.LatLng(lat, lng);

          geocoder.geocode({ location: latLng }, (results: any, status: any) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                const currentAddress = results[0].formatted_address; // Lấy địa chỉ
                console.log('Địa chỉ hiện tại:', currentAddress);
                clearInterval(this.intervalGetAddress);
                resolve(currentAddress); // Resolve Promise với địa chỉ
              } else {
                console.error('Không tìm thấy địa chỉ');
                clearInterval(this.intervalGetAddress);

                reject('Không tìm thấy địa chỉ'); // Reject Promise nếu không tìm thấy địa chỉ
              }
            } else {
              console.error('Lỗi Geocoding:', status);
              clearInterval(this.intervalGetAddress);

              reject('Không tìm thấy địa chỉ'); // Reject Promise nếu có lỗi
            }
          });
        }
      }, 500);
    });
  }

  intervalFitBound = null;

  initMap() {
    this.bounds = new google.maps.LatLngBounds();
  }

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

  //Ham tinh khoang cach giua 2 diem
  haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) 
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  //Ham tim diem xa nhat
  findFarthestPoint(
    start: { lat: number; lng: number },
    points: { lat: number; lng: number }[],
  ): { lat: number; lng: number } {
    let farthestPoint = points[0]; // Giả sử điểm xa nhất ban đầu là điểm đầu tiên trong danh sách
    let maxDistance = 0; // Khoảng cách lớn nhất ban đầu là 0

    // Duyệt qua tất cả các điểm và tính khoảng cách
    points.forEach((point) => {
      const distance = this.haversine(start.lat, start.lng, point.lat, point.lng);
      if (distance > maxDistance) {
        maxDistance = distance;
        farthestPoint = point; // Cập nhật điểm xa nhất nếu tìm thấy khoảng cách lớn hơn
      }
    });

    return farthestPoint; // Trả về điểm xa nhất
  }

  //Ham sap xep diem theo thu tu ngan nhat
  sortByShortestPath(points: { lat: number; lng: number }[]): { lat: number; lng: number }[] {
    // Bước 1: Lấy điểm đầu tiên (giả sử là điểm xuất phát)
    const start = points[0];

    // Bước 2: Sắp xếp điểm còn lại theo thứ tự gần nhất
    const remainingPoints = [...points];
    remainingPoints.shift(); // Xóa điểm đầu tiên (đã chọn làm điểm xuất phát)

    let currentPoint = start;
    const sortedPoints = [currentPoint];

    while (remainingPoints.length > 0) {
      let closestDistance = Infinity;
      let closestPointIndex = -1;

      // Tìm điểm gần nhất
      for (let i = 0; i < remainingPoints.length; i++) {
        const point = remainingPoints[i];
        const distance = this.haversine(currentPoint.lat, currentPoint.lng, point.lat, point.lng);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPointIndex = i;
        }
      }

      // Chọn điểm gần nhất và thêm vào danh sách
      currentPoint = remainingPoints[closestPointIndex];
      sortedPoints.push(currentPoint);

      // Xóa điểm đã chọn khỏi danh sách
      remainingPoints.splice(closestPointIndex, 1);
    }

    return sortedPoints;
  }


}
