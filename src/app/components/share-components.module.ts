import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { DetailToolbarComponent } from './detail-toolbar/detail-toolbar.component';
import { ModalDetailToolbarComponent } from './modal-detail-toolbar/modal-detail-toolbar.component';
import { PageMessageComponent } from './page-message/page-message.component';
import { ShareDirectivesModule } from '../directives/share-directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { QueryFilterComponent } from './query-filter/query-filter.component';
import { FormsModule } from '@angular/forms';
import { ModalNotifyComponent } from './modal-notify/modal-notify.component';


@NgModule({
	imports: [IonicModule, CommonModule, FormsModule, ShareDirectivesModule, TranslateModule ],
	declarations: [
		ListToolbarComponent, DetailToolbarComponent, ModalDetailToolbarComponent, PageMessageComponent, QueryFilterComponent,ModalNotifyComponent
	],
	exports: [
		ListToolbarComponent, DetailToolbarComponent, ModalDetailToolbarComponent, PageMessageComponent, QueryFilterComponent, ShareDirectivesModule,ModalNotifyComponent
	],
})
export class ShareComponentsModule { }
