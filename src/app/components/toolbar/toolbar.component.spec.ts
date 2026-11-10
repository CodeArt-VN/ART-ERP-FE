import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

import { EnvService } from 'src/app/services/core/env.service';
import { DataTableMobileFilterService } from '../data-table/data-table-mobile-filter.service';
import { ToolbarComponent } from './toolbar.component';

@Pipe({ name: 'translate', standalone: false })
class TranslatePipeStub implements PipeTransform {
	transform(value: any): any {
		return value;
	}
}

describe('ToolbarComponent search', () => {
	let fixture: ComponentFixture<ToolbarComponent>;
	let component: ToolbarComponent;
	let matchMediaSpy: jasmine.Spy;

	beforeEach(waitForAsync(() => {
		matchMediaSpy = spyOn(window, 'matchMedia').and.returnValue({
			matches: false,
			media: '',
			addEventListener: () => {},
			removeEventListener: () => {},
		} as unknown as MediaQueryList);

		TestBed.configureTestingModule({
			declarations: [ToolbarComponent, TranslatePipeStub],
			providers: [
				DataTableMobileFilterService,
				{ provide: TranslateService, useValue: { get: () => of(''), instant: (value: string) => value } },
				{ provide: EnvService, useValue: { getEvents: () => new Subject() } },
				{ provide: ModalController, useValue: {} },
				{ provide: PopoverController, useValue: {} },
			],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(ToolbarComponent);
		component = fixture.componentInstance;
		component.page = { pageConfig: { isShowSearch: false, pageTitle: 'Items' } };
	}));

	it('toggles the inline filter when no compact table claims the sheet', () => {
		matchMediaSpy.and.returnValue({ matches: true, addEventListener: () => {}, removeEventListener: () => {} });
		component.onSearchClick();
		expect(component.page.pageConfig.isShowSearch).toBeTrue();
	});

	it('opens the mobile sheet instead of toggling the inline row', () => {
		matchMediaSpy.and.returnValue({ matches: true, addEventListener: () => {}, removeEventListener: () => {} });
		const bus = TestBed.inject(DataTableMobileFilterService);
		let opened = false;
		bus.requests$.subscribe((req) => {
			req.register({
				inOverlay: false,
				area: 10,
				open: () => {
					opened = true;
				},
			});
		});
		component.onSearchClick();
		expect(component.page.pageConfig.isShowSearch).toBeFalse();
		expect(opened).toBeTrue();
	});

	it('keeps the inline toggle on a wide screen', () => {
		matchMediaSpy.and.returnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
		component.onSearchClick();
		expect(component.page.pageConfig.isShowSearch).toBeTrue();
	});

	it('opens the filter sheet on a wide screen for Ctrl or Command click', () => {
		matchMediaSpy.and.returnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
		const bus = TestBed.inject(DataTableMobileFilterService);
		const sources: string[] = [];
		bus.requests$.subscribe((req) => {
			sources.push(req.source);
			req.register({ inOverlay: false, area: 10, open: () => undefined });
		});
		component.onSearchClick({ ctrlKey: true, preventDefault() {} } as MouseEvent);
		expect(component.page.pageConfig.isShowSearch).toBeFalse();
		component.onSearchClick({ metaKey: true, preventDefault() {} } as MouseEvent);
		expect(sources).toEqual(['modifier', 'modifier']);
	});
});
