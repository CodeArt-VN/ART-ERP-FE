import { Component, Input, NgModule } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
// import { APPROVAL_RequestProvider } from 'src/app/services/static/services.service';
import { MapCompsModule } from 'src/app/components/map-comps/map-comps.module';
import { APPROVAL_RequestProvider } from 'src/app/services/static/services.service';

@Component({
	selector: 'app-data-correction-request-modal',
	templateUrl: './data-correction-request-modal.html',
	styleUrls: ['./data-correction-request-modal.scss'],
	standalone: false,
})

export class DataCorrectionRequestModalPage extends PageBase {
	formArray: FormArray;
	formGroup: FormGroup;
	@Input() item: any;
	@Input() model: any;
	constructor(
		public formBuilder: FormBuilder,
		public pageProvider: APPROVAL_RequestProvider,
		public route: ActivatedRoute,
		public router: Router,
		public navCtrl: NavController,
		public env: EnvService,
		public modalController: ModalController
	) {
		super();
		this.formGroup = this.formBuilder.group({
		});
		this.formArray = new FormArray([]);
	}

	preLoadData() {
		this.loadData();
	}

	loadData() {
		super.loadedData();
		this.buildGroup();
		//this.buildFormGroup();
		console.log(this.model);
		console.log(this.formArray);
		
		// console.log(this.formGroup.get('Addresses').value.length)
		// console.log('controls Addresses', this.formGroup.get('Addresses')['controls'])
	}

