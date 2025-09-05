import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { PR_ProgramProvider } from '../static/services.service';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	promotionList = [];

	constructor(
		public commonService: CommonService,
		public programProvider: PR_ProgramProvider
	) {}

	getPromotions() {
		this.programProvider.read({ BetweenDate: new Date() ,Status: 'Approved'}).then((value: any) => {
			this.promotionList = value.data;
		});
	}

}
