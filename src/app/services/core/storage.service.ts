import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	/** @deprecated This is an internal implementation detail, do not use. */
	private _storage: Storage | null = null;

	constructor(public storage: Storage) {}

	async init() {
		// If using, define drivers here: await this.storage.defineDriver(/*...*/);
		this._storage = await this.storage.create();
	}

	/**
	 * Get storage
	 * @param key The key to get storage
	 * @returns Return the storage
	 */
	get(key) {
		return this._storage?.get(key)!;
	}

	/**
	 * Set storage value
	 * @param key The key to set storage
	 * @param value The value to save
	 * @returns Return promise
	 */
	set(key: string, value: any) {
		return this._storage?.set(key, value)!;
	}

	/**
	 * Clear all storage value
	 * @returns Return promise
	 */
	clear() {
		return this._storage?.clear()!;
	}
}
