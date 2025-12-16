import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AdvanceFilterModalComponent } from 'src/app/modals/advance-filter-modal/advance-filter-modal.component';
import { EnvService } from 'src/app/services/core/env.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
	standalone: false,
})
export class ToolbarComponent implements OnInit {
	@ViewChild('importfile') importfile: any;

	@Input() NoBorder = false;

	@Input() page;

	@Input() pageConfig; //remove this line

	@Input() BackHref;
	@Input() pageTitle;
	@Input() selectedTitle;
	@Input() selectedItems; //remove this line

	@Input() query: any = {}; //remove this line

	@Input() CenterTitle;

	@Input() ShowAdd = true;
	@Input() ShowSearch = true;
	@Input() ShowRefresh = true;

	@Input() ShowExport = true;
	@Input() ShowImport = true;

	@Input() ShowCopy = true;
	@Input() ShowChangeBranch = true;

	@Input() ShowSubmit = true;
	@Input() ShowApprove = true;
	@Input() ShowDisapprove = true;

	@Input() ShowMerge = true;
	@Input() ShowSplit = true;

	@Input() ShowCancel = true;
	@Input() ShowArchive = true;
	@Input() ShowDelete = true;

	@Input() ShowHelp = true;
	@Input() ShowFeature = false;

	@Input() AcceptFile = '.xlsx';

	constructor(
		public translate: TranslateService,
		public env: EnvService,
		public modalController: ModalController
	) {
		this.env.getEvents().subscribe((data) => {
			if (data.Code == 'app:closePopListToolBar') {
				this.toolBarPopover.dismiss();
				this.isToolBarPopoverOpen = false;
			}
		});
	}

	ngOnInit() {
		if (this.page.pageConfig?.pageTitle)
			this.translate.get(this.page.pageConfig.pageTitle).subscribe((text: string) => {
				this.pageTitle = text;
				window.document.title = text;
			});
		//  this.initShowButtons();
	}

	toggleFeature() {
		if (this.page) {
			this.page.toggleFeature();
		} else {
			this.page.pageConfig.isShowFeature = !this.page.pageConfig.isShowFeature;
		}
	}

	deleteItem() {
		if (this.page?.item?.Id) {
			this.page.delete();
		} else {
			this.page.delete();
		}
	}

	onClickImport() {
		this.importfile.nativeElement.value = '';
		this.importfile.nativeElement.click();
	}

	importFileChange(event) {
		this.page.import(event);
	}

	openAdvanceFilter() {
		this.page.openAdvanceFilter();
	}

	@ViewChild('toolBarPopover') toolBarPopover;
	isToolBarPopoverOpen = false;
	presentToolBarPopover(e: Event) {
		this.toolBarPopover.event = e;
		this.isToolBarPopoverOpen = true;
	}

	async export() {
		if (!this.page.pageConfig?.IsRequiredDateRangeToExport) {
			this.page.export();
		} else {
			if (!this.page.query._AdvanceConfig) this.page.getAdvaneFilterConfig();

			const modal = await this.modalController.create({
				component: AdvanceFilterModalComponent,
				cssClass: 'modal-merge-arinvoice',
				componentProps: {
					_AdvanceConfig: this.page.query._AdvanceConfig,
					schemaType: 'Form',
					selectedSchema: this.page.schemaPage,
					confirmButtonText: 'Export',
					renderGroup: { Filter: ['TimeFrame', 'Transform'], Sort: [] },
				},
			});

			await modal.present();
			const { data } = await modal.onWillDismiss();

			if (data && data.data) {
								// ----------- ĐỆ QUY PARSE FILTER -----------
				const parseFilterRecursive = (node: any, q: any)=> {
					// Nếu node là một điều kiện (có Dimension & Operator)
					if (node.Dimension && node.Operator && node.Operator !== 'AND' && node.Operator !== 'OR') {
						// Ví dụ: node = { Dimension: "IDBusinessPartner", Operator: "=", Value: "421" }
						q[node.Dimension] = node.Value;
					}

					// Nếu có các logical con → đệ quy tiếp
					if (node.Logicals && Array.isArray(node.Logicals)) {
						for (let child of node.Logicals) {
							parseFilterRecursive(child, q);
						}
					}
				}
				let rs = data.data;
				if (rs.TimeFrame && rs.TimeFrame.Dimension) {
					const dim = rs.TimeFrame.Dimension; // InvoiceDate, OrderDate, v.v.

					if (rs.TimeFrame.From?.Value) this.page.query[dim + 'From'] = rs.TimeFrame.From.Value;

					if (rs.TimeFrame.To?.Value) this.page.query[dim + 'To'] = rs.TimeFrame.To.Value;
					else if (rs.TimeFrame.From?.Value) {
						const d = new Date();
						this.page.query[dim + 'To'] =
							d.getFullYear() +
							'-' +
							String(d.getMonth() + 1).padStart(2, '0') +
							'-' +
							String(d.getDate()).padStart(2, '0') +
							' ' +
							String(d.getHours()).padStart(2, '0') +
							':' +
							String(d.getMinutes()).padStart(2, '0') +
							':' +
							String(d.getSeconds()).padStart(2, '0');
					}
				}

				// ---- SORTBY: dạng "[Id_desc,Name]" → thành mảng hoặc object tùy bạn
				this.page.query.SortBy = rs.SortBy;

				// ---- TRANSFORM FILTER ----
				if (rs.Transform?.Filter) {
					parseFilterRecursive(rs.Transform.Filter, this.page.query);
				}
				if (data.isApplyFilter) this.page.query._AdvanceConfig = data.data;
				if (data.schema) this.page.schemaPage = data.schema;
				// this.page.query[data.data.TimeFrame.Dimension + 'From'] = data.data.TimeFrame.From.Value;
				// this.page.query[data.data.TimeFrame.Dimension + 'To'] = data.data.TimeFrame.To.Value;

				this.page.export();

		
			}
		}
	}
	

	
}
