import { Injectable } from '@angular/core';
import { SYS_ConfigProvider } from '../static/services.service';
import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';

@Injectable({ providedIn: 'root' })
export class SYS_ConfigService extends SYS_ConfigProvider {
	constructor(
		public commonService: CommonService,
		public env: EnvService
	) {
		super(commonService);
		this.env?.ready?.then((_) => {
			console.log('System config service ready');
		});
	}

	getConfig(IDBranch = null, keys: string[] = null): Promise<any> {
		return new Promise((resolve, reject) => {
			this.read({
				Code_in: keys,
				IDBranch: IDBranch ?? this.env.selectedBranch,
			})
				.then((values: any) => {
					if (values?.data?.length > 0) {
						let configResult: any = {};
						values['data'].forEach((e) => {
							if ((e.Value == null || e.Value == 'null') && e._InheritedConfig) {
								e.Value = e._InheritedConfig.Value;
							}
							configResult[e.Code] = JSON.parse(e.Value);
						});
						resolve(configResult);
					} else resolve(null);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
