import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { CRM_PartnerAddressProvider, LIST_AddressSubdivisionProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
	standalone: false,
})
export class AddressComponent extends PageBase {
	DistrictList;
	ProvinceList;
	addressesList;
	addressSubdivisionDataSource;
	provinceDataSource;
	districtDataSource;
	wardDataSource;

	showLatLong = false;
	typeList: any = [];
	@Input() canEdit;

	@Input() set config(value) {
		this.pageConfig = value;
		console.log(value);
	}
	@Input() set address(value) {
		// this.item = value;
		// this.buildForm();
		if (value) {
			this.item = value;
			if (this.formGroup) {
				this.formGroup.markAsPristine();
				this.formGroup.patchValue(this.item);
			}
		}
	}
	@Input() set types(value) {
		this.typeList = value;
	}
	@Input() set mapLoading(value) {
		this.env.isMapLoaded = value;
	}
	mapLoaded: Observable<boolean>;
	center: google.maps.LatLngLiteral = {
		lat: 11.0517262,
		lng: 106.8842023,
	};
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
	markerOptions: google.maps.MarkerOptions = {
		draggable: true,
	};

	constructor(
		public pageProvider: CRM_PartnerAddressProvider,
		public addressListProvider: LIST_AddressSubdivisionProvider,
		public env: EnvService,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public httpClient: HttpClient,
		public dynamicScriptLoaderService: DynamicScriptLoaderService,
		public translate: TranslateService
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.formGroup = this.formBuilder.group({
			Id: [''],
			Type: [''],
			AddressLine1: ['', Validators.required],
			AddressLine2: [''],
			Country: [''],
			Province: [''],
			District: [''],
			Ward: [''],
			ZipCode: [''],
			Lat: [''],
			Long: [''],
			Contact: [''],
			Phone1: [''],
			Phone2: [''],
			Remark: [''],
		});
	}

	preLoadData(event = null) {
		this.addressSubdivisionDataSource = [...this.env.addressSubdivisionList];
		this.loadData();
	}
	loadData() {
		this.loadedData();
	}
	loadedData() {
		super.loadedData();
		this.provinceDataSource = [...this.addressSubdivisionDataSource.filter((d) => d.Type == 'ProvincialLevel')];
		this.changeProvince();
		this.pageConfig.canEdit = this.canEdit;
		if (!this.canEdit) this.formGroup?.disable();
	}

	changeProvince(markAsDirty = false) {
		let province = [...this.addressSubdivisionDataSource].find((d) => d.Name == this.formGroup.get('Province').value);
		this.districtDataSource = [...this.addressSubdivisionDataSource.filter((d) => d.Type == 'MunicipalLevel')];
		if (province) {
			this.districtDataSource = this.districtDataSource.filter((d) => d.IDParent == province.Id);
		}
		this.changeDistrict(markAsDirty);
		if (markAsDirty) this.submitChange();
	}

	changeDistrict(markAsDirty = false) {
		let district = [...this.addressSubdivisionDataSource].find((d) => d.Name == this.formGroup.get('District').value);
		this.wardDataSource = [...this.addressSubdivisionDataSource.filter((d) => d.Type == 'SubMunicipalLevel')];
		if (district) {
			this.wardDataSource = this.wardDataSource.filter((d) => d.IDParent == district.Id);
		}
		if (markAsDirty) this.submitChange();
	}

	changeCoordinate(coordinate, form: FormGroup) {
		console.log(coordinate);
		form.controls.Lat.setValue(coordinate.Lat);
		form.controls.Long.setValue(coordinate.Long);
		form.controls.Lat.markAsDirty();
		form.controls.Long.markAsDirty();
		this.submitChange();
	}

	@Output() onChange = new EventEmitter();
	submitChange(event = null) {
		if (!this.formGroup.valid) {
			let invalidControls = super.findInvalidControlsRecursive(this.formGroup);
			const translationPromises = invalidControls.map((control) => this.env.translateResource(control));
			Promise.all(translationPromises).then((values) => {
				let invalidControlsTranslated = values;
				this.env.showMessage('Please recheck control(s): {{value}}', 'warning', invalidControlsTranslated.join(' | '));
			});
		} else this.onChange.emit(this.formGroup.value);
	}

	@Output() onDelete = new EventEmitter();
	removeAddress() {
		this.env
			.showPrompt('Bạn có chắc muốn xóa không?', null, 'Xóa địa chỉ')
			.then((_) => {
				this.onDelete.emit(this.formGroup.getRawValue());
			})
			.catch((_) => {});
	}
}
