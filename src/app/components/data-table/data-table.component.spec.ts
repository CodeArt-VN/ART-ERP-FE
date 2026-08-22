import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

import { DataTableComponent } from './data-table.component';
import { ColumnChangesService } from './directives/data-table-column-directive';

describe('DataTableComponent', () => {
	let component: DataTableComponent;
	let fixture: ComponentFixture<DataTableComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [DataTableComponent],
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
});