	submitForm() {
		let object = {
			Type: 'DataCorrection',
			IDBranch: this.item.IDBranch,
			SubType: this.model.type,
			UDF01: this.item.Id,
			UDF16: JSON.stringify(this.formGroup.getRawValue()),
		};

		console.log(object);
		this.env
			.showPrompt('Do you want to submit data ?', null, 'You are adjusting data !', 'Yes', 'No')
			.then((_) => {
				this.env
					.showLoading('Please wait for a few moments', this.pageProvider.save(object))
					.then((rs) => {
						this.env.showMessage('Saved', 'success');
						this.modalController.dismiss();
					})
					.catch((err) => {
						this.env.showMessage(err.error?.InnerException?.ExceptionMessage || err, 'danger');
					});
			})
			.catch((err) => {});
	}
	buildGroup() {
		if (this.model?.fields) {
			let formGroup = this.formGroup as FormGroup;
			this.model.fields.forEach(f => {
				if(f.type == 'Group') {
					f.groups.forEach(g => {
						if (g.cols) {
							g.subCols = {};
							Object.keys(g.cols).forEach((k) => {
								g.subCols[k] = typeof g.cols[k] != 'string' ? (12 - g.cols[k] == 0 ? 12 : 12 - g.cols[k]) : g.cols[k];
							});
						}
						let gr = this.formBuilder.group({
							title: g.title,
							cols: g.cols,
							subCols: g.subCols,
						});
						this.formArray.push(gr);
						if(g.fields) {
							this.patchData(g.fields, this.item, formGroup,g.subCols,gr)

						}
					})
				}
			  })
		} else return;
	}
	buildFormGroup() {
		let formArray = this.formArray.controls;
		formArray.forEach((fg: any) => {
			fg.get('fields').value.forEach((f) => {
				if (f.type == 'FormGroup') {
					let gr = new FormGroup({}) as any;
					gr.field = f;
					fg.addControl(f.id, gr);
					this.patchFormGroup(f.fields, this.item[f.id], gr, fg);
				} else if (f.type == 'FormArray') {
					fg.addControl(f.id, new FormArray([]));
					let formArray = fg.get(f.id) as any;
					formArray.field = f;
					if (f.fields) {
						this.item[f.id]?.forEach((value) => {
							this.patchFormArray(f.fields, value, formArray, fg);
						});
					} else if (f.groups) {
						f.groups.forEach((g) => {
							let gr = new FormGroup({}) as any;
							let controlLabel = new FormControl(g.title) as any;
							gr.addControl('title', controlLabel);								
							let controlFields = new FormControl(g.fields) as any;
							gr.addControl('fields', controlFields);						
							if (g.cols) {
								let controlCols = new FormControl(g.cols) as any;
								gr.addControl('cols', controlCols);
								g.subCols = {};
								Object.keys(g.cols).forEach((k) => {
									g.subCols[k] = typeof g.cols[k] != 'string' ? (12 - g.cols[k] == 0 ? 12 : 12 - g.cols[k]) : g.cols[k];
								});
								let controlSubCols = new FormControl(g.subCols) as any;
								gr.addControl('subCols', controlSubCols);
								g.fields.forEach((fg) => {
									Object.keys(fg).forEach((key) => {
										if (key == 'cols') {
											Object.keys(fg.cols).forEach((col) => {
												let subCol = this.getSubCol(col, gr);
												fg.cols[col] = typeof g.cols[col] != 'string' && subCol ? 12 / (Math.floor(subCol / g.cols[col]) || 1) : g.cols[col];
											});
										}
									});
								});
							}

							this.item[f.id]?.forEach((value) => {
								this.patchFormArray(g.fields, value, formArray, fg, gr);
							});
						});
					}
				} 
				else if(f.type == 'addresses-component'){
					let gr = new FormGroup({}) as any;
					let controlValue = new FormControl({ value: this.item[f.id], disabled: false }) as any;
					gr.addControl('value', controlValue);
					gr.addControl('component', new FormControl({ value: f.type, disabled: false}));
					fg.addControl(f.id, gr);
				}
				else {
					let control = new FormControl({ value: this.item[f.id], disabled: f.disabled }) as any;
					control.field = f;
					if (f.cols) {
						Object.keys(f.cols).forEach((k) => {
							let subCol = this.getSubCol(k, fg);
							f.cols[k] = typeof f.cols[k] != 'string' && subCol ? 12 / (Math.floor(subCol / f.cols[k]) || 1) : f.cols[k];
						});
					}
					fg.addControl(f.id, control);
				}
			});
		});
		// this.model.fields.forEach(f => {
		//   if (f.type == "FormGroup") {
		//     let gr = new FormGroup({}) as any;
		//     gr.field = f;
		//     this.formGroup.addControl(f.id, gr);
		//     this.patchFormGroup(f.fields, this.item[f.id], gr)
		//   }
		//   else if (f.type == "FormArray") {
		//     this.formGroup.addControl(f.id, new FormArray([]));
		//     let formArray = this.formGroup.get(f.id) as any;
		//     formArray.field = f;
		//     this.item[f.id].forEach(value => {
		//       this.patchFormArray(f.fields, value, formArray)
		//     })
		//   }
		//   else {
		//     let control = new FormControl({ value: this.item[f.id], disabled: f.disabled }) as any;
		//     control.field = f
		//     this.formGroup.addControl(f.id, control);
		//   }
		// })
		console.log(this.formArray);
	}
	patchData(fields, value, fg :FormGroup,fgsubCols,group:FormGroup) {
		fields.forEach((f) => {
			if (f.type == 'FormGroup') {
				let gr = new FormGroup({}) as any;
				gr.field = f;
				group.addControl(f.id, gr);
				fg.addControl(f.id, gr);
				this.patchFormGroup(f, value[f.id], gr, fgsubCols);
			} else if (f.type == 'FormArray') {
				let formArray = new FormArray([]) as any;
				formArray.field = f;
				(formArray as any).parentGroup = fg;
				group.addControl(f.id, formArray);
				fg.addControl(f.id, formArray);
				value[f.id].forEach((v) => {
					this.patchFormArray(f.fields, v, formArray, fgsubCols);
				});
			} else if(f.type== 'addresses-component'){
				let formArray = new FormArray([]) as any;
				formArray.component = f.type;
				group.addControl(f.id, formArray);
				fg.addControl(f.id, formArray);
				value[f.id].forEach((v) => {
					let gr = new FormGroup({}) as any;
					Object.keys(v).forEach((key) => {
						let control = new FormControl({ value: v[key], disabled: false }) as any;
						gr.addControl(key, control);
					});
					formArray.push(gr);
				});
			}
			else if(f.type== 'tax-infos-component'){
				let formArray = new FormArray([]) as any;
				formArray.component = f.type;
				group.addControl(f.id, formArray);
				fg.addControl(f.id, formArray);
				value[f.id].forEach((v) => {
					let gr = new FormGroup({}) as any;
					Object.keys(v).forEach((key) => {
						let control = new FormControl({ value: v[key], disabled: false }) as any;
						gr.addControl(key, control);
					});
					formArray.push(gr);
				});
			}
			else{
				let control = new FormControl({ value: value[f.id], disabled: f.disabled }) as any;
				fg.addControl(f.id, control);
				control.field = f;
				group.addControl(f.id, control);
			}
		});
	}
	patchFormGroup(fields, value, fg, fgsubCols) {
		fields.forEach((f) => {
			if (f.type == 'FormGroup') {
				let gr = new FormGroup({}) as any;
				gr.field = f;
				fg.addControl(f.id, gr);
				this.patchFormGroup(f, value[f.id], gr, fgsubCols);
			} else if (f.type == 'FormArray') {
				let formArray = new FormArray([]) as any;
				formArray.field = f;
				fg.addControl(f.id, formArray);
				value[f.id].forEach((v) => {
					this.patchFormArray(f.fields, v, formArray, fgsubCols);
				});
			} else {
				let control = new FormControl({ value: value[f.id], disabled: f.disabled }) as any;
				control.field = f;
				fg.addControl(f.id, control);
			}
		});
	}

