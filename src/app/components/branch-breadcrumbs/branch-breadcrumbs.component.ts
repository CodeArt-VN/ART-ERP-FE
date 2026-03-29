import { Component, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';

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
		this.loadData();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Id'] || changes['Items']) {
			this.loadData();
		}
	}

	loadData() {
		this.breadcrumbs = [];
		if (!Array.isArray(this.Items) || typeof this.Id !== 'number' || this.Id < 0) {
			return;
		}
		this.addParent(this.Id);
	}

	addParent(id) {
		if (id === null || id === undefined) return;
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
