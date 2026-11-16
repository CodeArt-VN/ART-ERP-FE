import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { BIReport } from 'src/app/interfaces/options-interface';
import { EnvService } from 'src/app/services/core/env.service';
import { ReportService } from 'src/app/services/custom/report.service';

import { ReportChartComponent } from './report-chart.component';

describe('ReportChartComponent', () => {
	let component: ReportChartComponent;
	let fixture: ComponentFixture<ReportChartComponent>;
	let rpt: jasmine.SpyObj<ReportService>;
	let storedReport: BIReport | null;

	const sampleReport = (): BIReport =>
		({
			Id: 5,
			Code: 'SO',
			Name: 'SO report',
			DataConfig: {
				Schema: { Id: 1, Type: 'Dataset', Code: 'x', Name: 'x' },
				TimeFrame: {} as any,
				CompareBy: [{ Property: 'Status', Title: 'Status' }],
				MeasureBy: [{ Property: 'Count', Title: 'Count' }],
				Interval: { Property: 'Date', Type: 'Day', Title: 'Date' },
				Transform: {} as any,
			},
			ChartScript: '',
			ChartConfig: null,
		}) as any;

	beforeEach(waitForAsync(() => {
		storedReport = null;
		rpt = jasmine.createSpyObj('ReportService', ['getReport', 'readReports', 'getReportData', 'regReportTrackingData'], {
			reportConfigTracking: new Subject<any>(),
		});
		rpt.getReport.and.callFake((id: number) => (storedReport?.Id == id ? storedReport : null));
		rpt.readReports.and.callFake(() => {
			storedReport = sampleReport();
			return Promise.resolve();
		});
		rpt.regReportTrackingData.and.returnValue(new Subject<any>());

		TestBed.configureTestingModule({
			declarations: [ReportChartComponent],
			imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()],
			providers: [
				{ provide: ReportService, useValue: rpt },
				{
					provide: EnvService,
					useValue: { getEvents: () => of(), showMessage: () => {} },
				},
			],
		})
			.overrideTemplate(ReportChartComponent, '')
			.compileComponents();

		fixture = TestBed.createComponent(ReportChartComponent);
		component = fixture.componentInstance;
	}));

	it('loads reports then applies config when report is not in memory yet', fakeAsync(() => {
		component.reportId = 5;
		expect(rpt.readReports).toHaveBeenCalled();
		expect(component.report).toBeFalsy();

		tick();
		expect(component.report?.Id).toBe(5);
		expect(component.measureBy).toContain('Count');

		tick(300);
		expect(rpt.getReportData).toHaveBeenCalledWith(5);
	}));

	it('does not throw when reportId is set before reports are available', () => {
		rpt.readReports.and.returnValue(Promise.resolve());
		expect(() => {
			component.reportId = 5;
		}).not.toThrow();
	});

	it('applies immediately when report already exists in memory', fakeAsync(() => {
		storedReport = sampleReport();
		component.reportId = 5;
		expect(rpt.readReports).not.toHaveBeenCalled();
		expect(component.report?.Id).toBe(5);
		tick(300);
		expect(rpt.getReportData).toHaveBeenCalledWith(5);
	}));

	it('rebinds data tracking when reportId changes and keeps viewMode', fakeAsync(() => {
		const first$ = new Subject<any>();
		const second$ = new Subject<any>();
		rpt.regReportTrackingData.and.callFake((id: number) => (id == 5 ? first$ : second$));

		storedReport = sampleReport();
		component.viewMode = 'full';
		component.reportId = 5;
		fixture.detectChanges();
		tick(300);

		const nextReport = sampleReport();
		nextReport.Id = 7;
		nextReport.Name = 'Other';
		rpt.getReport.and.callFake((id: number) => (id == 7 ? nextReport : storedReport));

		component.reportId = 7;
		tick(300);

		expect(component.viewMode).toBe('full');
		expect(component.report?.Id).toBe(7);
		expect(rpt.regReportTrackingData).toHaveBeenCalledWith(7);
		expect(rpt.getReportData).toHaveBeenCalledWith(7);

		second$.next({ data: [{ Count: 1 }], comparitionData: [] });
		expect(component.isLoading).toBe(false);
	}));

	it('resets viewDimension to the first measure when reportId changes', fakeAsync(() => {
		storedReport = sampleReport();
		component.reportId = 5;
		fixture.detectChanges();
		tick(300);
		component.viewDimension = 'Status';

		const nextReport = sampleReport();
		nextReport.Id = 7;
		nextReport.DataConfig.MeasureBy = [{ Property: 'Revenue', Title: 'Revenue' } as any];
		nextReport.DataConfig.CompareBy = [{ Property: 'Branch', Title: 'Branch' } as any];
		rpt.getReport.and.callFake((id: number) => (id == 7 ? nextReport : storedReport));

		component.reportId = 7;
		tick(300);

		expect(component.viewDimension).toBe('Revenue');
		expect(component.dimensions).toContain('Revenue');
		expect(component.dimensions).not.toContain('Status');
	}));

	it('clears stale dataset while switching reportId so undefined labels are not shown', fakeAsync(() => {
		storedReport = sampleReport();
		component.reportId = 5;
		fixture.detectChanges();
		tick(300);
		component.rawData = [{ Status: 'A', Count: 1 }];
		component.rptLoaded = true;
		component.dataFetchDate = new Date();

		const nextReport = sampleReport();
		nextReport.Id = 7;
		rpt.getReport.and.callFake((id: number) => (id == 7 ? nextReport : storedReport));

		component.reportId = 7;

		expect(component.isLoading).toBe(true);
		expect(component.rptLoaded).toBe(false);
		expect(component.rawData).toEqual([]);
		expect(component.dataFetchDate).toBeUndefined();

		tick(300);
		expect(rpt.getReportData).toHaveBeenCalledWith(7);
	}));
});
