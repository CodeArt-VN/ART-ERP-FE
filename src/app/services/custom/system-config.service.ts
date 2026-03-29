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

	/**
	 * Get configuration values with default fallback
	 * @param IDBranch - Branch ID for configuration
	 * @param keys - Array of configuration keys to retrieve
	 * @param defaultValue - Default values to use when configuration is not set
	 * @returns Promise resolving to configuration object
	 */
	getConfig(IDBranch = null, keys: string[] = null, defaultValue: any = {}): Promise<any> {
		return new Promise((resolve, reject) => {
			this.read({
				Code_in: keys,
				IDBranch: IDBranch ?? this.env.selectedBranch,
			})
				.then((values: any) => {
					if (values?.data?.length > 0) {
						let configResult: any = {};
						
						// Process each configuration item
						values['data'].forEach((e) => {
							// If value is null and inherited config exists, use inherited value
							if ((e.Value == null || e.Value == 'null') && e._InheritedConfig) {
								e.Value = e._InheritedConfig?.Value;
							}
							try {
								configResult[e.Code] = JSON.parse(e.Value);
							} catch (error) {
								configResult[e.Code] = e.Value;
							}
							
						});

						// Check and apply default values for unset properties
						for (const key in defaultValue) {
							if (!configResult.hasOwnProperty(key) || configResult[key] === null || configResult[key] === undefined) {
								configResult[key] = defaultValue[key];
							}
						}
						
						resolve(configResult);
					} else {
						// Return default values if no data found
						resolve(defaultValue);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
