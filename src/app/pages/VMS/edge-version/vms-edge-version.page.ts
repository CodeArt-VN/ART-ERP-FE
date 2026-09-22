import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import {
	artifactRowsFromRelease,
	defaultEdgeVersionManifest,
	manifestFromAdminResponse,
	validateManifestForm,
} from './vms-edge-version.util';

@Component({
	selector: 'app-vms-edge-version',
	templateUrl: './vms-edge-version.page.html',
	styleUrls: ['./vms-edge-version.page.scss'],
	standalone: false,
})
export class VmsEdgeVersionPage extends PageBase {
	adminMeta: any = {};
	staticRelease: any = null;
	artifactRows: Array<{ platform: string; file: string; sha256: string }> = [];
	saving = false;

	get normalForm() {
		return this.formGroup.get('updateSchedule.normal') as FormGroup;
	}
	get requiredForm() {
		return this.formGroup.get('updateSchedule.required') as FormGroup;
	}

	constructor(
		public vmsApi: VmsApiService,
		public env: EnvService,
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		const d = defaultEdgeVersionManifest();
		this.formGroup = formBuilder.group({
			manifestUrl: new FormControl({ value: '', disabled: true }),
			minVersion: [d.minVersion],
			latestVersion: [d.latestVersion],
			releasedAt: new FormControl({ value: '', disabled: true }),
			baseUrl: new FormControl({ value: '', disabled: true }),
			updateSchedule: formBuilder.group({
				normal: formBuilder.group({
					autoUpdate: [d.updateSchedule!.normal!.autoUpdate],
					quietHours: [d.updateSchedule!.normal!.quietHours],
					prefetchImmediately: [d.updateSchedule!.normal!.prefetchImmediately],
					timezone: [d.updateSchedule!.normal!.timezone],
				}),
				required: formBuilder.group({
					autoUpdate: [d.updateSchedule!.required!.autoUpdate],
					quietHours: [d.updateSchedule!.required!.quietHours],
					manualAnytime: [d.updateSchedule!.required!.manualAnytime],
					maxDeferMinutes: [d.updateSchedule!.required!.maxDeferMinutes],
					blockVmsWhenBelowMin: [d.updateSchedule!.required!.blockVmsWhenBelowMin],
				}),
			}),
		});
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageTitle = 'Edge version / Update policy';
		this.pageConfig.pageIcon = 'cloud-download-outline';
		this.pageConfig.pageName = 'vms-edge-version';
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		super.preLoadData(event);
		this.loadManifest();
	}

	async loadManifest() {
		this.pageConfig.showSpinner = true;
		try {
			const data: any = await firstValueFrom(this.vmsApi.getEdgeVersionManifest());
			this.adminMeta = data?._meta || {};
			this.staticRelease = data?.static_release || null;
			this.artifactRows = artifactRowsFromRelease(this.staticRelease);
			const m = manifestFromAdminResponse(data);
			const manifestUrl = String(data?.manifest_url || '').trim();
			const baseUrl = m.baseUrl || (manifestUrl ? manifestUrl.replace(/edge-version\.json$/i, '') : '');
			this.formGroup.patchValue({
				manifestUrl,
				minVersion: m.minVersion,
				latestVersion: m.latestVersion,
				releasedAt: m.releasedAt || '',
				baseUrl,
				updateSchedule: m.updateSchedule,
			});
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot load manifest', 'danger');
		} finally {
			this.pageConfig.showSpinner = false;
		}
	}

	async saveChange() {
		if (this.saving) return;
		const payload = this.formGroup.getRawValue();
		const err = validateManifestForm(payload);
		if (err) {
			this.env.showMessage(err, 'warning');
			return;
		}
		const alert = await this.alertCtrl.create({
			header: 'Save manifest overlay',
			message: 'Changing minVersion may block the fleet. Continue?',
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{ text: 'Save', role: 'confirm' },
			],
		});
		await alert.present();
		const rs = await alert.onDidDismiss();
		if (rs.role !== 'confirm') return;
		this.saving = true;
		try {
			await firstValueFrom(this.vmsApi.saveEdgeVersionManifest(payload));
			this.env.showMessage('Saved — Edge nodes receive policy on heartbeat.', 'success');
			await this.loadManifest();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Save failed', 'danger');
		} finally {
			this.saving = false;
		}
	}

	async reset(mode: 'defaults' | 'lastRelease') {
		const msg =
			mode === 'defaults'
				? 'Restore system default overlay?'
				: 'Restore overlay from last release-edge snapshot?';
		const alert = await this.alertCtrl.create({
			header: 'Reset',
			message: msg,
			buttons: [
				{ text: 'Cancel', role: 'cancel' },
				{ text: 'Reset', role: 'confirm' },
			],
		});
		await alert.present();
		const rs = await alert.onDidDismiss();
		if (rs.role !== 'confirm') return;
		try {
			await firstValueFrom(this.vmsApi.resetEdgeVersionManifest(mode));
			this.env.showMessage('Overlay reset.', 'success');
			await this.loadManifest();
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Reset failed', 'danger');
		}
	}
}
