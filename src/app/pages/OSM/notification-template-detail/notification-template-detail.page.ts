import { Component, ChangeDetectorRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom/custom.service';
import { BRA_BranchProvider, OSM_CategoryProvider, OSM_TemplateProvider, WMS_ZoneProvider } from 'src/app/services/static/services.service';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';

declare var Quill: any;

@Component({
	selector: 'app-notification-template-detail',
	templateUrl: './notification-template-detail.page.html',
	styleUrls: ['./notification-template-detail.page.scss'],
	standalone: false,
})
export class NotificationTemplateDetailPage extends PageBase {
	categoryList: any[] = [];
	channelList: any[] = [];
	@ViewChildren('quillEditorSubject') quillElementSubject: QueryList<ElementRef>;
	@ViewChildren('quillEditorBody') quillElementBody: QueryList<ElementRef>;
	editorSubject: any;
	editorBody: any;
	showEditorContent = {
		Subject: true,
		Body: true,
	};

	templateBeforeChange = {
		Subject: '',
		Body: '',
	};

	constructor(
		public pageProvider: OSM_TemplateProvider,
		public osmCategoryProvider: OSM_CategoryProvider,
		public branchProvider: BRA_BranchProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService,
		private dynamicScriptLoaderService: DynamicScriptLoaderService
	) {
		super();
		this.pageConfig.isDetailPage = true;

		this.formGroup = formBuilder.group({
			IDBranch: [this.env.selectedBranch],
			IDCategory: [''],
			Channel: ['Zalo'],
			Id: new FormControl({ value: '', disabled: true }),
			Code: [''],
			Name: ['', Validators.required],
			Remark: [''],
			Sort: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			Subject: [''],
			Body: [''],
		});
	}
	segmentView = 's1';
	segmentChanged(ev: any) {
		this.segmentView = ev.detail.value;
	}

	preLoadData(event?: any): void {
		Promise.all([this.env.getType('OSMChannel'),this.osmCategoryProvider.read()]).then((values : any) => {
			this.channelList = values[0];
			this.categoryList = values[1].data;
		});


		// this.categoryList = [
		// 	{
		// 		Id: '1',
		// 		Name: 'SALE',
		// 	},
		// 	{
		// 		Id: '2',
		// 		Name: 'Order',
		// 	},
		// 	{
		// 		Id: '3',
		// 		Name: 'WMS',
		// 	},
		// 	{
		// 		Id: '4',
		// 		Name: 'Outbound',
		// 	},
		// ];

		// this.channelList = [
		// 	{ Code: 'Zalo', Name: 'Zalo' },
		// 	{ Code: 'SMS', Name: 'SMS' },
		// 	{ Code: 'Email', Name: 'Email' },
		// 	{ Code: 'App', Name: 'App' },
		// 	{ Code: 'Web', Name: 'Web' },
		// 	{ Code: 'Push', Name: 'Push' },
		// 	{ Code: 'WhatsApp', Name: 'WhatsApp' },
		// 	{ Code: 'Telegram', Name: 'Telegram' },
		// 	{ Code: 'Viber', Name: 'Viber' },
		// 	{ Code: 'Line', Name: 'Line' },
		// 	{ Code: 'WeChat', Name: 'WeChat' },
		// 	{ Code: 'Facebook', Name: 'Facebook' },
		// 	{ Code: 'Twitter', Name: 'Twitter' },
		// 	{ Code: 'Instagram', Name: 'Instagram' },
		// ];

		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		if (this.item) {
			this.templateBeforeChange.Subject = this.item.Subject;
			this.templateBeforeChange.Body = this.item.Body;
		}
		this.initQuill();
	}

	async saveChange() {
		super.saveChange2();
	}

	ngAfterViewInit() {
		this.quillElementSubject.changes.subscribe((elements) => {
			if (typeof elements.first !== 'undefined') {
				this.loadQuillEditor();
			}
		});
		this.quillElementBody.changes.subscribe((elements) => {
			if (typeof elements.first !== 'undefined') {
				this.loadQuillEditor();
			}
		});
	}

	initQuill() {
		if (typeof Quill !== 'undefined') {
			const existingToolbars = document.querySelectorAll('.ql-toolbar');
			if (existingToolbars && existingToolbars.length > 0) {
				existingToolbars.forEach((toolbar) => {
					toolbar.parentNode.removeChild(toolbar);
				});
			}
			if (this.showEditorContent.Subject) {
				this.editorSubject = new Quill('#quillEditorSubject', {
					modules: {
						toolbar: {
							container: [
								['bold', 'italic', 'underline', 'strike'], // toggled buttons
								['blockquote', 'code-block'],

								[{ header: 1 }, { header: 2 }], // custom button values
								[{ list: 'ordered' }, { list: 'bullet' }],
								[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
								[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
								[{ direction: 'rtl' }], // text direction

								[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
								[{ header: [1, 2, 3, 4, 5, 6, false] }],

								[{ color: [] }, { background: [] }], // dropdown with defaults from theme
								[{ font: [] }],
								[{ align: [] }],
								['image', 'code-block'],

								['clean'], // remove formatting button
								['fullscreen'],
								['showhtml'],
							],
							handlers: {
								image: this.imageHandler.bind(this),
								// fullscreen: () => this.toggleFullscreen(),
								showhtml: () => this.showHtml(this.editorSubject, 'Subject'),
							},
						},
					},
					theme: 'snow',
					placeholder: 'Typing ...',
				});
				const quillEditorSubject = document.querySelector('#quillEditorSubject .ql-editor') as HTMLElement;
				if (quillEditorSubject) {
					quillEditorSubject.style.backgroundColor = '#ffffff';
					quillEditorSubject.style.height = '100%';
					quillEditorSubject.style.width = '100%';
					quillEditorSubject.style.minHeight = 'calc(-400px + 100vh)';
				}
				const quillEditorSubjectParent = document.querySelector('#quillEditorSubject') as HTMLElement;
				if (quillEditorSubjectParent) {
					quillEditorSubjectParent.style.height = '100%';
					quillEditorSubjectParent.style.width = '100%';
				}
				this.editorSubject.on('text-change', (delta, oldDelta, source) => {
					if (typeof this.editorSubject.root.innerHTML !== 'undefined' && this.item.Subject !== this.editorSubject.root.innerHTML) {
						this.formGroup.controls.Subject.setValue(this.editorSubject.root.innerHTML);
						this.formGroup.controls.Subject.markAsDirty();
					}
					if (this.editorSubject.root.innerHTML == '<p><br></p>') {
						this.formGroup.controls.Subject.setValue(null);
					}
				});
				const toolbarCustomSubject = this.editorSubject.getModule('toolbar');
				const fullscreenButtonSubject = toolbarCustomSubject.container.querySelector('button.ql-fullscreen');
				if (fullscreenButtonSubject) {
					const fullscreenIconSubject = document.createElement('ion-icon');
					fullscreenIconSubject.setAttribute('name', 'resize');
					fullscreenIconSubject.setAttribute('color', 'dark');
					fullscreenButtonSubject.innerHTML = '';
					fullscreenButtonSubject.appendChild(fullscreenIconSubject);
				}
				const showHtmlButtonSubject = toolbarCustomSubject.container.querySelector('button.ql-showhtml');
				if (showHtmlButtonSubject) {
					const showHtmlIconSubject = document.createElement('ion-icon');
					showHtmlIconSubject.setAttribute('name', 'logo-html5');
					showHtmlIconSubject.setAttribute('color', 'dark');
					showHtmlButtonSubject.innerHTML = '';
					showHtmlButtonSubject.appendChild(showHtmlIconSubject);
				}
			}
			if (this.showEditorContent.Body) {
				this.editorBody = new Quill('#quillEditorBody', {
					modules: {
						toolbar: {
							container: [
								['bold', 'italic', 'underline', 'strike'], // toggled buttons
								['blockquote', 'code-block'],

								[{ header: 1 }, { header: 2 }], // custom button values
								[{ list: 'ordered' }, { list: 'bullet' }],
								[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
								[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
								[{ direction: 'rtl' }], // text direction

								[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
								[{ header: [1, 2, 3, 4, 5, 6, false] }],

								[{ color: [] }, { background: [] }], // dropdown with defaults from theme
								[{ font: [] }],
								[{ align: [] }],
								['image', 'code-block'],

								['clean'], // remove formatting button
								['fullscreen'],
								['showhtml'],
							],
							handlers: {
								image: this.imageHandler.bind(this),
								// fullscreen: () => this.toggleFullscreen(),
								showhtml: () => this.showHtml(this.editorBody, 'Body'),
							},
						},
					},
					theme: 'snow',
					placeholder: 'Typing ...',
				});
				//choose image
				//this.editor.getModule("toolbar").addHandler("image", this.imageHandler.bind(this));

				const quillEditorBodyContainer = document.querySelector('#quillEditorBody .ql-editor') as HTMLElement;
				if (quillEditorBodyContainer) {
					quillEditorBodyContainer.style.backgroundColor = '#ffffff';
					quillEditorBodyContainer.style.height = '100%';
					quillEditorBodyContainer.style.width = '100%';
					quillEditorBodyContainer.style.minHeight = 'calc(-400px + 100vh)';
				}
				const quillEditorBodyParent = document.querySelector('#quillEditorBody') as HTMLElement;
				if (quillEditorBodyParent) {
					quillEditorBodyParent.style.height = '100%';
					quillEditorBodyParent.style.width = '100%';
				}

				this.editorBody.on('text-change', (delta, oldDelta, source) => {
					if (typeof this.editorBody.root.innerHTML !== 'undefined' && this.item.Body !== this.editorBody.root.innerHTML) {
						this.formGroup.controls.Body.setValue(this.editorBody.root.innerHTML);
						this.formGroup.controls.Body.markAsDirty();
					}
					if (this.editorBody.root.innerHTML == '<p><br></p>') {
						this.formGroup.controls.Body.setValue(null);
					}
				});
				// icon fullscreen
				const toolbarCustomBody = this.editorBody.getModule('toolbar');
				const fullscreenButtonBody = toolbarCustomBody.container.querySelector('button.ql-fullscreen');
				if (fullscreenButtonBody) {
					const fullscreenIconBody = document.createElement('ion-icon');
					fullscreenIconBody.setAttribute('name', 'resize');
					fullscreenIconBody.setAttribute('color', 'dark');
					fullscreenButtonBody.innerHTML = '';
					fullscreenButtonBody.appendChild(fullscreenIconBody);
				}

				// icon show HTML
				const showHtmlButtonBody = toolbarCustomBody.container.querySelector('button.ql-showhtml');
				if (showHtmlButtonBody) {
					const showHtmlIconBody = document.createElement('ion-icon');
					showHtmlIconBody.setAttribute('name', 'logo-html5');
					showHtmlIconBody.setAttribute('color', 'dark');
					showHtmlButtonBody.innerHTML = '';
					showHtmlButtonBody.appendChild(showHtmlIconBody);
				}
			}

			const toolbar = document.querySelector('.ql-toolbar');
			toolbar.addEventListener('mousedown', (event) => {
				event.preventDefault();
			});
		}
	}

	loadQuillEditor() {
		if (typeof Quill !== 'undefined') {
			this.initQuill();
		} else {
			this.dynamicScriptLoaderService
				.loadResources(thirdPartyLibs.quill.source)
				.then(() => {
					this.initQuill();
				})
				.catch((error) => console.error('Error loading script', error));
		}
	}
	imageHandler(editor) {
		const imageUrl = prompt('Please enter the image URL:');
		if (imageUrl) {
			const range = editor.getSelection();
			editor.insertEmbed(range.index, 'image', imageUrl);
		}
	}

	showHtml(editor, controlName) {
		const editorContent = editor.root;
		const isHtmlMode = /&lt;|&gt;|&amp;|&quot;|&#39;/.test(editorContent.innerHTML);
		if (isHtmlMode) {
			const htmlContent = editorContent.textContent || '';
			editor.root.innerHTML = htmlContent;
		} else {
			const richTextContent = editor.root.innerHTML;
			editor.root.textContent = richTextContent;
		}

		this.formGroup.get(controlName).setValue(editor.root.innerHTML);
		if (editor.root.innerHTML == '<p><br></p>') {
			this.formGroup.get(controlName).setValue(null);
		}
		this.formGroup.get(controlName).markAsDirty();
		this.saveChange();
	}
	edit(editor, controlName) {
		this.showEditorContent[controlName] = true;
		this.item[controlName] = this.item[controlName] ?? editor?.root?.innerHTML ?? '';
		this.templateBeforeChange[controlName] = this.item[controlName];
	}
	preView(editor, controlName) {
		this.showEditorContent[controlName] = false;
		this.templateBeforeChange[controlName] = this.item[controlName];
		this.item[controlName] = editor?.root?.innerHTML ?? '';
	}
}
