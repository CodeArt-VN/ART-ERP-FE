import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { NativeBiometric, BiometryType } from '@capgo/capacitor-native-biometric';
import { environment } from '../../../environments/environment';

/** Keychain/Keystore server key — scoped per tenant domain. */
function biometricServer(): string {
	try {
		return new URL(environment.appDomain).host || 'art-erp';
	} catch {
		return 'art-erp';
	}
}

@Injectable({
	providedIn: 'root',
})
export class BiometricAuthService {
	/** Native only — browser / ionic serve không có Face ID. */
	get isNative(): boolean {
		return Capacitor.isNativePlatform();
	}

	get platform(): string {
		return Capacitor.getPlatform();
	}

	async isAvailable(): Promise<boolean> {
		if (!this.isNative) {
			return false;
		}
		try {
			const result = await NativeBiometric.isAvailable({ useFallback: true });
			return !!result.isAvailable;
		} catch {
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
		} catch {
			return false;
		}
	}

	/** Hiện nút Face ID trên màn login khi máy hỗ trợ + đã bật. */
	async canUseBiometricLogin(): Promise<boolean> {
		return (await this.isAvailable()) && (await this.hasSavedCredentials());
	}

	async biometryLabel(): Promise<string> {
		if (!this.isNative) {
			return 'Face ID';
		}
		try {
			const result = await NativeBiometric.isAvailable({ useFallback: true });
			switch (result.biometryType) {
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

	/** Prompt Face ID/Touch ID rồi lấy username/password đã lưu trong Keychain. */
	async unlockCredentials(): Promise<{ username: string; password: string } | null> {
		if (!(await this.canUseBiometricLogin())) {
			return null;
		}

		await NativeBiometric.verifyIdentity({
			reason: 'Sign in to ART-ERP',
			title: 'ART-ERP',
			subtitle: await this.biometryLabel(),
			description: 'Confirm it is you',
			useFallback: true,
		});

		const credentials = await NativeBiometric.getCredentials({ server: biometricServer() });
		if (!credentials?.username || !credentials?.password) {
			return null;
		}
		return { username: credentials.username, password: credentials.password };
	}

	/**
	 * Xác nhận Face ID rồi lưu tài khoản vào Keychain.
	 * @returns true nếu lưu thành công
	 */
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

		await NativeBiometric.verifyIdentity({
			reason: 'Enable Face ID for ART-ERP',
			title: 'ART-ERP',
			subtitle: await this.biometryLabel(),
			description: 'Confirm it is you to enable quick sign-in',
			useFallback: true,
		});

		await NativeBiometric.setCredentials({
			username,
			password,
			server: biometricServer(),
		});

		return await this.hasSavedCredentials();
	}

	/** @deprecated dùng enable() — giữ để tương thích tạm */
	async saveCredentials(username: string, password: string): Promise<void> {
		await this.enable(username, password);
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
