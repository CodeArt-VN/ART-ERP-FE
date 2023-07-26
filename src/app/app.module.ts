import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule, HttpClientJsonpModule, HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PopoverPage } from './pages/SYS/popover/popover.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShareModule } from './share.module';
import { PipesModule } from './pipes/pipes.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgxMaskModule } from 'ngx-mask';




import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, PopoverPage],
  entryComponents: [PopoverPage],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi-VN',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
    }),
    IonicModule.forRoot({
      mode: 'ios',
      // backButtonText: 'Trở lại',
      //locationStrategy: 'local',//'local'; Set to 'path' to remove hashbangs when using Deeplinking.
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    PipesModule,

    //FullCalendarModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxMaskModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [],
  providers: [
    SplashScreen,
    //BarcodeScanner,
    //Geolocation,
    //{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
