import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { PageBase } from 'src/app/page-base';
import { BRA_BranchProvider, WMS_ZoneProvider } from 'src/app/services/static/services.service';
import { Location } from '@angular/common';
import { Schema } from 'src/app/models/options-interface';

@Component({
    selector: 'app-schema',
    templateUrl: 'schema.page.html',
    styleUrls: ['schema.page.scss']
})
export class SchemaPage extends PageBase {
    schemaList: Schema[] = [
		{ Id: 1, Code: 'SaleOrder', Name: 'Sale orders', Type: 'Dataset', ModifiedDate: '2023-01-01', Icon: 'add', Color: 'success',Remark:'test' },
		{ Id: 2, Code: 'ARInvoice', Name: 'A/R Invoice dataset', Type: 'Dataset', ModifiedDate: '2023-01-01', Icon: 'add', Color: 'danger',Remark:'test' },
		{ Id: 3, Code: 'ARInvoice', Name: 'A/R Invoice dataset', Type: 'Dataset', ModifiedDate: '2023-01-01' , Icon: 'add', Color: 'warning',Remark:'test'},
	];
    constructor(
        public pageProvider: WMS_ZoneProvider,
        public branchProvider: BRA_BranchProvider,
        public modalController: ModalController,
		public popoverCtrl: PopoverController,
        public alertCtrl: AlertController,
        public loadingController: LoadingController,
        public env: EnvService,
        public navCtrl: NavController,
        public location: Location,
    ) {
        super();
    }

}
