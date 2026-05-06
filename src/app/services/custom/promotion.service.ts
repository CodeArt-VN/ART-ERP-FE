import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { PR_ProgramProvider } from '../static/services.service';
import { EnvService } from '../core/env.service';
import { BehaviorSubject } from 'rxjs';
import { SYS_ConfigService } from './system-config.service';

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
		public env: EnvService,
		private sysConfigService: SYS_ConfigService
	) {}

	private normalizeBrandId(value: any): number | null {
		if (value == null || value === '' || value === 'null') return null;
		const parsed = Number(value);
		return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
	}

	async getSOBrand(IDBranch = this.env.selectedBranch): Promise<number | null> {
		if (!IDBranch) return null;
		try {
			const config: any = await this.sysConfigService.getConfig(IDBranch, ['SOBrand'], { SOBrand: null });
			return this.normalizeBrandId(config?.SOBrand);
		} catch (err) {
			console.warn('Cannot resolve SOBrand config', err);
			return null;
		}
	}

	async withBrandScope(saleOrder: any): Promise<any> {
		if (!saleOrder) return saleOrder;
		const IDBrand = this.normalizeBrandId(saleOrder.IDBrand) ?? (await this.getSOBrand(saleOrder.IDBranch ?? this.env.selectedBranch));
		return IDBrand ? { ...saleOrder, IDBrand } : saleOrder;
	}

	private async withBrandQuery(query: any, IDBranch = this.env.selectedBranch): Promise<any> {
		const IDBrand = await this.getSOBrand(IDBranch);
		return IDBrand ? { ...query, IDBrand } : query;
	}

	async getPromotions() {
		const query = await this.withBrandQuery({
			BetweenDate: new Date(),
			Status: 'Approved',
			IgnoredBranch: true,
			SelectedBranch: this.env.selectedBranch,
			GetByBranchConfig: true,
		});
		this.programProvider
			.read(query)
			.then((value: any) => {
				this.promotionList = value.data;
			});
	}

	getPromotionProgram(IDSO) {
		// trả ra FE trước cho smooth UI rồi di lấy voucher BE
		const map = { ...this.voucherBySO$.value };
		this.voucherBySO$.next(map);
		return this.programProvider.commonService
			.connect('GET', 'PR/Program/AppliedProgramInSaleOrder', {
				IDSO: IDSO,
			})
			.toPromise()
			.then((data: any) => {
				// update voucher Mới nhất
				map[IDSO] = data || [];
				this.voucherBySO$.next(map);
			})
	}

	applyVoucher(so: any, code: string) {
		return new Promise(async (resolve, reject) => {
			const saleOrder = await this.withBrandScope(so);
			this.commonService
				.connect('POST', 'PR/Program/UseVoucher/', {
					VoucherCodeList: [code],
					SaleOrder: saleOrder,
					IsCheckOnly: false,
				})
				.toPromise()
				.then((savedItem: any) => {
					this.getPromotionProgram(so.Id);
					this.env.showMessage('Saving completed!', 'success');
					resolve(savedItem);
				})
				.catch((err) => {
					this.env.showErrorMessage(err);
					resolve(null);
				});
		});
	}

	autoApplyVoucher(so: any, voucherCodes: string[], isCheckOnly = false) {
		if (!so?.Id) return Promise.resolve(null);
		if (!voucherCodes || voucherCodes.length === 0) return Promise.resolve(null);
		return new Promise(async (resolve) => {
			const saleOrder = await this.withBrandScope(so);
			this.commonService
				.connect('POST', 'PR/Program/UseVoucher/', {
					VoucherCodeList: voucherCodes,
					SaleOrder: saleOrder,
					IsCheckOnly: isCheckOnly,
				})
				.toPromise()
				.then((savedItem: any) => {
					this.getPromotionProgram(so.Id);
					resolve(savedItem);
				})
				.catch((err) => {
					// Silent fail for auto-apply
					console.warn(err);
					resolve(null);
				});
		});
	}

	deleteVoucher(saleOrder: any, voucherCodes: string[]) {
		return new Promise(async (resolve, reject) => {
			const scopedSaleOrder = await this.withBrandScope(saleOrder);
			this.commonService
				.connect('POST', 'PR/Program/UnUseVoucher/', {
					SaleOrder: scopedSaleOrder,
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

	releaseIntegrationVouchers(saleOrder: any, voucherCodes: string[], options?: { type?: string; subType?: string; providerCode?: string }) {
		if (!saleOrder?.Id || !voucherCodes || voucherCodes.length === 0) return Promise.resolve(true);
		return new Promise(async (resolve, reject) => {
			const scopedSaleOrder = await this.withBrandScope(saleOrder);
			this.commonService
				.connect('POST', 'PR/Program/UnUseVoucher/', {
					SaleOrder: scopedSaleOrder,
					VoucherCodeList: voucherCodes,
					Type: options?.type,
					SubType: options?.subType,
					ProviderCode: options?.providerCode,
				})
				.toPromise()
				.then(() => resolve(true))
				.catch((err) => reject(err));
		});
	}

	clearMemory(IDSO: number) {
		const map = { ...this.voucherBySO$.value };
		delete map[IDSO];
		this.voucherBySO$.next(map);
	}
}
