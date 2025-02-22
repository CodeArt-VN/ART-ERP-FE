import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverPage } from './pages/SYS/popover/popover.page';
import { PipesModule } from './pipes/pipes.module';
import { ShareModule } from './share.module';

import { SalemanDebtModalPage } from './pages/SALE/saleman-debt-modal/saleman-debt-modal.page';
import { SaleOrderSplitModalPage } from './pages/SALE/sale-order-split-modal/sale-order-split-modal.page';
import { SaleOrderMergeModalPage } from './pages/SALE/sale-order-merge-modal/sale-order-merge-modal.page';
import { SaleOrderARInvoiceModalPage } from './pages/SALE/sale-order-create-arinvoice-modal/sale-order-create-arinvoice-modal.page';
import { SaleOrderMergeARInvoiceModalPage } from './pages/SALE/sale-order-merge-arinvoice-modal/sale-order-merge-arinvoice-modal.page';
import { SaleOrderMobileAddContactModalPage } from './pages/SALE/sale-order-mobile-add-contact-modal/sale-order-mobile-add-contact-modal.page';

import { ARInvoiceSplitModalPage } from './pages/ACCOUNTANT/arinvoice-split-modal/arinvoice-split-modal.page';
import { ARInvoiceMergeModalPage } from './pages/ACCOUNTANT/arinvoice-merge-modal/arinvoice-merge-modal.page';

import { POSSplitModalPage } from './pages/POS/pos-split-modal/pos-split-modal.page';
import { POSMergeModalPage } from './pages/POS/pos-merge-modal/pos-merge-modal.page';
import { POSChangeTableModalPage } from './pages/POS/pos-change-table-modal/pos-change-table-modal.page';
import { POSPaymentModalPage } from './pages/POS/pos-payment-modal/pos-payment-modal.page';
import { POSDiscountModalPage } from './pages/POS/pos-discount-modal/pos-discount-modal.page';
import { POSMemoModalPage } from './pages/POS/pos-memo-modal/pos-memo-modal.page';
import { POSAddContactModalPage } from './pages/POS/pos-add-contact-modal/pos-add-contact-modal.page';
import { POSCancelModalPage } from './pages/POS/pos-cancel-modal/pos-cancel-modal.page';
import { POSNotifyModalPage } from './modals/pos-notify-modal/pos-notify-modal.page';
import { MCPCustomerPickerModalPage } from './pages/CRM/mcp-customer-picker-modal/mcp-customer-picker-modal.page';
import { DataCorrectionRequestModalPage } from './modals/data-correction-request-modal/data-correction-request-modal.page';

import { ServiceWorkerModule } from '@angular/service-worker';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../environments/environment';

import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [
		AppComponent,
		PopoverPage,
		SaleOrderSplitModalPage,
		SaleOrderMergeModalPage,
		SalemanDebtModalPage,
		SaleOrderMobileAddContactModalPage,
		SaleOrderARInvoiceModalPage,
		SaleOrderMergeARInvoiceModalPage,
		ARInvoiceSplitModalPage,
		ARInvoiceMergeModalPage,
		MCPCustomerPickerModalPage,
		POSSplitModalPage,
		POSMergeModalPage,
		POSChangeTableModalPage,
		POSPaymentModalPage,
		POSDiscountModalPage,
		POSMemoModalPage,
		POSAddContactModalPage,
		POSCancelModalPage,
		POSNotifyModalPage,
		DataCorrectionRequestModalPage,
	],
	exports: [],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		TranslateModule.forRoot({
			defaultLanguage: 'vi-VN',
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
			compiler: {
				provide: TranslateCompiler,
				useClass: TranslateMessageFormatCompiler,
			},
		}),
		IonicModule.forRoot({
			mode: 'ios',
			innerHTMLTemplatesEnabled: true,
			// backButtonText: 'Trở lại',
			//locationStrategy: 'local',//'local'; Set to 'path' to remove hashbangs when using Deeplinking.
		}),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		ShareModule,
		PipesModule,
		FullCalendarModule,
		NgSelectModule,
		NgOptionHighlightModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [
		//SplashScreen,
		//BarcodeScanner,
		//Geolocation,
		//{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		//{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: APP_BASE_HREF, useValue: `/` },
		provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
	],
})
export class AppModule {}
