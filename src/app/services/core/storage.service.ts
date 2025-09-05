import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { dog } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private _tracking$ = new BehaviorSubject<boolean>(false);
	private _storage: Storage | null = null;
	private _initialized = false;
	private _initPromise: Promise<void> | null = null;

	constructor(public storage: Storage) {
		this.init();
	}

	tracking(): Observable<boolean> {
		return this._tracking$.asObservable();
	}

	async init(): Promise<void> {
		if (this._initPromise) {
			return this._initPromise;
		}

		this._initPromise = this._doInit();
		return this._initPromise;
	}

	private async _doInit(): Promise<void> {
		if (this._initialized) return;

		try {
			dog && console.log('🚀 [StorageService] Initializing storage...');
			// If using, define drivers here: await this.storage.defineDriver(/*...*/);
			this._storage = await this.storage.create();
			this._initialized = true;
			this._tracking$.next(true);
			dog && console.log('✅ [StorageService] Storage initialized successfully');
		} catch (error) {
			dog && console.error('❌ [StorageService] Storage initialization failed:', error);
			throw error;
		}
	}

	// Ensure storage is initialized before use
	private async ensureInitialized(): Promise<void> {
		if (!this._initialized) {
			await this.init();
		}
	}

	/**
	 * Get storage
	 * @param key The key to get storage
	 * @returns Return the storage
	 */
	async get(key: string): Promise<any> {
		await this.ensureInitialized();
		return this._storage?.get(key);
	}

	/**
	 * Set storage value
	 * @param key The key to set storage
	 * @param value The value to save
	 * @returns Return promise
	 */
	async set(key: string, value: any): Promise<void> {
		await this.ensureInitialized();
		return this._storage?.set(key, value);
	}

	/**
	 * Clear all storage value
	 * @returns Return promise
	 */
	async clear(): Promise<void> {
		await this.ensureInitialized();
		return this._storage?.clear();
	}

	/**
	 * Remove a storage key
	 * @param key The key to remove
	 * @returns Return promise
	 */
	async remove(key: string): Promise<void> {
		await this.ensureInitialized();
		return this._storage?.remove(key);
	}

	/**
	 * Get all storage keys
	 * @returns Return array of keys
	 */
	async keys(): Promise<string[]> {
		await this.ensureInitialized();
		return this._storage?.keys() || [];
	}
}