	patchFormArray(fields, value, formArray, fgsubCols, fg = null) {
		let gr = new FormGroup({});
		if (fg) gr = fg;
		fields.forEach((f) => {
			if (f.type == 'FormGroup') {
				let grChild = new FormGroup({}) as any;
				grChild.field = f;
				gr.addControl(f.id, grChild);
				this.patchFormGroup(f.fields, value[f.id], grChild, fgsubCols);
			} else if (f.type == 'FormArray') {
				let childArray = new FormArray([]) as any;
				childArray.field = f;
				formArray.push(childArray);
				value[f.id].forEach((d) => {
					this.patchFormArray(f.fields, d, childArray, fgsubCols);
				});
			} else {
				let control = new FormControl({ value: value[f.id], disabled: f.disabled }) as any;
				control.field = f;
				gr.addControl(f.id, control);
			}
			// f.attrs = {}; // Create an attrs object to store size attributes
			// if (f.cols) {
			//   f.cols.forEach(col => {
			//     const key = Object.keys(col)[0]; // Get breakpoint key (e.g., 'sm', 'md', 'lg')
			//     f.attrs[`size-${key === 'xs' ? '' : key}`] = col[key]; // Convert to Ionic size attributes
			//   });
			// }
			// else  f.attrs['size']=12;
		});
		formArray.push(gr);
	}

	getSubCol(col, fg) {
		switch (col) {
			case 'xl':
				if (fg.get('subCols').value['xl']) return fg.get('subCols').value['xl'];
				else return this.getSubCol('lg', fg);
			case 'lg':
				if (fg.get('subCols').value['lg']) return fg.get('subCols').value['lg'];
				else return this.getSubCol('md', fg);
			case 'md':
				if (fg.get('subCols').value['md']) return fg.get('subCols').value['md'];
				else return this.getSubCol('sm', fg);
			case 'sm':
				if (fg.get('subCols').value['sm']) return fg.get('subCols').value['sm'];
				else return this.getSubCol('xs', fg);
			case 'xs':
				if (fg.get('subCols').value['xs']) return fg.get('subCols').value['xs'];
				else return this.getSubCol('default', fg);
			case 'default':
				if (fg.get('subCols').value['default']) return fg.get('subCols').value['default'];
				else return this.getSubCol('default', fg);
			default:
				return 12;
		}
	}

