import { Injectable } from '@angular/core';
import { CommonService } from '../services/core/common.service';
import { PR_ProgramProvider } from './static/services.service';

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
		this.programProvider.read({ BetweenDate: new Date() }).then((value: any) => {
			this.promotionList = value.data;
		});
	}

}
