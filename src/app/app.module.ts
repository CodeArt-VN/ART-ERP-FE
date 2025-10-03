import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgOptionHighlightDirective } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { DynamicTranslateLoaderService } from './services/util/translate-loader.service';
import { DataCorrectionRequestModalPageModule } from './modals/data-correction-request-modal/data-correction-request-modal.module';
import { AdvanceFilterModalComponent } from './modals/advance-filter-modal/advance-filter-modal.component';
import { dog } from 'src/environments/environment';
import { CacheManagementService } from './services/core/cache-management.service';

export function createTranslateLoader(http: HttpClient, storage: CacheManagementService): DynamicTranslateLoaderService {
	return new DynamicTranslateLoaderService(http, storage);
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
		AdvanceFilterModalComponent,
	],
	exports: [],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		TranslateModule.forRoot({
			defaultLanguage: 'cache',
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient, CacheManagementService],
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
		NgOptionHighlightDirective,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode(),
			// Register the ServiceWorker as soon as the application is stable
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
		
		// // APP_INITIALIZER - Initialize storage first
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: initializeStorage,
		// 	deps: [StorageService],
		// 	multi: true
		// },
		
		// APP_INITIALIZER - Then initialize environment
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: initializeAuthentication,
		// 	deps: [AuthenticationService],
		// 	multi: true
		// },
	],
})
export class AppModule {}
