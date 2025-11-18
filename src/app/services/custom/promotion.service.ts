import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { PR_ProgramProvider } from '../static/services.service';
import { EnvService } from '../core/env.service';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	promotionList = [];

	constructor(
		public commonService: CommonService,
		public programProvider: PR_ProgramProvider,
		public env : EnvService
	) {}

	getPromotions() {
		// ,IgnoredBranch : true
		this.programProvider.read({ BetweenDate: new Date() ,Status: 'Approved',IgnoredBranch : true,SelectedBranch:this.env.selectedBranch,GetByBranchConfig : true}).then((value: any) => {
			this.promotionList = value.data;
		});
	}

}
