import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/core/env.service';
import { SYS_StatusProvider } from 'src/app/services/static/services.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-system-status-detail',
    templateUrl: './system-status-detail.page.html',
    styleUrls: ['./system-status-detail.page.scss'],
})
export class SystemStatusDetailPage extends PageBase {
    colorList = [
        { Code: 'success' }, { Code: 'warning' }, { Code: 'danger' },
        { Code: 'primary' }, { Code: 'secondary' }, { Code: 'tertiary' },
        { Code: 'dark' }, { Code: 'medium' }, { Code: 'light' },
    ];
    constructor(
        public pageProvider: SYS_StatusProvider,
        public env: EnvService,
        public navCtrl: NavController,
        public route: ActivatedRoute,

        public modalController: ModalController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public cdr: ChangeDetectorRef,
        public loadingController: LoadingController,
    ) {
        super();
        this.pageConfig.forceLoadData = true;
        this.pageConfig.isDetailPage = true;
        this.pageConfig.isForceCreate = true;
        this.id = this.route.snapshot.paramMap.get('id');
        this.formGroup = formBuilder.group({
            IDParent: [''],
            Id: ['', Validators.required],
            Code: ['', Validators.required],
            Name: ['', Validators.required],
            Remark: [''],
            Sort: [''],
            Color: [''],
        });
    }

    preLoadData() {
        if (this.navParams) {
            this.items = JSON.parse(JSON.stringify(this.navParams.data.items));
            this.items.forEach(i => {
                let prefix = '';
                for (let j = 1; j < i.level; j++) {
                    prefix += '- '
                }
                i.Name = prefix + i.Name;
            })
            this.item = JSON.parse(JSON.stringify(this.navParams.data.item));
            this.id = this.navParams.data.id;

            this.removeCurrentNode();
            this.cdr.detectChanges();
            super.loadedData();
        }
    }

    refresh(){
        this.preLoadData();
    }

    removeCurrentNode() {
        let currentItem = this.items.find(i => i.Id == this.id);
        if (currentItem) {
            currentItem.Flag = true;
            this.markNestedNode(this.items, this.id);
        }
    }

    markNestedNode(ls, Id) {
        ls.filter(d => d.IDParent == Id).forEach(i => {
            i.Flag = true;
            this.markNestedNode(ls, i.Id);
        });
    }

}
