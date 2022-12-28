import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { DetailToolbarComponent } from './detail-toolbar/detail-toolbar.component';
import { ModalDetailToolbarComponent } from './modal-detail-toolbar/modal-detail-toolbar.component';
import { PageMessageComponent } from './page-message/page-message.component';
import { ShareDirectivesModule } from '../directives/share-directives.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
	imports: [IonicModule, CommonModule, ShareDirectivesModule, TranslateModule ],
	declarations: [
		ListToolbarComponent, DetailToolbarComponent, ModalDetailToolbarComponent, PageMessageComponent
	],
	exports: [
		ListToolbarComponent, DetailToolbarComponent, ModalDetailToolbarComponent, PageMessageComponent, ShareDirectivesModule
	],
})
export class ShareComponentsModule { }
