import { Injectable } from '@angular/core';
import { CRM_ContactProvider } from './static/services.service';
import { SYS_ConfigService } from './system-config.service';
import { EnvService } from './core/env.service';
import { CommonService } from './core/common.service';

@Injectable({
	providedIn: 'root',
})

export class CRM_ContactService extends CRM_ContactProvider {
	constructor(
		public sysConfigService: SYS_ConfigService,
		public env: EnvService,
		public commonService: CommonService
	) {
		super(commonService);
	}

	/**
	 * Load printing configuration from system config service
	 * @param IDBranch Branch ID to load config for (null for current selected branch)
	 * @returns Promise resolving to ConfigList when config is loaded successfully
	 */
	getConfig(IDBranch = null,keys) {
		return new Promise((resolve, reject) => {
			this.sysConfigService
				.getConfig(IDBranch ?? this.env.selectedBranch, keys)
				.then((config) => {
					resolve(config);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}


}
