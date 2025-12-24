import { Component, ContentChild, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { InputControlField } from './controls.interface';
import { environment } from 'src/environments/environment';
import { lib } from 'src/app/services/static/global-functions';
import { GlobalData } from 'src/app/services/static/global-variable';
import { MonacoEditorLoaderService, DynamicScriptLoaderService } from 'src/app/services/custom/custom.service';
import { FormulaExpandModalComponent } from './formula-expand-modal';
import { Subject } from 'rxjs';
import { InputControlTempateDirective } from './input-control-template.directive';

@Component({
	selector: 'app-input-control',
	templateUrl: './input-control.component.html',
	standalone: false,
})
export class InputControlComponent implements OnInit {
	lib;
	searchTerm = '';
	chartScriptId: string;
	isFromBarcodeScan$ = new Subject<any>();
	barcodeBuffer = '';
	barcodeTimer = null;
	@Input() set field(f: InputControlField) {
		if (f.form) this.form = f.form;
		if (f.type) this.type = f.type;
		if (f.id) this.id = f.id;
		if (f.secondaryId) this.secondaryId = f.secondaryId;
		if (f.label) this.label = f.label;
		if (f.placeholder) this.placeholder = f.placeholder;
		if (f.dataSource) this.dataSource = f.dataSource;
		if (f.bindValue) this.bindValue = f.bindValue;
		if (f.bindLabel) this.bindLabel = f.bindLabel;
		if (f.multiple) this.multiple = f.multiple;
		if (f.clearable) this.clearable = f.clearable;
		if (f.noCheckDirty) this.noCheckDirty = f.noCheckDirty;
		if (f.color) this.color = f.color;
		if (f.appendTo !== undefined) this.appendTo = f.appendTo;
		if (f.virtualScroll !== undefined) this.virtualScroll = f.virtualScroll;
		if (f.branchConfig) {
			if (f.branchConfig.selectedBranch !== undefined) this.selectedBranch = f.branchConfig.selectedBranch;
			if (f.branchConfig.showingType) this.showingType = f.branchConfig.showingType;
			if (f.branchConfig.showingDisable != undefined) this.showingDisable = f.branchConfig.showingDisable;
			if (f.branchConfig.showingMode) this.showingMode = f.branchConfig.showingMode;
		}
		if (this.type == 'ng-select-branch') this.configBranch();
		if (f.treeConfig) {
			if (f.treeConfig.isTree != undefined) this.isTree = f.treeConfig.isTree;
			if (f.treeConfig.searchFnDefault) this.searchFn = this.searchShowAllChildren;
			if (f.treeConfig.searchFn) this.searchFn = f.treeConfig.searchFn;
			if (f.treeConfig.isCollapsed != undefined) this.isCollapsed = f.treeConfig.isCollapsed;
			if (f.treeConfig.rootCollapsed != undefined) this.rootCollapsed = f.treeConfig.rootCollapsed;
		}
		if (this.isTree) {
			if (this.isCollapsed == undefined) this.isCollapsed = false;

			//showing current value in tree
			let parents = [];
			if (this.form.get(this.id).value) {
				let id = this.form.get(this.id)?.value;
				let item = this.dataSource.find((d) => d[this.bindValue] == id);
				if (item?.Id) parents = this.getParent(item.Id, []);
			}
			// collapsed|unCollapsed the rest of dataSorce
			this.dataSource.forEach((i) => {
				i.hasChildInSearchBox = this.hasEligibleChild(i.Id);
				if (parents?.includes(i)) {
					i.showdetail = false;
				} else i.showdetail = this.isCollapsed;
				this.toggleRow(i);
			});
			//show|unShow root level
			if (this.rootCollapsed == false) this.expandRoot();
		}
		if (this.type == 'formula') {
			this.chartScriptId = 'chartScriptEditor' + lib.generateUID();
			this.monacoProvider.load().then(() => this.initMonaco());
		}
		if (this.type == 'editor') {
			if (!this.quillEditorId) {
				this.quillEditorId = 'quillEditor' + lib.generateUID();
			}
		}
	}

	@Input() form: FormGroup;

	@Input() type: string = 'text';
	@Input() appendTo: string = '#ng-select-holder';

	@Input() virtualScroll: boolean = false;

	@Input() id: string;
	@Input() secondaryId: string;

	@Input() label: string;

	@Input() color: string = 'dark';

	@Input() placeholder?: string;

	@Input() dataSource?: any[] | any;

	@Input() bindValue?: string = 'Code';

	@Input() bindLabel?: string = 'Name';

	@Input() multiple: boolean = false;

	@Input() clearable: boolean = false;

	@Input() noCheckDirty: boolean = false;

	@Input() inputControlTemplate: any;

	//treeConfig
	@Input() searchFn?: any;
	@Input() searchFnDefault?: boolean = false;
	@Input() isTree: boolean = false;
	@Input() isCollapsed?: boolean = false;
	@Input() rootCollapsed?: boolean = false; // when isCollapsed,unCollapsed up to showingRootLevel
	//branchConfig
	@Input() branchConfig?;
	@Input() selectedBranch?: number;
	@Input() showingType?: string;
	@Input() showingDisable?: boolean;
	@Input() showingMode?: string; //'showAll'  | 'showSelectedAndChildren' | default

	@ViewChildren('quillEditor') quillElement: QueryList<ElementRef>;

	// reference to the internal ng-select instance when used
	@ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;

	imgPath = environment.staffAvatarsServer;

	// Quill editor properties
	quillEditor: any;
	quillEditorId: string;

	@Input('inputControlTemplate') _inputControlTemplateInput: TemplateRef<any>;

	@ContentChild(InputControlTempateDirective, {
		read: TemplateRef,
		static: true,
	})
	_inputControlTemplateQuery: TemplateRef<any>;

	get _inputControlTemplate(): TemplateRef<any> {
		return this._inputControlTemplateInput || this._inputControlTemplateQuery;
	}
	constructor(
		public monacoProvider: MonacoEditorLoaderService,
		public modalController: ModalController,
		public dynamicScriptLoaderService: DynamicScriptLoaderService
	) {
		this.lib = lib;
		this.searchShowAllChildren = this.searchShowAllChildren.bind(this);
	}

	ngOnInit() {
		if (this.searchFnDefault && !this.searchFn) this.searchFn = this.searchShowAllChildren;

		// Initialize Quill editor ID if type is quill
		if (this.type === 'quill' && !this.quillEditorId) {
			this.quillEditorId = 'quillEditor' + lib.generateUID();
		}
	}
	ngOnDestroy() {
		this.dismissDatePicker();
	}

	disposableCompletionItemProvider: any = null;
	monaco;
	editorInstance: any;
	initMonaco() {
		// if(this.monaco) return;
		this.monaco = (window as any).monaco;

		// Load Google Font: JetBrains Mono
		const fontLink = document.createElement('link');
		fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap';
		fontLink.rel = 'stylesheet';
		document.head.appendChild(fontLink);

		let dataSourceBeforeSet = this.dataSource?.length > 0 ? [...this.dataSource] : [];
		let dataSource = new Set(dataSourceBeforeSet);
		if (this.monacoProvider.disposableCompletionItemProvider) {
			this.monacoProvider.disposableCompletionItemProvider.dispose();
		}

		this.monacoProvider.disposableCompletionItemProvider = this.monaco.languages.registerCompletionItemProvider('sql', {
			triggerCharacters: ['/'],
			provideCompletionItems: (model, position) => {
				const textUntilPosition = model.getValueInRange({
					startLineNumber: position.lineNumber,
					startColumn: 1,
					endLineNumber: position.lineNumber,
					endColumn: position.column,
				});
				const match = textUntilPosition.match(/\/(\w*)$/);
				if (!match) return { suggestions: [] };

				const keyword = match[1].toLowerCase();
				const suggestions = Array.from(dataSource)
					.filter((item) => item.Code.toLowerCase().includes(keyword) || item.Name.toLowerCase().includes(keyword))
					.map((item) => {
						const startPosition = {
							lineNumber: position.lineNumber,
							column: position.column - match[0].length, // match[0] includes the slash
						};
						const endPosition = position;

						return {
							label: `/[${item.Code}] - ${item.Name}`,
							kind: this.monaco.languages.CompletionItemKind.Snippet,
							insertText: `[${item.Code}]`,
							detail: item.Name,
							documentation: `Chèn mã: ${item.Code}`,
							range: {
								startLineNumber: startPosition.lineNumber,
								startColumn: startPosition.column,
								endLineNumber: endPosition.lineNumber,
								endColumn: endPosition.column,
							},
						};
					});
				return { suggestions };
			},
		});
		// 🎨 Tạo editor với theme sáng và font "JetBrains Mono"
		const container = document.getElementById(this.chartScriptId);
		if (container) {
			this.editorInstance = this.monaco.editor.create(container, {
				value: this.form.get(this.id).value,
				language: 'sql',
				theme: 'vs', // theme sáng (vs-dark là tối)
				lineNumbersMinChars: 1,
				fontFamily: 'JetBrains Mono, monospace',
				fontSize: 14,
				automaticLayout: true,
				minimap: { enabled: false },
				wordWrap: 'on', // ✅ tự động xuống dòng
				// wrappingIndent: 'indent', // ✅ canh lề đẹp khi xuống dòng
				scrollBeyondLastLine: false, // ✅ tránh dư khoảng trắng dưới
			});
			let latestContent = '';

			this.editorInstance.onDidChangeModelContent(() => {
				// chỉ lưu tạm nội dung
				latestContent = this.editorInstance.getValue();
				this.form.get(this.id)?.setValue(latestContent);
				this.form.get(this.id)?.markAsDirty();
			});

			// // Khi người dùng rời editor thì mới emit
			// editor.onDidBlurEditorWidget(() => {
			//   this.change.emit(latestContent);
			// });
		}
	}
	async openFormulaModal() {
		const modal = await this.modalController.create({
			component: FormulaExpandModalComponent,
			cssClass: 'modal90',
			componentProps: {
				dataSource: this.dataSource,
				value: this.form.get(this.id).value,
				item: this.form,
			},
		});
		await modal.present();

		const { data } = await modal.onWillDismiss();
		if (data) {
			this.form.get(this.id)?.setValue(data);
			this.form.get(this.id)?.markAsDirty();
			this.change.emit(data);
			if (this.editorInstance) {
				this.editorInstance.setValue(data);
			}
		}
	}
	saveContent() {
		const value = this.editorInstance.getValue();

		this.form.get(this.id)?.setValue(value);
		this.form.get(this.id)?.markAsDirty();
		this.change.emit(value);
	}

	@Output() change = new EventEmitter();
	@Output() inputChange = new EventEmitter();
	@Output() select = new EventEmitter();
	@Output() selectKeyDown = new EventEmitter();
	onSelect(event) {
		this.select.emit(event);
	}
	onInputChange(event) {
		this.inputChange.emit(event);
		if (
			'|ng-select|ng-select-async|ng-select-branch|ng-select-item|ng-select-staff|ng-select-schema|ng-select-status|ng-select-bp|color|icon|icon-color|time-frame|'.includes(
				this.type
			)
		) {
			this.change.emit(event);
		}
	}

	ngSelectKeyDown(e) {
		clearTimeout(this.barcodeTimer);
		if (e.key.length === 1) this.barcodeBuffer += e.key;
		this.barcodeTimer = setTimeout(() => {
			if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				this.selectKeyDown.emit({ term: this.barcodeBuffer, isEnter: true });
				this.barcodeBuffer = '';
			}
		}, 50);
	}
	/**
	 * Close the internal ng-select dropdown (if present) and emit change/touch on the control.
	 * Used when the value was auto-selected programmatically to finish the UI interaction.
	 */
	closeDropdown(emitValue: boolean = true) {
		try {
			this.ngSelect?.close();
		} catch (err) {
			// ignore if no ng-select instance
		}
	}

	onKeydown(event) {
		if (event.key === 'Enter') {
			this.inputChange.emit(event);
		}
	}

	@Output() nav = new EventEmitter();
	onNav(to) {
		this.nav.emit(to);
	}

	isOpenPicker = false;
	@ViewChild('popover') popover;
	presentPicker(event) {
		this.popover.event = event;
		this.isOpenPicker = true;
	}

	presentPopupPicker() {
		this.isOpenPicker = true;
	}

	onSelectIcon(icon, control) {
		control.setValue(icon.Name);
		control.markAsDirty();
		this.isOpenPicker = false;
		this.onInputChange(control);
	}

	onSelectColor(color, control) {
		control.setValue(color.Code);
		control.markAsDirty();
		this.onInputChange(control);

		if (this.type == 'color') {
			this.isOpenPicker = false;
		}
	}

	isOpenDatePicker = false;
	pickerControl: any;
	pickerGroupName: string;
	_timePeriodList = [];

	commonOptions = GlobalData.commonOptions;

	segmentTimeframeChanged(e) {
		this.pickerControl.controls.Type.value = e.detail.value;
	}
	calcAbsoluteDate(control, isFullfillDate = false) {
		if (control.controls.Type.value == 'Relative') {
			let tempDate = this.lib.calcTimeValue(control.getRawValue(), isFullfillDate);
			if (tempDate) {
				control.controls.Value.value = lib.dateFormat(tempDate, 'yyyy-mm-ddThh:MM:ss');
			}
		}
	}

	presentDatePicker(event, control, groupName) {
		this.pickerGroupName = groupName;
		this.pickerControl = control;
		this.popover.event = event;
		this.calcAbsoluteDate(this.pickerControl, groupName == 'TimeFrame-To');
		if (this._timePeriodList.length == 0) {
			this._timePeriodList = lib.cloneObject(this.commonOptions.timeConfigPeriod);
			this._timePeriodList.forEach((p) => {
				p.name = p.name.toLowerCase() + ' ago';
			});
		}
		this.isOpenDatePicker = true;
	}

	dismissDatePicker(apply: boolean = false) {
		if (!this.isOpenDatePicker) return;

		if (!apply) {
		} else {
			this.onInputChange(this.pickerControl);
		}
		this.isOpenDatePicker = false;
	}

	pickDate(pDate, isQuickPick = false) {
		if (pDate.Type == 'Absolute') this.pickerControl.get('Amount').setValue(0);
		if (isQuickPick) {
			this.setDate(pDate.from, this.pickerControl, false);
			this.setDate(pDate.to, this.form.controls[this.secondaryId], true);
		} else {
			this.setDate(pDate, this.pickerControl, this.pickerGroupName == 'TimeFrame-To');

			if (this.pickerGroupName == 'TimeFrame-Range') {
				this.setDate(pDate, this.form.controls[this.secondaryId], true);
			}
		}
	}

	setDate(pDate, control, isFullfillDate = false) {
		if (control.controls.IsNull?.value) {
			control.controls.IsNull.setValue(false);
			control.controls.IsNull.markAsDirty();
		}
		if (control.controls.Type.value != pDate.Type) {
			control.controls.Type.setValue(pDate.Type);
			control.controls.Type.markAsDirty();
		}

		if (pDate.Type == 'Relative') {
			if (control.controls.IsPastDate.value != pDate.IsPastDate) {
				control.controls.IsPastDate.setValue(pDate.IsPastDate);
				control.controls.IsPastDate.markAsDirty();
			}
			if (control.controls.Period.value != pDate.Period) {
				control.controls.Period.setValue(pDate.Period);
				control.controls.Period.markAsDirty();
			}
			if (control.controls.Amount.value != pDate.Amount) {
				control.controls.Amount.setValue(pDate.Amount);
				control.controls.Amount.markAsDirty();
			}
			this.calcAbsoluteDate(control, isFullfillDate);
		} else {
			if (control.controls.Value.value != pDate.Value.detail.value) {
				control.controls.Value.setValue(pDate.Value.detail.value + '.000');
				let tempDate = this.lib.calcTimeValue(control.getRawValue(), isFullfillDate);
				control.controls.Value.setValue(lib.dateFormat(tempDate, 'yyyy-mm-ddThh:MM:ss'));
				control.controls.Value.markAsDirty();
			}
		}
	}

	onSearch(data) {
		// back to collapsed state
		this.searchTerm = data.term;
		if (this.searchFn == this.searchShowAllChildren) {
			if (!data.term) {
				this.dataSource
					.filter((d) => d.showStateBeforeSearch != undefined)
					.forEach((p) => {
						p.showdetail = !p.showStateBeforeSearch;
						p.showStateBeforeSearch = undefined;
						this.toggleRow(p);
					});
			}
		}
	}

	searchResultIdList = { term: '', ids: [] };
	searchShowAllChildren(term: string, item: any): any {
		let parents = [];
		if (this.searchResultIdList.term != term) {
			this.searchResultIdList.term = term;
			this.searchResultIdList.ids = lib.searchTreeReturnId(this.dataSource, term);
		}
		if (item?.Id) parents = this.getParent(item.Id, []);
		if (parents.length > 0) {
			parents.forEach((p) => {
				if (p.showStateBeforeSearch == undefined) {
					p.showStateBeforeSearch = p.showdetail;
				}
				p.showdetail = false;
				this.toggleRow(p);
			});
		}

		return this.searchResultIdList.ids.indexOf(item.Id) > -1;
	}
	// #region private
	private configBranch() {
		if (!this.dataSource || this.dataSource?.length == 0) return;
		let parentList;
		// this.dataSource = lib.cloneObject(this.dataSource);
		let it = this.dataSource.find((d) => d.Id == this.selectedBranch);
		if (it) {
			if (!this.showingMode) this.showingMode = '';
			switch (this.showingMode) {
				case 'showAll':
					break;
				case 'showSelectedAndChildren':
					this.dataSource = [it, ...this.getAllNestedChildren(this.selectedBranch)];
					break;
				default:
					parentList = this.getParent(it?.IDParent);
					let selectedBranchAndChildren = this.getAllNestedChildren(this.selectedBranch);
					this.dataSource = [...parentList, it, ...selectedBranchAndChildren];
					break;
			}
		}
		//show type , input : 'Warehouse' || '[Warehouse,TitlePosition]' || 'ne_Warehouse' || 'ne_[Warehouse,TitlePosition]'
		if (this.showingType) {
			let showingTypeDraft = this.showingType;
			if (showingTypeDraft.startsWith('ne_')) {
				showingTypeDraft = showingTypeDraft.substring(showingTypeDraft.indexOf('ne_') + 3);
				if (showingTypeDraft.startsWith('[') && showingTypeDraft.endsWith(']')) {
					let listTypeNE = showingTypeDraft.replace(/[\[\]]/g, '').split(',');
					this.dataSource.forEach((d) => {
						if (listTypeNE.includes(d.Type)) d.disabled = true;
					});
				} else
					this.dataSource.forEach((d) => {
						if (d.Type == showingTypeDraft) d.disabled = true;
					});
			} else {
				if (showingTypeDraft.startsWith('[') && showingTypeDraft.endsWith(']')) {
					let listType = showingTypeDraft.replace(/[\[\]]/g, '').split(',');
					this.dataSource.forEach((d) => {
						if (!listType.includes(d.Type)) d.disabled = true;
					});
				} else
					this.dataSource.forEach((d) => {
						if (d.Type != showingTypeDraft) d.disabled = true;
					});
			}
		}
		if (!this.showingDisable) {
			// Only show: parent of current Branch, current Selected Branch, parent of valid branch with disabled state.
			let parentDisabledList = new Set();
			this.dataSource
				.filter((d) => !d.disabled)
				.forEach((i) => {
					parentDisabledList = new Set([...parentDisabledList, ...this.getParent(i.IDParent).map((s) => s.Id)]);
				});
			this.dataSource.forEach((d) => {
				if (d.Id != it?.Id && !parentList?.some((p) => p.Id == d.Id) && d.disabled && !parentDisabledList?.has(d.Id)) {
					d.blockedShow = true; // still in dataSource for collapsed children purpose but not render in UI
				}
			});
		}
		if (!this.searchFn) {
			this.searchFn = this.searchShowAllChildren;
		}
		if (!this.isTree) {
			this.isTree = true;
			if (this.isCollapsed == undefined) this.isCollapsed = true;
			if (this.isCollapsed) {
				if (this.rootCollapsed || this.rootCollapsed == undefined) this.rootCollapsed = false;
			}
		}
	}

	private expandRoot() {
		const roots = this.dataSource.filter((d) => !this.dataSource.some((ds) => d.IDParent === ds.Id));
		roots.forEach((root) => {
			root.showdetail = false; // Ensure the root is expanded
			this.toggleRow(root);
		});
	}

	toggleRow(row) {
		if (!row.hasChildInSearchBox) {
			return;
		}
		row.showdetail = !row.showdetail;
		let subRows = this.dataSource.filter((d) => d.IDParent == row.Id);
		if (row.showdetail) {
			subRows.forEach((it) => {
				it.show = true;
			});
		} else {
			subRows.forEach((it) => {
				this.hideSubRows(it);
			});
		}
	}

	hideSubRows(row) {
		row.show = false;
		if (row.hasChildInSearchBox) {
			row.showdetail = false;
			let subRows = this.dataSource.filter((d) => d.IDParent == row.Id);

			subRows.forEach((it) => {
				this.hideSubRows(it);
				it.show = false;
			});
		}
	}

	private hasEligibleChild(id: any): boolean {
		// Check direct children
		return this.dataSource.some((child) => {
			if (child.IDParent === id) {
				// Check if the child is not disabled OR recursively check its children
				return !child.disabled || this.hasEligibleChild(child.Id);
			}
			return false;
		});
	}

	private getAllNestedChildren(Id: number, result = []) {
		let children = this.dataSource.filter((d) => d.IDParent == Id);
		children.forEach((c) => {
			result.push(c);
			this.getAllNestedChildren(c.Id, result);
		});
		return result;
	}

	private getParent(Id: number, result = []) {
		let parent = this.dataSource.find((d) => d.Id == Id);
		if (parent) {
			result.unshift(parent);
			if (parent.IDParent) {
				this.getParent(parent.IDParent, result);
			}
		}
		return result;
	}
	// #endregion
}
