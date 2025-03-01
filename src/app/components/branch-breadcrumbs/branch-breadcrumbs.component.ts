import { Component, ViewChild, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-branch-breadcrumbs',
	templateUrl: './branch-breadcrumbs.component.html',
	styleUrls: ['./branch-breadcrumbs.component.scss'],
	standalone: false,
})
export class BranchBreadcrumbsComponent implements OnInit {
	@ViewChild('popover') popover;
	@Input() Id;
	@Input() Items;
	@Input() maxItems;
	@Input() itemsBeforeCollapse = 0;
	@Input() itemsAfterCollapse = 1;
	breadcrumbs = [];

	isOpen = false;
	collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];
	constructor() {}

	ngOnInit() {
		if (this.Items && this.Id > -1) {
			this.breadcrumbs = [];
			this.addParent(this.Id);
		}
	}

	addParent(id) {
		let parent = this.Items.find((d) => d.Id == id);

		if (parent) {
			this.breadcrumbs.unshift(parent);
			this.addParent(parent.IDParent);
		}
	}
	async presentPopover(e: Event) {
		this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
		this.popover.event = e;
		this.popover.cssClass = 'branch-breadcrumbs';
		console.log(this.popover);

		this.isOpen = true;
	}
}
