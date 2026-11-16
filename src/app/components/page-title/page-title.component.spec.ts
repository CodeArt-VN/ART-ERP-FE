import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PageTitleComponent } from './page-title.component';

@Component({
	selector: 'app-report-chart',
	template: '',
	standalone: false,
})
class ReportChartStubComponent {
	@Input() reportId: number;
	@Input() viewMode: string;
}

@Component({
	selector: 'app-page-notification',
	template: '',
	standalone: false,
})
class PageNotificationStubComponent {
	@Input() pageName: string;
}

describe('PageTitleComponent', () => {
	let component: PageTitleComponent;
	let fixture: ComponentFixture<PageTitleComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [PageTitleComponent, ReportChartStubComponent, PageNotificationStubComponent],
			imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(PageTitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('copies reportId from pageConfig and keeps title fields', () => {
		component.pageConfig = {
			pageIcon: 'cart-outline',
			pageColor: 'primary',
			pageTitle: 'Order',
			pageRemark: 'List',
			pageName: 'sale-order',
			reportId: 5,
		} as any;

		expect(component.reportIds).toEqual([5]);
		expect(component.activeReportId).toBe(5);
		expect(component.title).toBe('Order');
		expect(component.pageName).toBe('sale-order');
	});

	it('copies reportIds from pageConfig', () => {
		component.pageConfig = {
			pageIcon: 'cart-outline',
			pageColor: 'primary',
			pageTitle: 'Order',
			pageRemark: 'List',
			pageName: 'sale-order',
			reportIds: [5, 7],
		} as any;

		expect(component.reportIds).toEqual([5, 7]);
		expect(component.activeReportId).toBe(5);
		expect(component.showReportDots).toBe(true);
	});

	it('prefers reportIds over reportId on pageConfig', () => {
		component.pageConfig = {
			pageTitle: 'Order',
			reportId: 5,
			reportIds: [5, 7],
		} as any;

		expect(component.reportIds).toEqual([5, 7]);
	});

	it('renders mini report chart when reportId is set', () => {
		component.reportId = 5;
		fixture.detectChanges();
		const chart = fixture.nativeElement.querySelector('app-report-chart');
		expect(chart).toBeTruthy();
	});

	it('hides report chart when reportIds is empty', () => {
		component.reportIds = [];
		fixture.detectChanges();
		const chart = fixture.nativeElement.querySelector('app-report-chart');
		expect(chart).toBeFalsy();
	});

	it('shows page dots only when there are multiple reportIds', () => {
		component.reportIds = [5];
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('.report-page-dots')).toBeFalsy();

		component.reportIds = [5, 7];
		fixture.detectChanges();
		const dots = fixture.nativeElement.querySelectorAll('.report-page-dots .dot');
		expect(dots.length).toBe(2);
		expect(dots[0].classList.contains('active')).toBe(true);
		expect(dots[1].classList.contains('active')).toBe(false);
	});

	it('cycles next and previous and wraps both ways', () => {
		component.reportIds = [5, 7, 9];
		expect(component.activeReportId).toBe(5);

		component.cycleReport(undefined, 1);
		expect(component.activeReportId).toBe(7);

		component.cycleReport(undefined, 1);
		expect(component.activeReportId).toBe(9);

		component.cycleReport(undefined, 1);
		expect(component.activeReportId).toBe(5);

		component.cycleReport(undefined, -1);
		expect(component.activeReportId).toBe(9);

		component.cycleReport(undefined, -1);
		expect(component.activeReportId).toBe(7);
	});

	it('top half goes previous and bottom half goes next', () => {
		component.reportIds = [5, 7, 9];
		fixture.detectChanges();

		const next = fixture.nativeElement.querySelector('.report-page-dots-half.next') as HTMLButtonElement;
		const prev = fixture.nativeElement.querySelector('.report-page-dots-half.prev') as HTMLButtonElement;

		next.click();
		fixture.detectChanges();
		expect(component.activeReportId).toBe(7);

		prev.click();
		fixture.detectChanges();
		expect(component.activeReportId).toBe(5);
		expect(fixture.nativeElement.querySelectorAll('.report-page-dots .dot')[0].classList.contains('active')).toBe(true);
	});

	it('keeps an empty projected rightContent slot that hides when unused', () => {
		fixture.detectChanges();
		const projected = fixture.nativeElement.querySelector('.page-title-report-projected');
		expect(projected).toBeTruthy();
	});
});