	getField(fg, field) {
		let obj = { form: fg };
		return Object.assign(field, obj);
	}

	getKeys(fg) {
		return Object.keys(fg).filter((d) => !['fields', 'title', 'cols', 'subCols'].includes(d));
	}
	isFormControl(control: any): boolean {
		return (control instanceof FormControl);
	}

	isFormGroup(control: any): boolean {
		
		return (!control.controls.isComponent?.value && control instanceof FormGroup );
	}

	isFormArray(control: any): boolean {
		return (control instanceof FormArray);
	}

	getControlType(control: any | null): 'control' | 'group' | 'array' | null {
		if (!control) return null;
		if(control.component) return control.component;
		if (control instanceof FormControl) return 'control';
		if (control instanceof FormGroup && !control.get('isComponent')?.value) return 'group';
		if (control instanceof FormArray) return 'array';
		return null;
	  }

	objectKeys(obj: any): string[] {
		return Object.keys(obj);
	}
	changeAddress(addressCtrl: FormGroup, address: any, index: number) {
		Object.keys(address).forEach((key) => {
			if (!addressCtrl.contains(key)) {
				addressCtrl.addControl(key, new FormControl(null)); // Add dynamically
			}
		});
	
		// Now safely patch value
		addressCtrl.patchValue(address);
	}
	removeAddress(addressFG: FormGroup,fg:FormGroup,index){
		if(addressFG.get('Id').value){
			if(!this.formGroup.get('DeletedAddressFields')){
				this.formGroup.addControl('DeletedAddressFields', new FormControl([]));
			}
			this.formGroup.get('DeletedAddressFields').setValue([...this.formGroup.get('DeletedAddressFields').value,addressFG.get('Id').value]);
		}
		let formArray = fg.get('Addresses') as FormArray;
		formArray.removeAt(index);
	}
	addAddress(fg){
		let formArray = fg.get('Addresses') as FormArray;
		formArray.push(new FormGroup({}));
		// fg.get('Addresses').controls.value.setValue([{},...fg.get('Addresses').controls.value.value])
		// console.log(fg.get('Addresses').controls.value);
	}
	
	changeTaxInfo(taxInfoFormGroup: FormGroup,fg:FormGroup, address: any, index: number) {
		let formArray = fg.get('TaxInfos') as FormArray;
		if(address.IsDefault){
			formArray.controls.filter(d=> d.value.Id != taxInfoFormGroup.value.Id).forEach((g) => {
				g.get('IsDefault').setValue(false); // Update the value
			});
		}
		Object.keys(address).forEach((key) => {
			if (!taxInfoFormGroup.contains(key)) {
				taxInfoFormGroup.addControl(key, new FormControl(null)); // Add dynamically
			}
		});
		// Now safely patch value
		taxInfoFormGroup.patchValue(address);
	}
	removeTaxInfo(taxInfoFormGroup: FormGroup,fg,index){
		if(taxInfoFormGroup.get('Id').value){
			if(!this.formGroup.get('DeletedTaxInfoFields')){
				this.formGroup.addControl('DeletedTaxInfoFields', new FormControl([]));
			}
			this.formGroup.get('DeletedTaxInfoFields').setValue([...this.formGroup.get('DeletedTaxInfoFields').value,taxInfoFormGroup.get('Id').value]);
		}
		let formArray = fg.get('TaxInfos') as FormArray;
		formArray.removeAt(index);
	}
	addTaxInfo(fg){
		let formArray = fg.get('TaxInfos') as FormArray;
		formArray.push(new FormGroup({}));
		// fg.get('Addresses').controls.value.setValue([{},...fg.get('Addresses').controls.value.value])
		// console.log(fg.get('Addresses').controls.value);
	}
}
