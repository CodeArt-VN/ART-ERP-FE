import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationTriggerActionModalPage } from './integration-trigger-action-modal.page';

describe('IncomingPaymentInvoiceModalPage', () => {
	let component: IntegrationTriggerActionModalPage;
	let fixture: ComponentFixture<IntegrationTriggerActionModalPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IntegrationTriggerActionModalPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IntegrationTriggerActionModalPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
