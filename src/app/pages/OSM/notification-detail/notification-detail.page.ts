import { Component, ChangeDetectorRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, OSM_NotificationProvider, OSM_TemplateProvider, WMS_ZoneProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';

declare var Quill: any;

@Component({
	selector: 'app-notification-detail',
	templateUrl: './notification-detail.page.html',
	styleUrls: ['./notification-detail.page.scss'],
	standalone: false,
})
export class NotificationDetailPage extends PageBase {
	templateList: any[] = [];
	priorityList = [];
	statusList = [];
	channelList = [];
	@ViewChildren('quillEditorTitle') quillElementTitle: QueryList<ElementRef>;
	@ViewChildren('quillEditorBody') quillElementBody: QueryList<ElementRef>;
	@ViewChildren('quillEditorSubtitle') quillElementSubtitle: QueryList<ElementRef>;

	editorTitle: any;
	editorBody: any;
	editorSubtitle: any;
	showEditorContent = {
		Title: true,
		SubTitle: true,
		Body: true,
	};

	templateBeforeChange = {
		Title: '',
		SubTitle: '',
		Body: '',
	};

	constructor(
		public pageProvider: OSM_NotificationProvider,
		public templateProvider: OSM_TemplateProvider,
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
			IDTemplate: ['',Validators.required],
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
			Title: [''],
			SubTitle: [''],
			Body: [''],
			ScheduleTime: [''],
			Priority: [''],
			NotificationType: [''],
			Data: [''],
			Link: [''],
			ClickAction: [''],
			Group: [''],
			Channel : ['',Validators.required],
			Form : ['']
		});
	}
	segmentView = 's1';
	segmentChanged(ev: any) {
		this.segmentView = ev.detail.value;
	}

	preLoadData(event?: any): void {
		Promise.all([this.templateProvider.read(),this.env.getType('OSMChannel')]).then((values: any) => {
			this.templateList = values[0].data;
			this.channelList = values[1];
			super.preLoadData(event);
		});
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		super.loadedData(event, ignoredFromGroup);
		if (this.item) {
			this.templateBeforeChange.Title = this.item.Title;
			this.templateBeforeChange.Body = this.item.Body;
			this.templateBeforeChange.SubTitle = this.item.Subtitle;
			this.trackingTemplate = this.item.IDTemplate;
		}
		this.initQuill();
	}
	trackingTemplate;
	changeTemplate(event) {
		let promise = new Promise((resolve, reject) => {});
		if (this.formGroup.controls.Body.value != null && this.formGroup.controls.Body.value != '') {
			promise = this.env.showPrompt('Changing the template will erase all the filled content. Are you sure you want to proceed?', null, 'Change template');
		} else {
			promise = Promise.resolve(true);
		}
		promise
			.then((_) => {
				let template = this.templateList.find((item) => item.Id == event.Id);
				this.formGroup.controls.Title.setValue(template.Subject);
				this.formGroup.controls.Body.setValue(template.Body);
				this.formGroup.controls.SubTitle.setValue(null);
				this.formGroup.controls.Title.markAsDirty();
				this.formGroup.controls.Body.markAsDirty();
				this.formGroup.controls.SubTitle.markAsDirty();
				this.showEditorContent.Title = true;
				this.showEditorContent.Body = true;
				this.showEditorContent.SubTitle = true;
				this.cdr.detectChanges();
				// this.loadQuillEditor();
				this.saveChange();
			})
			.catch((err) => {
				if (this.trackingTemplate) this.formGroup.controls.IDTemplate.setValue(this.trackingTemplate);
				this.trackingTemplate = event.Id;
			});
	}

	saveChange() {
		return super.saveChange2();
	}
	savedChange(savedItem?: any, form?: FormGroup<any>): void {
		super.savedChange(savedItem);
		this.item = savedItem;
		this.loadedData();
	}

	ngAfterViewInit() {
		this.quillElementTitle.changes.subscribe((elements) => {
			if (typeof elements.first !== 'undefined') {
				this.loadQuillEditor();
			}
		});
		this.quillElementBody.changes.subscribe((elements) => {
			if (typeof elements.first !== 'undefined') {
				this.loadQuillEditor();
			}
		});
		this.quillElementSubtitle.changes.subscribe((elements) => {
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
			if (this.showEditorContent.Title) {
				this.editorTitle = new Quill('#quillEditorTitle', {
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
								showhtml: () => this.showHtml(this.editorTitle, 'Title'),
							},
						},
					},
					theme: 'snow',
					placeholder: 'Typing ...',
				});
				const quillEditorTitle = document.querySelector('#quillEditorTitle .ql-editor') as HTMLElement;
				if (quillEditorTitle) {
					quillEditorTitle.style.backgroundColor = '#ffffff';
					quillEditorTitle.style.height = '100%';
					quillEditorTitle.style.width = '100%';
					quillEditorTitle.style.minHeight = 'calc(-400px + 60vh)';
				}
				const quillEditorTitleParent = document.querySelector('#quillEditorTitle') as HTMLElement;
				if (quillEditorTitleParent) {
					quillEditorTitleParent.style.height = '100%';
					quillEditorTitleParent.style.width = '100%';
				}
				this.editorTitle.on('text-change', (delta, oldDelta, source) => {
					if (typeof this.editorTitle.root.innerHTML !== 'undefined' && this.item.Title !== this.editorTitle.root.innerHTML) {
						this.formGroup.controls.Title.setValue(this.editorTitle.root.innerHTML);
						this.formGroup.controls.Title.markAsDirty();
					}
					if (this.editorTitle.root.innerHTML == '<p><br></p>') {
						this.formGroup.controls.Title.setValue(null);
					}
				});
				const toolbarCustomTitle = this.editorTitle.getModule('toolbar');
				const fullscreenButtonTitle = toolbarCustomTitle.container.querySelector('button.ql-fullscreen');
				if (fullscreenButtonTitle) {
					const fullscreenIconTitle = document.createElement('ion-icon');
					fullscreenIconTitle.setAttribute('name', 'resize');
					fullscreenIconTitle.setAttribute('color', 'dark');
					fullscreenButtonTitle.innerHTML = '';
					fullscreenButtonTitle.appendChild(fullscreenIconTitle);
				}
				const showHtmlButtonTitle = toolbarCustomTitle.container.querySelector('button.ql-showhtml');
				if (showHtmlButtonTitle) {
					const showHtmlIconTitle = document.createElement('ion-icon');
					showHtmlIconTitle.setAttribute('name', 'logo-html5');
					showHtmlIconTitle.setAttribute('color', 'dark');
					showHtmlButtonTitle.innerHTML = '';
					showHtmlButtonTitle.appendChild(showHtmlIconTitle);
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
			if (this.showEditorContent.SubTitle) {
				this.editorSubtitle = new Quill('#quillEditorSubtitle', {
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
								showhtml: () => this.showHtml(this.editorSubtitle, 'Subtitle'),
							},
						},
					},
					theme: 'snow',
					placeholder: 'Typing ...',
				});
				//choose image
				//this.editor.getModule("toolbar").addHandler("image", this.imageHandler.bind(this));

				const quillEditorSubtitleContainer = document.querySelector('#quillEditorSubtitle .ql-editor') as HTMLElement;
				if (quillEditorSubtitleContainer) {
					quillEditorSubtitleContainer.style.backgroundColor = '#ffffff';
					quillEditorSubtitleContainer.style.height = '100%';
					quillEditorSubtitleContainer.style.width = '100%';
					quillEditorSubtitleContainer.style.minHeight = 'calc(-400px + 60vh)';
				}
				const quillEditorSubtitleParent = document.querySelector('#quillEditorSubtitle') as HTMLElement;
				if (quillEditorSubtitleParent) {
					quillEditorSubtitleParent.style.height = '100%';
					quillEditorSubtitleParent.style.width = '100%';
				}

				this.editorSubtitle.on('text-change', (delta, oldDelta, source) => {
					if (typeof this.editorSubtitle.root.innerHTML !== 'undefined' && this.item.Body !== this.editorSubtitle.root.innerHTML) {
						this.formGroup.controls.SubTitle.setValue(this.editorSubtitle.root.innerHTML);
						this.formGroup.controls.SubTitle.markAsDirty();
					}
					if (this.editorSubtitle.root.innerHTML == '<p><br></p>') {
						this.formGroup.controls.SubTitle.setValue(null);
					}
				});
				// icon fullscreen
				const toolbarCustomSubtitle = this.editorSubtitle.getModule('toolbar');
				const fullscreenButtonSubtitle = toolbarCustomSubtitle.container.querySelector('button.ql-fullscreen');
				if (fullscreenButtonSubtitle) {
					const fullscreenIconSubtitle = document.createElement('ion-icon');
					fullscreenIconSubtitle.setAttribute('name', 'resize');
					fullscreenIconSubtitle.setAttribute('color', 'dark');
					fullscreenButtonSubtitle.innerHTML = '';
					fullscreenButtonSubtitle.appendChild(fullscreenIconSubtitle);
				}

				// icon show HTML
				const showHtmlButtonSubtitle = toolbarCustomSubtitle.container.querySelector('button.ql-showhtml');
				if (showHtmlButtonSubtitle) {
					const showHtmlIconSubtitle = document.createElement('ion-icon');
					showHtmlIconSubtitle.setAttribute('name', 'logo-html5');
					showHtmlIconSubtitle.setAttribute('color', 'dark');
					showHtmlButtonSubtitle.innerHTML = '';
					showHtmlButtonSubtitle.appendChild(showHtmlIconSubtitle);
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
