import { Component, ChangeDetectorRef, Input, Output, EventEmitter, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { BRA_BranchProvider, WEB_ContentProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/core/common.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom.service';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';

declare var Quill: any;

@Component({
	selector: 'app-help-detail',
	templateUrl: './help-detail.page.html',
	styleUrls: ['./help-detail.page.scss'],
	standalone: false,
})
export class HelpDetailComponent extends PageBase {
	_helpCode;
	_helpName;
	@Input() pageConfig;
	@Input() set helpCode(value: string) {
		this._helpCode = value;
		if (this.formLoaded) {
			this.refresh();
		}
	}

	formLoaded = false;
	isShowAdd = false;
	isShowEdit = false;
	showEditorContent = false;
	contentBefore = '';
	subscription;
	isChangeLanguage = false;
	isFullScreen = false;

	@ViewChildren('quillEditor') quillElement: QueryList<ElementRef>;

	constructor(
		public pageProvider: WEB_ContentProvider,
		public branchProvider: BRA_BranchProvider,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService,
		public dynamicScriptLoaderService: DynamicScriptLoaderService
	) {
		super();
		this.pageConfig.showSpinner = false;
		this.pageConfig.pageCode = 'help';
		this.subscription = this.env.getEvents().subscribe((data) => {
			if (data.Code == 'app:changeLanguage') {
				this.isChangeLanguage = true;
				this.loadData();
			}
		});
		this.buildFormGroup();
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	@Output() closeHelp = new EventEmitter();

	buildFormGroup() {
		this.formGroup = this.formBuilder.group({
			IDBranch: new FormControl({ value: null, disabled: false }),
			IDCategory: [''],
			IDParent: [''],
			Id: new FormControl({ value: 0, disabled: true }),
			Code: new FormControl({ value: '', disabled: true }),
			Name: ['', Validators.required],
			Remark: [''],
			Sort: [''],
			IsDisabled: new FormControl({ value: '', disabled: true }),
			IsDeleted: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			Type: ['Help'],
			ThumbnailImage: [''],
			Image: [''],
			AlternateImage: [''],
			PublishDate: [''],
			ViewCount: [''],
			Reviews: [''],
			AllowComment: [''],
			LikeCount: [''],
			Language: [this.env.language.current],
			Summary: [''],
			Content: ['', Validators.required],
			AlterName: [''],
			ReadMoreText: [''],
			SEO1: [''],
			SEO2: [''],
			Approved: [''],
			URL: [''],
			Pin: [''],
			PinPos: [''],
			Home: [''],
			HomePos: [''],
		});
	}
	ngAfterViewInit() {
		this.quillElement.changes.subscribe((elements) => {
			if (typeof elements.first !== 'undefined') {
				this.loadQuillEditor();
			}
		});
	}

	loadQuillEditor() {
		if (typeof Quill !== 'undefined') this.initQuill();
		else {
			this.dynamicScriptLoaderService
				.loadResources(thirdPartyLibs.quill.source)
				.then(() => {
					this.initQuill();
				})
				.catch((error) => console.error('Error loading script', error));
		}
	}

	editor;
	initQuill() {
		if (this.showEditorContent && this.segmentView == 's1') {
			const existingToolbar = document.querySelector('.ql-toolbar');
			if (existingToolbar) {
				existingToolbar.parentNode.removeChild(existingToolbar);
			}
			this.editor = new Quill('#editor', {
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
							fullscreen: () => this.toggleFullscreen(),
							showhtml: () => this.showHtml(),
						},
					},
				},
				theme: 'snow',
				placeholder: 'Typing ...',
			});
			//choose image
			//this.editor.getModule("toolbar").addHandler("image", this.imageHandler.bind(this));

			this.editor.on('text-change', (delta, oldDelta, source) => {
				if (typeof this.editor.root.innerHTML !== 'undefined' && this.item.Content !== this.editor.root.innerHTML) {
					this.formGroup.controls.Content.setValue(this.editor.root.innerHTML);
					this.formGroup.controls.Content.markAsDirty();
				}
				if (this.editor.root.innerHTML == '<p><br></p>') {
					this.formGroup.controls.Content.setValue(null);
				}
			});

			const editorContainer = document.querySelector('#editor .ql-editor') as HTMLElement;
			if (editorContainer) {
				editorContainer.style.backgroundColor = '#ffffff';
				editorContainer.style.height = '100%';
				editorContainer.style.width = '100%';
				editorContainer.style.minHeight = 'calc(-400px + 100vh)';
			}
			const editorParent = document.querySelector('#editor') as HTMLElement;
			if (editorParent) {
				editorParent.style.height = '100%';
				editorParent.style.width = '100%';
			}

			// icon fullscreen
			const toolbarCustom = this.editor.getModule('toolbar');
			const fullscreenButton = toolbarCustom.container.querySelector('button.ql-fullscreen');
			if (fullscreenButton) {
				const fullscreenIcon = document.createElement('ion-icon');
				fullscreenIcon.setAttribute('name', 'resize');
				fullscreenIcon.setAttribute('color', 'dark');
				fullscreenButton.innerHTML = '';
				fullscreenButton.appendChild(fullscreenIcon);
			}

			// icon show HTML
			const showHtmlButton = toolbarCustom.container.querySelector('button.ql-showhtml');
			if (showHtmlButton) {
				const showHtmlIcon = document.createElement('ion-icon');
				showHtmlIcon.setAttribute('name', 'logo-html5');
				showHtmlIcon.setAttribute('color', 'dark');
				showHtmlButton.innerHTML = '';
				showHtmlButton.appendChild(showHtmlIcon);
			}
			const toolbar = document.querySelector('.ql-toolbar');
			toolbar.addEventListener('mousedown', (event) => {
				event.preventDefault();
			});
		}
	}

	imageHandler() {
		const imageUrl = prompt('Please enter the image URL:');
		if (imageUrl) {
			const range = this.editor.getSelection();
			this.editor.insertEmbed(range.index, 'image', imageUrl);
		}
	}
	// imageHandler() {
	//   const input = document.createElement('input');
	//   input.setAttribute('type', 'file');
	//   input.setAttribute('accept', 'image/*');
	//   input.click();
	//   input.onchange = async function() {
	//     const file = input.files[0];
	//     const formData = new FormData();
	//     formData.append('image', file);
	//     //const upload = await uploadFile(formData);

	//     const range = this.quill.getSelection();
	//     let link = `https://i.pinimg.com/474x/d3/a5/6e/d3a56e4bf36c6426ed82b68a2221127c.jpg`;

	//     this.quill.insertEmbed(range.index, 'image', link);
	//   }.bind(this);
	// }

	toggleFullscreen() {
		this.isFullScreen = !this.isFullScreen;
		const screenElement = document.getElementById('screenEditor');
		const editorElement = document.getElementById('editor');
		if (this.isFullScreen) {
			screenElement.classList.add('quill-fullscreen');
			editorElement.style.minHeight = 'calc(100vh - 125px)';
		} else {
			screenElement.classList.remove('quill-fullscreen');
			editorElement.style.minHeight = 'calc(100vh - 400px)';
		}
	}

	showHtml() {
		const editorContent = this.editor.root;
		const isHtmlMode = /&lt;|&gt;|&amp;|&quot;|&#39;/.test(editorContent.innerHTML);
		if (isHtmlMode) {
			const htmlContent = editorContent.textContent || '';
			this.editor.root.innerHTML = htmlContent;
		} else {
			const richTextContent = this.editor.root.innerHTML;
			this.editor.root.textContent = richTextContent;
		}

		this.formGroup.controls.Content.setValue(this.editor.root.innerHTML);
		if (this.editor.root.innerHTML == '<p><br></p>') {
			this.formGroup.controls.Content.setValue(null);
		}
		this.formGroup.controls.Content.markAsDirty();
		this.saveChange();
	}

	preLoadData(event?: any): void {
		// set _helpName
		const regex = /help\/(.+)/;
		const match = this._helpCode.match(regex);
		if (match) {
			this._helpName = match[1];
		}

		if ((this._helpCode.match(/\//g) || []).length == 2) {
			//case isDetailPage
			const parts = this._helpCode.split('/');
			parts.splice(2, 1);
			this._helpCode = parts.join('/');
		}
		if ((this._helpCode.match(/\//g) || []).length == 1) {
			//case _helpCode have 1 /
			const parts = this._helpCode.split('/');
			this._helpCode = `${parts[0]}/${parts[1]}`;
		} else {
			//case _helpCode have 2 /
			this._helpCode = this._helpCode.replace(/(\/)[^\/]+(\/)/, `$1${this.env.language.current}$2`);
		}
		super.preLoadData(event);
		// this.loadData();
	}

	loadData() {
		// this.query.Code = this._helpCode;
		let query = { url: this._helpCode, language: this.env.language.current };
		this.pageProvider.commonService
			.connect('GET', 'WEB/Content/GetAnItemByURL', query)
			.toPromise()
			.then((result) => {
				this.item = result;
				this.loadedData();
			});

		this.formLoaded = true;
	}

	loadedData(event = null, ignoredFromGroup = false) {
		this.pageConfig.showSpinner = false;
		event?.target?.complete();
		if (this.item) {
			if (this.item.hasOwnProperty('IsDeleted') && this.item.IsDeleted) this.nav('not-found', 'back');
			this.formGroup?.patchValue(this.item);
			this.formGroup?.markAsPristine();

			if (this.item.IsDisabled) this.pageConfig.canEdit = false;
			this.id = this.item.Id;
			this.contentBefore = this.item.Content;
			this.isShowAdd = false;
			this.isShowEdit = true;
			this.cdr?.detectChanges();
		} else {
			if (this.isChangeLanguage) {
				this.isChangeLanguage = false;
				this.item = {
					Id: 0,
					Name: this._helpName,
					Content: '',
				};
			}
			this.contentBefore = '';
			this.id = 0;
			this.isShowAdd = true;
			this.isShowEdit = false;
		}

		if ((!this.item || this.id == 0) && this.pageConfig.canAdd) {
			this.pageConfig.canEdit = this.pageConfig.canAdd;
		}

		if (!(this.pageConfig.canEdit || (this.pageConfig.canAdd && this.item.Id == 0) || ignoredFromGroup)) {
			this.formGroup?.disable();
		}

		if (!this.item?.Id) {
			this.formGroup.controls.Name.setValue(this._helpName);
			this.formGroup.controls.Name.markAsDirty();
			this.formGroup.controls.Code.setValue(this._helpCode);
			this.formGroup.controls.Code.markAsDirty();
			this.formGroup.controls.URL.setValue(this._helpCode);
			this.formGroup.controls.URL.markAsDirty();
		}

		this.initQuill();
	}

	edit() {
		this.showEditorContent = true;
		this.item.Content = this.item.Content ?? this.editor?.root?.innerHTML ?? '';
		this.contentBefore = this.item.Content;
	}

	preView() {
		this.showEditorContent = false;
		this.item.Content = this.editor?.root?.innerHTML;
		this.contentBefore = this.item.Content;
	}

	emit(eventName) {
		this[eventName].emit();
	}

	segmentView = 's1';
	segmentChanged(ev: any) {
		this.segmentView = ev.detail.value;
		if (this.editor.root.innerHTML != this.contentBefore) {
			this.contentBefore = this.editor.root.innerHTML;
		}
	}

	add() {
		this.buildFormGroup();
		this.id = 0;
		this.item = {
			Id: 0,
			Name: this._helpName,
			Content: '',
		};
		this.formGroup.controls.Code.setValue(this._helpCode);
		this.formGroup.controls.Code.markAsDirty();
		this.formGroup.controls.Name.setValue(this._helpName);
		this.formGroup.controls.Name.markAsDirty();
		this.formGroup.controls.URL.setValue(this._helpCode);
		this.formGroup.controls.URL.markAsDirty();
		this.showEditorContent = true;
	}

	delete(publishEventCode?: any): void {
		this.selectedItems = [this.item];
		super.delete();
	}

	async saveChange() {
		this.formGroup.controls.Type.markAsDirty();
		this.formGroup.controls.Language.markAsDirty();
		super.saveChange2();
	}

	savedChange(savedItem = null, form = this.formGroup) {
		super.savedChange(savedItem);
		this.item = savedItem;
		if (this.pageConfig.isDetailPage) {
			if (this.item.Id) {
				this.isShowAdd = false;
				this.isShowEdit = true;
			} else {
				this.isShowAdd = true;
				this.isShowEdit = false;
			}
		} else {
			this.item.Id = savedItem.Id;
		}
		// this.showEditorContent = false;
		this.loadedData();
	}

	deleted() {
		if (!this.pageConfig.isDetailPage) {
			this.item = null;
			this.id = 0;
			this.showEditorContent = false;
			this.formGroup.reset();
		}
	}

	async closeModal() {
		if (this.pageConfig.isDetailPage) {
			super.closeModal();
		} else {
			try {
				if (!this.modalController) {
					return;
				}
				await this.modalController.dismiss();
			} catch (error) {
				return;
			}
		}
	}
}
