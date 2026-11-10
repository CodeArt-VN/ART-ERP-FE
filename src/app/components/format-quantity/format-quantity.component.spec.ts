import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { FormatQuantityComponent } from './format-quantity.component';

describe('FormatQuantityComponent', () => {
	let component: FormatQuantityComponent;
	let fixture: ComponentFixture<FormatQuantityComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [FormatQuantityComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(FormatQuantityComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('shows each unit quantity without a minus when the total is positive', () => {
		component.quantity = 12;
		component.splitQuantityList = [
			{ Quantity: 1, UoMName: 'Thùng' },
			{ Quantity: 2, UoMName: 'Hộp' },
		];
		fixture.detectChanges();

		const text = fixture.nativeElement.textContent as string;
		expect(text).toContain('1');
		expect(text).toContain('Thùng');
		expect(text).toContain('2');
		expect(text).toContain('Hộp');
		expect(text).not.toContain('-');
		expect(fixture.debugElement.query(By.css('ion-text')).componentInstance.color).toBe('');
	});

	it('marks a negative quantity in danger and prefixes a minus', () => {
		component.quantity = -3;
		component.splitQuantityList = [{ Quantity: 3, UoMName: 'Cái' }];
		fixture.detectChanges();

		const text = fixture.nativeElement.textContent as string;
		expect(text).toContain('-');
		expect(text).toContain('3');
		expect(text).toContain('Cái');
		expect(fixture.debugElement.query(By.css('ion-text')).componentInstance.color).toBe('danger');
	});
});
