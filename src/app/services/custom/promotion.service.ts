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
	private voucherBySO$ = new BehaviorSubject<Record<number, any[]>>({});
	voucherBySOObs$ = this.voucherBySO$.asObservable();
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

	getPromotionProgram(IDSO) {
		// trả ra FE trước cho smooth UI rồi di lấy voucher BE
		const map = { ...this.voucherBySO$.value };
		this.voucherBySO$.next(map);
		return  this.programProvider.commonService
			.connect('GET', 'PR/Program/AppliedProgramInSaleOrder', {
				IDSO: IDSO,
			})
			.toPromise()
			.then((data: any) => {
		// update voucher Mới nhất
				map[IDSO] = data || [];
				this.voucherBySO$.next(map);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	applyVoucher(so: any, code: string) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'PR/Program/UseVoucher/', {
					VoucherCodeList: [code],
					SaleOrder: so,
					IsCheckOnly: false,
				})
				.toPromise()
				.then((savedItem: any) => {
					const map = { ...this.voucherBySO$.value };
					map[so.Id] = [...(map[so.Id] || []), code];
					this.voucherBySO$.next(map);
					this.env.showMessage('Saving completed!', 'success');
					resolve(savedItem);
				})
				.catch((err) => {
					this.env.showErrorMessage(err);
					resolve(null);
				});
		});
	}

	deleteVoucher(saleOrder: any, voucherCodes: string[]) {
		return new Promise((resolve, reject) => {
			this.commonService
				.connect('POST', 'PR/Program/UnUseVoucher/', {
					SaleOrder: saleOrder,
					VoucherCodeList: voucherCodes,
				})
				.toPromise()
				.then(() => {
					const map = { ...this.voucherBySO$.value };

					map[saleOrder.Id] = (map[saleOrder.Id] || []).filter((v) => !voucherCodes.includes(v.VoucherCode));

					this.voucherBySO$.next(map);

					this.env.showMessage('Saving completed!', 'success');
					resolve(true);
				})
				.catch((err) => {
					this.env.showErrorMessage(err);
					reject(err);
				});
		});
	}

	clearMemory(IDSO: number) {
		const map = { ...this.voucherBySO$.value };
		delete map[IDSO];
		this.voucherBySO$.next(map);
	}
}
