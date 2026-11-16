import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { EnvService } from 'src/app/services/core/env.service';
import { DynamicScriptLoaderService } from 'src/app/services/custom/custom.service';
import { ReportService } from 'src/app/services/custom/report.service';
import { EVENT_TYPE } from 'src/app/services/static/event-type';

import { EChartComponent } from './e-chart.component';

describe('EChartComponent', () => {
	let component: EChartComponent;
	let fixture: ComponentFixture<EChartComponent>;
	let events$: Subject<any>;
	let env: { getEvents: jasmine.Spy; showMessage: jasmine.Spy };

	beforeEach(waitForAsync(() => {
		events$ = new Subject<any>();
		env = {
			getEvents: jasmine.createSpy('getEvents').and.returnValue(events$),
			showMessage: jasmine.createSpy('showMessage'),
		};

		TestBed.configureTestingModule({
			declarations: [EChartComponent],
			providers: [
				{
					provide: ReportService,
					useValue: {
						echartDefaultOption: {
							getChartOption: () => ({}),
							updateSeriesByDimension: () => {},
							mergeDefaultChartOption: (o) => o,
						},
					},
				},
				{ provide: EnvService, useValue: env },
				{
					provide: DynamicScriptLoaderService,
					useValue: { loadResources: () => Promise.resolve() },
				},
			],
		})
			.overrideTemplate(EChartComponent, '<div [id]="elId"></div>')
			.compileComponents();

		fixture = TestBed.createComponent(EChartComponent);
		component = fixture.componentInstance;
		component.chartType = 'manual';
		component.chartOption = { series: [] };
		spyOn(component as any, 'loadEchartLib');
		fixture.detectChanges();
	}));

	it('rebuilds chart after CHANGE_THEME once CSS settle delay elapses', fakeAsync(() => {
		const updateSpy = spyOn(component, 'updateChart');
		events$.next({ Code: EVENT_TYPE.APP.CHANGE_THEME, Value: 'Dark' });
		expect(updateSpy).not.toHaveBeenCalled();
		tick(100);
		expect(updateSpy).toHaveBeenCalledTimes(1);
	}));

	it('rebuilds chart after CHANGE_LANGUAGE for translated status labels', fakeAsync(() => {
		const updateSpy = spyOn(component, 'updateChart');
		events$.next({ Code: EVENT_TYPE.APP.CHANGE_LANGUAGE, Value: 'vi-VN' });
		tick(0);
		expect(updateSpy).toHaveBeenCalledTimes(1);
	}));

	it('ignores unrelated events', fakeAsync(() => {
		const updateSpy = spyOn(component, 'updateChart');
		events$.next({ Code: EVENT_TYPE.APP.SHOW_MENU });
		tick(100);
		expect(updateSpy).not.toHaveBeenCalled();
	}));

	it('unsubscribes and clears theme timer on destroy', fakeAsync(() => {
		const updateSpy = spyOn(component, 'updateChart');
		const sub = (component as any).themeSub as { closed: boolean };
		events$.next({ Code: EVENT_TYPE.APP.CHANGE_THEME, Value: 'Light' });
		component.ngOnDestroy();
		expect(sub.closed).toBe(true);
		tick(100);
		expect(updateSpy).not.toHaveBeenCalled();
	}));
});
