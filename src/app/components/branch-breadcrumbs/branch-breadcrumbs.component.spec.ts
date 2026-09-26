import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { BranchBreadcrumbsComponent } from './branch-breadcrumbs.component';

describe('BranchBreadcrumbsComponent', () => {
	const items = [
		{ Id: 1, IDParent: null, Name: 'Tổng công ty' },
		{ Id: 2, IDParent: 1, Name: 'F1 Công ty' },
		{ Id: 3, IDParent: 2, Name: 'F2 Chi nhánh' },
	];

	function create(): BranchBreadcrumbsComponent {
		return new BranchBreadcrumbsComponent(
			{ nativeElement: document.createElement('div') } as ElementRef<HTMLElement>,
			{ detectChanges() {} } as ChangeDetectorRef
		);
	}

	it('starts the path at F1 and omits the root', () => {
		const component = create();
		component.Id = 3;
		component.Items = items;

		component.loadData();

		expect(component.breadcrumbs.map((i) => i.Name)).toEqual(['F1 Công ty', 'F2 Chi nhánh']);
		expect(component.pathFound).toBeTrue();
	});

	it('shows only F1 when the selected node is a direct child of root', () => {
		const component = create();
		component.Id = 2;
		component.Items = items;

		component.loadData();

		expect(component.breadcrumbs.map((i) => i.Name)).toEqual(['F1 Công ty']);
	});

	it('leaves an empty path when the selected node is the root', () => {
		const component = create();
		component.Id = 1;
		component.Items = items;

		component.loadData();

		expect(component.breadcrumbs).toEqual([]);
		expect(component.pathFound).toBeTrue();
	});

	it('marks the path missing when Id is not in Items', () => {
		const component = create();
		component.Id = 99;
		component.Items = items;

		component.loadData();

		expect(component.breadcrumbs).toEqual([]);
		expect(component.pathFound).toBeFalse();
	});
});
