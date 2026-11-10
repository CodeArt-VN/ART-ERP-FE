import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

import { DataTableComponent } from './data-table.component';
import { ColumnChangesService } from './directives/data-table-column-directive';
import { DataTableMobileFilterService } from './data-table-mobile-filter.service';

@Pipe({ name: 'translate', standalone: false })
class TranslatePipeStub implements PipeTransform {
	transform(value: any): any {
		return value;
	}
}

function mediaQuery(matches: boolean): MediaQueryList {
	return {
		matches,
		media: '',
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	} as unknown as MediaQueryList;
}

describe('DataTableComponent', () => {
	let component: DataTableComponent;
	let fixture: ComponentFixture<DataTableComponent>;

	beforeEach(waitForAsync(() => {
		spyOn(window, 'matchMedia').and.returnValue(mediaQuery(false));
		TestBed.configureTestingModule({
			declarations: [DataTableComponent, TranslatePipeStub],
			imports: [IonicModule.forRoot()],
			providers: [FormBuilder, ColumnChangesService],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(DataTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hostMinHeight', () => {
		it('applies default minHeight while empty/loading so empty message can fill', () => {
			component.minHeight = '100%';
			component.showSpinner = true;
			component.rows = [];
			expect(component.isEmpty).toBeTrue();
			expect(component.hostMinHeight).toBe('100%');
		});

		it('clears default minHeight:100% when rows are present (avoids background shorter than content)', () => {
			component.minHeight = '100%';
			component.showSpinner = false;
			component.rows = [{ Id: 1 }];
			expect(component.isEmpty).toBeFalse();
			expect(component.hostMinHeight).toBeNull();
		});

		it('keeps explicit non-100% minHeight even when rows are present', () => {
			component.minHeight = '200px';
			component.showSpinner = false;
			component.rows = [{ Id: 1 }];
			expect(component.hostMinHeight).toBe('200px');
		});

		it('applies minHeight again when returning to empty after rows', () => {
			component.minHeight = '100%';
			component.showSpinner = false;
			component.rows = [{ Id: 1 }];
			expect(component.hostMinHeight).toBeNull();
			component.rows = [];
			expect(component.isEmpty).toBeTrue();
			expect(component.hostMinHeight).toBe('100%');
		});
	});

	describe('mobile filter sheet', () => {
		const titleColumn = { name: 'Title', property: 'Name', canFilter: true, filterControlType: 'text' as const };

		function useColumns(query: Record<string, unknown> = {}) {
			component.query = query;
			component.columns = [titleColumn, { name: '', checkbox: true, canFilter: true }];
		}

		it('keeps the inline filter row on a wide screen', () => {
			(window.matchMedia as jasmine.Spy).and.returnValue(mediaQuery(false));
			expect((component as any).computeSheetFilter()).toBeFalse();
		});

		it('uses the sheet on a phone even without the responsive class', () => {
			(window.matchMedia as jasmine.Spy).and.callFake((query: string) => mediaQuery(query.includes('767')));
			expect((component as any).computeSheetFilter()).toBeTrue();
		});

		it('uses the sheet up to the card breakpoint only when the table is responsive', () => {
			(window.matchMedia as jasmine.Spy).and.callFake((query: string) => mediaQuery(query.includes('1164')));
			expect((component as any).computeSheetFilter()).toBeFalse();
			fixture.nativeElement.classList.add('responsive');
			expect((component as any).computeSheetFilter()).toBeTrue();
		});

		it('discards sheet edits when the sheet closes without Apply', () => {
			useColumns({ Name: 'kept' });
			component.sheetFilter = true;
			component.openFilterSheet();
			component.formGroup.get('Name').setValue('draft');
			component.onFilterSheetWillDismiss();
			expect(component.formGroup.get('Name').value).toBe('kept');
		});

		it('applies sheet edits and does not restore them on dismiss', () => {
			useColumns({ Name: 'kept' });
			component.sheetFilter = true;
			const emitted: any[] = [];
			component.filter.subscribe((event) => emitted.push(event));
			component.openFilterSheet();
			component.formGroup.get('Name').setValue('next');
			component.applyMobileFilters();
			component.onFilterSheetWillDismiss();
			expect(component.filterSheetOpen).toBeFalse();
			expect(component.formGroup.get('Name').value).toBe('next');
			expect(emitted.length).toBe(1);
			expect(emitted[0].query.Name).toBe('next');
		});

		it('clears every filter from the sheet and submits', () => {
			useColumns({ Name: 'kept' });
			component.sheetFilter = true;
			const emitted: any[] = [];
			component.filter.subscribe((event) => emitted.push(event));
			component.openFilterSheet();
			component.clearAllFiltersFromSheet();
			component.onFilterSheetWillDismiss();
			expect(component.formGroup.get('Name').value).toBe('');
			expect(emitted.length).toBe(1);
			expect(emitted[0].query.Name).toBe('');
		});

		it('opens from the toolbar bus when this table is the visible target', () => {
			useColumns();
			component.sheetFilter = true;
			spyOn(component as any, 'isHostVisible').and.returnValue(true);
			const bus = TestBed.inject(DataTableMobileFilterService);
			expect(bus.requestOpen()).toBeTrue();
			expect(component.filterSheetOpen).toBeTrue();
		});

		it('opens the sheet on desktop when the toolbar asks with Ctrl or Command', () => {
			spyOn(component as any, 'isHostVisible').and.returnValue(true);
			useColumns({ Name: 'kept' });
			component.sheetFilter = false;
			const bus = TestBed.inject(DataTableMobileFilterService);
			expect(bus.activeCount$.value).toBe(1);
			expect(bus.requestOpen('compact')).toBeFalse();
			expect(component.filterSheetOpen).toBeFalse();
			expect(bus.requestOpen('modifier')).toBeTrue();
			expect(component.filterSheetOpen).toBeTrue();
		});

		it('scrolls the filter list at every sheet height', () => {
			component.sheetFilter = true;
			fixture.detectChanges();
			const modal = fixture.nativeElement.querySelector('ion-modal.mobile-filter-modal');
			expect(modal.expandToScroll).toBeFalse();
		});

		it('reuses the same field object while the form group is unchanged', () => {
			useColumns();
			const first = component.filterField(titleColumn);
			const second = component.filterField(titleColumn);
			expect(second).toBe(first);
		});

		it('leaves columns with an empty filter template out of the popup', () => {
			const view = (nodes: Node[]) => ({
				rootNodes: nodes,
				detectChanges() {},
				destroy() {},
			});
			component.columns = [
				titleColumn,
				{
					name: 'Unit',
					property: 'ItemUoMName',
					canFilter: true,
					filterTemplate: { createEmbeddedView: () => view([]) },
				},
				{
					name: 'Status',
					property: 'Status',
					canFilter: true,
					filterTemplate: { createEmbeddedView: () => view([{ nodeType: Node.ELEMENT_NODE } as Node]) },
				},
			];
			expect(component.filterColumns.map((column) => column.property)).toEqual(['Name', 'Status']);
		});
	});
});
