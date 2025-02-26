import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
		public env: EnvService
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

	@ViewChild('toolBarPopover') toolBarPopover;
	isToolBarPopoverOpen = false;
	presentToolBarPopover(e: Event) {
		this.toolBarPopover.event = e;
		this.isToolBarPopoverOpen = true;
	}
}
