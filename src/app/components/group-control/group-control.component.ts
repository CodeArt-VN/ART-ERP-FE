import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-group-control',
	templateUrl: './group-control.component.html',
	standalone: false,
})
export class GroupControlComponent implements OnInit {
	@Input() title;
	@Input() hideBorder;
	@Input() fields: any[] = [];
	@Output() onChange = new EventEmitter();

	constructor(
		public router: Router,
		public navCtrl: NavController
	) {}

	ngOnInit() {}
	viewConfig() {
		let navigationExtras: NavigationExtras = {
			state: this.fields.map((c) => c.Code),
		};
		this.nav('/config-grid', 'forward', navigationExtras);
	}
	trackChange(data) {
		this.onChange.emit(data);
	}
	nav(URL, direction = 'forward', data = null) {
		event?.preventDefault();
		event?.stopPropagation();

		if (direction == 'forward') {
			if (data) {
				this.navCtrl.navigateForward(URL, data);
			} else {
				this.navCtrl.navigateForward(URL);
			}
		} else if (direction == 'back') {
			this.navCtrl.navigateBack(URL);
		} else {
			this.navCtrl.navigateRoot(URL);
		}
	}
}
