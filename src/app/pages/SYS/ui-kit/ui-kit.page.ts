import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';

import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import {
	UI_KIT_MEASURED_SIZES,
	UI_KIT_SECTIONS,
	UiKitAppearance,
	UiKitSection,
	applyUiKitAppearance,
	filterUiKitSections,
} from './ui-kit.helper';
// UiKitSection used by activeSection getter

@Component({
	selector: 'app-ui-kit',
	templateUrl: 'ui-kit.page.html',
	styleUrls: ['ui-kit.page.scss'],
	standalone: false,
})
export class UiKitPage extends PageBase implements OnDestroy {
	sections: UiKitSection[] = UI_KIT_SECTIONS;
	filteredSections: UiKitSection[] = UI_KIT_SECTIONS.slice();
	sectionQuery = '';
	activeSectionId = 'foundations';
	sizes = UI_KIT_MEASURED_SIZES;

	toolbarContext: 'list' | 'detail' = 'list';
	menuItemState: 'default' | 'active' = 'active';
	appearance: UiKitAppearance = 'light';

	demoPage: any;
	sampleForm: FormGroup;
	tableRows = [
		{ Id: 1, Code: 'VKIT-01', Name: 'Sample row A', Status: 'Approved' },
		{ Id: 2, Code: 'VKIT-02', Name: 'Sample row B', Status: 'Draft' },
		{ Id: 3, Code: 'VKIT-03', Name: 'Sample row C', Status: 'Pending' },
	];

	colorTokens = [
		{ name: 'Primary', varName: '--ion-color-primary' },
		{ name: 'Secondary', varName: '--ion-color-secondary' },
		{ name: 'Success', varName: '--ion-color-success' },
		{ name: 'Warning', varName: '--ion-color-warning' },
		{ name: 'Danger', varName: '--ion-color-danger' },
		{ name: 'Background', varName: '--ion-background-color' },
		{ name: 'Medium', varName: '--ion-color-medium' },
		{ name: 'Dark', varName: '--ion-color-dark' },
	];

	private previousAppearance: { light: boolean; dark: boolean } = { light: false, dark: false };

	constructor(
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location,
		public formBuilder: FormBuilder
	) {
		super();
		this.pageConfig.pageName = 'ui-kit';
		this.pageConfig.pageTitle = 'UI Kit';
		this.pageConfig.pageIcon = 'color-palette-outline';
		this.pageConfig.pageRemark = 'In-app component showroom';
		this.pageConfig.ShowAdd = false;
		this.pageConfig.ShowSearch = false;
		this.pageConfig.ShowRefresh = false;
		this.pageConfig.ShowExport = false;
		this.pageConfig.ShowImport = false;
		this.pageConfig.ShowHelp = false;
		this.pageConfig.ShowArchive = false;
		this.pageConfig.ShowFeature = true;
		this.pageConfig.isShowFeature = true;
		this.pageConfig.isFeatureAsMain = true; // feature pane left → toolbar panel icon rotate180
		this.pageConfig.refresher = false;
		this.pageConfig.showSpinner = false;

		this.sampleForm = this.formBuilder.group({
			Code: ['VKIT', Validators.required],
			Name: ['UI Kit sample', Validators.required],
			Remark: ['Live app-form-control'],
			IsActive: [true],
			Amount: [100],
		});

		this.rebuildDemoPage();
	}

	preLoadData(event?: any): void {
		const html = document.documentElement;
		this.previousAppearance = {
			light: html.classList.contains('light'),
			dark: html.classList.contains('dark'),
		};
		this.appearance = this.previousAppearance.dark ? 'dark' : 'light';
		applyUiKitAppearance(this.appearance);
		this.pageConfig.showSpinner = false;
		this.loadedData(event);
	}

	ngOnDestroy(): void {
		const html = document.documentElement;
		html.classList.remove('light', 'dark');
		if (this.previousAppearance.dark) {
			html.classList.add('dark');
		} else if (this.previousAppearance.light) {
			html.classList.add('light');
		}
	}

	onSectionSearch(ev?: any): void {
		const value = ev?.detail?.value ?? this.sectionQuery;
		this.sectionQuery = value;
		this.filteredSections = filterUiKitSections(this.sections, value);
		if (this.filteredSections.length && !this.filteredSections.some((s) => s.id === this.activeSectionId)) {
			this.activeSectionId = this.filteredSections[0].id;
		}
	}

	selectSection(id: string): void {
		this.activeSectionId = id;
	}

	get activeSection(): UiKitSection | undefined {
		return this.sections.find((s) => s.id === this.activeSectionId);
	}

	setToolbarContext(mode: string | number): void {
		this.toolbarContext = String(mode) === 'detail' ? 'detail' : 'list';
		this.rebuildDemoPage();
	}

	setMenuItemState(state: string | number): void {
		this.menuItemState = String(state) === 'active' ? 'active' : 'default';
	}

	setAppearance(appearance: string | number): void {
		this.appearance = String(appearance) === 'dark' ? 'dark' : 'light';
		applyUiKitAppearance(this.appearance);
	}

	private rebuildDemoPage(): void {
		const isDetail = this.toolbarContext === 'detail';
		this.demoPage = {
			pageConfig: {
				isDetailPage: isDetail,
				pageName: 'ui-kit',
				pageTitle: isDetail ? 'Sample detail' : 'Sample list',
				pageIcon: 'color-palette-outline',
				ShowAdd: true,
				canAdd: true,
				ShowSearch: true,
				ShowRefresh: true,
				ShowExport: true,
				canExport: true,
				ShowImport: false,
				canImport: false,
				ShowHelp: true,
				ShowDelete: true,
				canDelete: true,
				ShowArchive: false,
				canArchive: false,
				ShowFeature: false,
				ShowCopy: false,
				ShowChangeBranch: false,
				ShowSubmit: false,
				ShowApprove: false,
				ShowDisapprove: false,
				ShowMerge: false,
				ShowSplit: false,
				ShowCancel: false,
				ShowHistory: false,
				isHistoryView: false,
				isSubActive: false,
			},
			selectedItems: [],
			query: { IsDisabled: false },
			item: isDetail ? { Id: 42, IsDisabled: false, Name: 'Sample detail' } : null,
			add: () => {},
			refresh: () => {},
			help: () => {},
			unselect: () => {},
			archiveItems: () => {},
			delete: () => {},
			copy: () => {},
			changeBranch: () => {},
			submitForApproval: () => {},
			approve: () => {},
			disapprove: () => {},
			merge: () => {},
			split: () => {},
			cancel: () => {},
			enterHistoryView: () => {},
			exitHistoryView: () => {},
			backToMainView: () => {},
		};
	}
}
