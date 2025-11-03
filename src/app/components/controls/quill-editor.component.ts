import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DynamicScriptLoaderService } from 'src/app/services/custom/custom.service';
import { lib } from 'src/app/services/static/global-functions';
import { FormGroup } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';

declare var Quill: any;
@Component({
	selector: 'app-quill-editor',
	templateUrl: './quill-editor.component.html',
	styleUrls: ['quill-editor.component.scss'],
	standalone: false,
})
export class QuillEditorComponent implements OnInit {
	@ViewChildren('quillEditor') quillElement: QueryList<ElementRef>;
	// Quill editor properties
	quillEditor: any;
	@Input() quillEditorId: string;
	@Input() dataSource: any[];
	@Input() form: FormGroup;
	@Input() id: string;
	@Input() placeholder?: string;
	@Output() change = new EventEmitter();

	keyword$ = new Subject<string>();
	editorInstance: any;
	dataSourceGrouped: any = [];
	constructor(
		private modalCtrl: ModalController,
		private dynamicScriptLoaderService: DynamicScriptLoaderService
	) {}
	ngOnInit() {
		this.keyword$
			.pipe(debounceTime(300))
			.subscribe((value: string) => {
				this.renderGroups(value);
			});

		setTimeout(() => {
			this.loadQuillEditor();
		}, 0);
	}
	
	// ionViewDidEnter() {
	// 	setTimeout(() => {
	// 		this.loadQuillEditor();
	// 	}, 0);
	// }
	
	// Quill editor methods
	loadQuillEditor() {
		if (typeof Quill !== 'undefined') {
			// Use setTimeout to ensure DOM is ready
			setTimeout(() => {
				this.initQuill();
			}, 0);
		} else {
			this.dynamicScriptLoaderService
				.loadResources(thirdPartyLibs.quill.source)
				.then(() => {
					// Use setTimeout to ensure DOM is ready
					setTimeout(() => {
						this.initQuill();
					}, 0);
				})
				.catch((error) => console.error('Error loading script', error));
		}
	}

	imageHandler() {
		const imageUrl = prompt('Please enter the image URL:');
		if (imageUrl) {
			const range = this.quillEditor.getSelection();
			this.quillEditor.insertEmbed(range.index, 'image', imageUrl);
		}
	}

	showHtml() {
		const editorContent = this.quillEditor.root;
		const isHtmlMode = /&lt;|&gt;|&amp;|&quot;|&#39;/.test(editorContent.innerHTML);
		if (isHtmlMode) {
			const htmlContent = editorContent.textContent || '';
			this.quillEditor.root.innerHTML = htmlContent;
		} else {
			const richTextContent = this.quillEditor.root.innerHTML;
			this.quillEditor.root.textContent = richTextContent;
		}

		this.form.get(this.id)?.setValue(this.quillEditor.root.innerHTML);
		if (this.quillEditor.root.innerHTML == '<p><br></p>') {
			this.form.get(this.id)?.setValue(null);
		}
		this.form.get(this.id)?.markAsDirty();
		this.change.emit(this.quillEditor.root.innerHTML);
	}


