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
	/** Native only — web không có Face ID thật. */
	get isNative(): boolean {
		return Capacitor.isNativePlatform();
	}

	async isAvailable(): Promise<boolean> {
		if (!this.isNative) {
			return false;
		}
		try {
			const result = await NativeBiometric.isAvailable({ useFallback: false });
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

	/** Hiện nút Face ID khi máy hỗ trợ + đã lưu tài khoản sau lần login trước. */
	async canUseBiometricLogin(): Promise<boolean> {
		return (await this.isAvailable()) && (await this.hasSavedCredentials());
	}

	async biometryLabel(): Promise<string> {
		if (!this.isNative) {
			return 'Biometric';
		}
		try {
			const result = await NativeBiometric.isAvailable({ useFallback: false });
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
					return 'Biometric';
			}
		} catch {
			return 'Biometric';
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

	/** Lưu tài khoản sau login password thành công (Keychain iOS / Keystore Android). */
	async saveCredentials(username: string, password: string): Promise<void> {
		if (!this.isNative || !(await this.isAvailable())) {
			return;
		}
		await NativeBiometric.setCredentials({
			username,
			password,
			server: biometricServer(),
		});
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
