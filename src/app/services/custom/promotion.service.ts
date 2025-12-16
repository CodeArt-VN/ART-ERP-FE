import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { PR_ProgramProvider } from '../static/services.service';
import { EnvService } from '../core/env.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PromotionService {
	promotionList: any[] = [];
	private appliedPromotionsSource = new BehaviorSubject<any[]>([]);
	appliedPromotions$ = this.appliedPromotionsSource.asObservable();
	constructor(
		public commonService: CommonService,
		public programProvider: PR_ProgramProvider,
		public env: EnvService
	) {}

	getPromotions() {
		this.programProvider
			.read({ BetweenDate: new Date(), Status: 'Approved', IgnoredBranch: true, SelectedBranch: this.env.selectedBranch, GetByBranchConfig: true })
			.then((value: any) => {
				this.promotionList = value.data;
			});
	}
	updateAppliedPromotions(list: any[]) {
		this.appliedPromotionsSource.next(list);
	}
	deleteVoucher(saleOrder, listCode) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'PR/Program/UnUseVoucher/', {
					SaleOrder: saleOrder,
					VoucherCodeList: listCode,
				})
				.toPromise()
				.then((savedItem: any) => {
					this.env.showMessage('Saving completed!', 'success');
					resolve(true);
				})
				.catch((err) => {
					this.env.showErrorMessage(err);
					reject(err);
				});
		});
	}

	getPromotionProgram(IDSO) {
		this.programProvider.commonService
			.connect('GET', 'PR/Program/AppliedProgramInSaleOrder', {
				IDSO: IDSO,
			})
			.toPromise()
			.then((data: any) => {
				this.appliedPromotionsSource.next(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