	initQuill() {
		if (typeof Quill !== 'undefined') {
			// Ensure we have a valid editor ID
			if (!this.quillEditorId) {
				this.quillEditorId = 'quillEditor' + lib.generateUID();
			}

			// Wait for the DOM element to be available
			const editorElement = document.getElementById(this.quillEditorId);
			if (!editorElement) {
				console.error('Quill editor container not found:', this.quillEditorId);
				return;
			}

			const existingToolbar = document.querySelector('.ql-toolbar');
			if (existingToolbar) {
				existingToolbar.parentNode.removeChild(existingToolbar);
			}
			this.quillEditor = new Quill('#' + this.quillEditorId, {
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
							showhtml: () => this.showHtml(),
							insert: () => this.insertTextHandler(),
						},
					},
				},
				theme: 'snow',
				placeholder: this.placeholder || 'Typing ...',
			});

			// Set initial value
			if (this.form.get(this.id)?.value) {
				this.quillEditor.root.innerHTML = this.form.get(this.id).value;
			}

			this.quillEditor.on('text-change', (delta, oldDelta, source) => {
				if (typeof this.quillEditor.root.innerHTML !== 'undefined' && this.form.get(this.id)?.value !== this.quillEditor.root.innerHTML) {
					this.form.get(this.id)?.setValue(this.quillEditor.root.innerHTML);
					this.form.get(this.id)?.markAsDirty();
					this.change.emit(this.quillEditor.root.innerHTML);
				}
				if (this.quillEditor.root.innerHTML == '<p><br></p>') {
					this.form.get(this.id)?.setValue(null);
				}
			});

			// icon fullscreen
			const toolbarCustom = this.quillEditor.getModule('toolbar');
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
			if (toolbar) {
				toolbar.addEventListener('mousedown', (event) => {
					event.preventDefault();
				});
			}

			if (this.dataSource?.length) this.renderGroups();
		}
	}

	async renderGroups(keyword = '', codeList = null) {
		let dataSource = this.dataSource.filter(
			(d) => d.Code?.toLowerCase().includes(keyword.trim().toLocaleLowerCase()) || d.Name?.toLowerCase().includes(keyword.trim().toLocaleLowerCase()) || keyword == ''
		);
		if (codeList) dataSource = dataSource.filter((d) => codeList.includes(d.Group));
		let dataSourceFlat = [];

		let groups = [...new Set(dataSource.map((d) => d.Group))];
		groups.forEach((g: any) => {
			let subGroups = [...new Set(dataSource.filter((d) => d.Group == g && d.SubGroup).map((d) => d.SubGroup))];
			g = {
				Code: g,
				Name: g,
				disabled: true,
				Id: lib.generateUID(),
				IDParent: null,
			};
			dataSourceFlat.push(g);
			subGroups.forEach((sg: any) => {
				sg = {
					Code: sg,
					Name: sg,
					disabled: true,
					Id: lib.generateUID(),
					IDParent: g.Id,
				};
				let children = dataSource.filter((d) => d.Group == g.Code && d.SubGroup == sg.Code);
				dataSourceFlat.push(sg);
				children.forEach((c) => {
					c.IDParent = sg.Id;
					dataSourceFlat.push(c);
				});
			});
		});
		lib.buildFlatTree(dataSourceFlat, [], false).then((resp: any) => {
			this.dataSourceGrouped = resp;
			// this.isAllRowOpened = false;
			this.toggleRowAll(this.dataSourceGrouped);
		});
	}
	isAllRowOpened = true;
	toggleRowAll(ls = []) {
		this.isAllRowOpened = !this.isAllRowOpened;
		ls.forEach((i) => {
			i.showdetail = !this.isAllRowOpened;
			this.toggleRow(i, true);
		});
	}

	toggleRow(ite, toogle = false) {
		if (ite && ite.showdetail && toogle) {
			//hide
			ite.showdetail = false;
			this.showHideAllNestedFolder(ite.Id, false, ite.showdetail);
		} else if (ite && !ite.showdetail && toogle) {
			//show loaded
			ite.showdetail = true;
			this.showHideAllNestedFolder(ite.Id, true, ite.showdetail);
		}
	}

	showHideAllNestedFolder(Id, isShow, showDetail) {
		if (Id == null) return;
		this.dataSourceGrouped
			.filter((d) => d.IDParent == Id)
			.forEach((i) => {
				if (!isShow || showDetail) {
					i.show = isShow;
				}
				this.showHideAllNestedFolder(i.Id, isShow, i.showdetail);
			});
	}

	isSubActive = false;
	onKeyDown(event: KeyboardEvent) {
		this.isAllRowOpened = false;
		this.keyword$.next((event.target as HTMLInputElement).value);
	}

	insertTextHandler(item?: any) {
		let textToInsert = '['+item?.Code+']';
		if (!textToInsert || !this.quillEditor) return;

		const range = this.quillEditor.getSelection(true);
		const insertIndex = range ? range.index : this.quillEditor.getLength();

		this.quillEditor.insertText(insertIndex, textToInsert, {
			user: true,
		});

		this.quillEditor.setSelection(insertIndex + textToInsert.length, 0);
	}
}
