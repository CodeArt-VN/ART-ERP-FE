import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NativeBiometric, BiometryType } from '@capgo/capacitor-native-biometric';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

/** Keychain/Keystore server key — scoped per tenant domain. */
function biometricServer(): string {
	try {
		return new URL(environment.appDomain).host || 'art-erp';
	} catch {
		return 'art-erp';
	}
}

export type BiometricProbe = {
	native: boolean;
	platform: string;
	available: boolean;
	enabled: boolean;
	label: string;
	error?: string;
};

@Injectable({
	providedIn: 'root',
})
export class BiometricAuthService {
	constructor(private translate: TranslateService) {}

	get isNative(): boolean {
		return Capacitor.isNativePlatform();
	}

	get platform(): string {
		return Capacitor.getPlatform();
	}

	/** Hiện block Face ID trên Profile khi chạy app native (iOS/Android). */
	get showUi(): boolean {
		return this.isNative && (this.platform === 'ios' || this.platform === 'android');
	}

	async isAvailable(): Promise<boolean> {
		if (!this.isNative) {
			return false;
		}
		try {
			const result = await NativeBiometric.isAvailable();
			if (result?.isAvailable) {
				return true;
			}
			if ((result as any)?.strongBiometryIsAvailable) {
				return true;
			}
			const type = result?.biometryType;
			return (
				type === BiometryType.FACE_ID ||
				type === BiometryType.TOUCH_ID ||
				type === BiometryType.FINGERPRINT ||
				type === BiometryType.FACE_AUTHENTICATION ||
				type === BiometryType.IRIS_AUTHENTICATION
			);
		} catch (err) {
			console.warn('[BiometricAuth] isAvailable failed — plugin missing or not synced?', err);
			return false;
		}
	}

	async hasSavedCredentials(): Promise<boolean> {
		if (!this.isNative) {
			return false;
		}
		try {
			const { isSaved } = await NativeBiometric.isCredentialsSaved({ server: biometricServer() });
			return !!isSaved;
		} catch (err) {
			console.warn('[BiometricAuth] isCredentialsSaved failed', err);
			return false;
		}
	}

	async canUseBiometricLogin(): Promise<boolean> {
		return (await this.isAvailable()) && (await this.hasSavedCredentials());
	}

	async biometryLabel(): Promise<string> {
		if (!this.isNative) {
			return 'Face ID';
		}
		try {
			const result = await NativeBiometric.isAvailable();
			switch (result?.biometryType) {
				case BiometryType.FACE_ID:
					return 'Face ID';
				case BiometryType.TOUCH_ID:
					return 'Touch ID';
				case BiometryType.FINGERPRINT:
					return 'Fingerprint';
				case BiometryType.FACE_AUTHENTICATION:
					return 'Face unlock';
				default:
					return this.platform === 'ios' ? 'Face ID' : 'Biometric';
			}
		} catch {
			return this.platform === 'ios' ? 'Face ID' : 'Biometric';
		}
	}

	async probe(): Promise<BiometricProbe> {
		const label = await this.biometryLabel();
		if (!this.isNative) {
			return { native: false, platform: this.platform, available: false, enabled: false, label, error: 'not-native' };
		}
		try {
			const available = await this.isAvailable();
			const enabled = available && (await this.hasSavedCredentials());
			return {
				native: true,
				platform: this.platform,
				available,
				enabled,
				label,
				error: available ? undefined : 'biometry-unavailable',
			};
		} catch (err: any) {
			return {
				native: true,
				platform: this.platform,
				available: false,
				enabled: false,
				label,
				error: err?.message || 'probe-failed',
			};
		}
	}

	private t(key: string, params?: Record<string, string>): Promise<string> {
		return firstValueFrom(this.translate.get(key, params));
	}

	async unlockCredentials(): Promise<{ username: string; password: string } | null> {
		if (!(await this.canUseBiometricLogin())) {
			return null;
		}

		const label = await this.biometryLabel();
		await NativeBiometric.verifyIdentity({
			reason: await this.t('Sign in to ART-ERP'),
			title: 'ART-ERP',
			subtitle: await this.t(label),
			description: await this.t('Confirm it is you'),
			useFallback: true,
		});

		const credentials = await NativeBiometric.getCredentials({ server: biometricServer() });
		if (!credentials?.username || !credentials?.password) {
			return null;
		}
		return { username: credentials.username, password: credentials.password };
	}

	async enable(username: string, password: string): Promise<boolean> {
		if (!username || !password) {
			return false;
		}
		if (!this.isNative) {
			return false;
		}
		if (!(await this.isAvailable())) {
			return false;
		}

		const label = await this.biometryLabel();
		const type = await this.t(label);
		await NativeBiometric.verifyIdentity({
			reason: await this.t('Enable {type} for ART-ERP', { type }),
			title: 'ART-ERP',
			subtitle: type,
			description: await this.t('Confirm it is you to enable quick sign-in'),
			useFallback: true,
		});

		await NativeBiometric.setCredentials({
			username,
			password,
			server: biometricServer(),
		});

		return await this.hasSavedCredentials();
	}

	async clearCredentials(): Promise<void> {
		if (!this.isNative) {
			return;
		}
		try {
			await NativeBiometric.deleteCredentials({ server: biometricServer() });
		} catch {
			/* ignore */
		}
	}
}
