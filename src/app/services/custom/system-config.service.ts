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
	 * Storage key = IDBranch + Code_in from args (keys sorted so same Code set maps to one entry).
	 */
	private buildStorageKey(IDBranch: any, keys: string[] | null): string {
		const branchSeg = String(IDBranch ?? '');
		const codeSeg = keys == null ? 'null' : JSON.stringify([...keys].sort());
		return `SYS_Config|Branch:${branchSeg}|CodeIn:${codeSeg}`;
	}

	private mergeDefaults(configResult: any, defaultValue: any): any {
		const merged = { ...configResult };
		for (const key in defaultValue) {
			if (!merged.hasOwnProperty(key) || merged[key] === null || merged[key] === undefined) {
				merged[key] = defaultValue[key];
			}
		}
		return merged;
	}

	private parseConfigResponse(values: any): any {
		const configResult: any = {};
		if (values?.data?.length > 0) {
			values['data'].forEach((e) => {
				if ((e.Value == null || e.Value == 'null') && e._InheritedConfig) {
					e.Value = e._InheritedConfig?.Value;
				}
				try {
					configResult[e.Code] = JSON.parse(e.Value);
				} catch {
					configResult[e.Code] = e.Value;
				}
			});
		}
		return configResult;
	}

	private fetchConfig(IDBranch: any, keys: string[] | null, defaultValue: any, storageKey: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.read({
				Code_in: keys,
				IDBranch,
			})
				.then((values: any) => {
					const configResult = this.parseConfigResponse(values);
					this.env.setStorage(storageKey, configResult, { enable: true }, null, 'SYS_ConfigService');
					resolve(this.mergeDefaults(configResult, defaultValue));
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	/**
	 * Get configuration values with default fallback
	 * @param IDBranch - Branch ID for configuration
	 * @param keys - Array of configuration keys to retrieve
	 * @param defaultValue - Default values to use when configuration is not set
	 * @param forceReload - Skip cache and fetch from API
	 * @returns Promise resolving to configuration object
	 */
	getConfig(IDBranch = null, keys: string[] = null, defaultValue: any = {}, forceReload = false): Promise<any> {
		const resolvedBranch = IDBranch ?? this.env.selectedBranch;
		const storageKey = this.buildStorageKey(resolvedBranch, keys);

		if (forceReload) {
			return this.fetchConfig(resolvedBranch, keys, defaultValue, storageKey);
		}

		return new Promise((resolve, reject) => {
			this.env
				.getStorage(storageKey, null, null)
				.then((cached: any) => {
					if (cached != null) {
						resolve(this.mergeDefaults(cached, defaultValue));
					} else {
						this.fetchConfig(resolvedBranch, keys, defaultValue, storageKey).then(resolve).catch(reject);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
