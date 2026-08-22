import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { PageBase } from 'src/app/page-base';
import { CommonService } from 'src/app/services/core/common.service';
import { EnvService } from 'src/app/services/core/env.service';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_EdgeNodeProvider } from 'src/app/services/static/services.service';
import { inferRuntimeLabel, parseRemoteConfig, groupCamerasByBranch, truthyFlag, isEdgeOnline } from './vms-edge-node-detail.util';
import type { EdgeCameraGroup, EdgeCameraRow } from './vms-edge-node-detail.util';

@Component({
	selector: 'app-vms-edge-node-detail',
	templateUrl: './vms-edge-node-detail.page.html',
	styleUrls: ['./vms-edge-node-detail.page.scss'],
	standalone: false,
})
export class VmsEdgeNodeDetailPage extends PageBase {
	branchList: any[] = [];
	cameraGroups: EdgeCameraGroup[] = [];
	private saving = false;
	private togglingCamera = false;

	get remoteForm() {
		return this.formGroup.get('RemoteConfig') as FormGroup;
	}

	get pipelineForm() {
		return this.formGroup.get('RemoteConfig.pipeline') as FormGroup;
	}

	constructor(
		public pageProvider: VMS_EdgeNodeProvider,
		public vmsApi: VmsApiService,
		public env: EnvService,
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public alertCtrl: AlertController,
		public formBuilder: FormBuilder,
		public cdr: ChangeDetectorRef,
		public loadingController: LoadingController,
		public commonService: CommonService
	) {
		super();
		this.pageConfig.isDetailPage = true;
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		this.formGroup = formBuilder.group({
			Id: new FormControl({ value: '', disabled: true }),
			UUID: new FormControl({ value: '', disabled: true }),
			Name: [''],
			BranchIds: [[]],
			Remark: [''],
			LastHeartbeat: new FormControl({ value: '', disabled: true }),
			InferRuntime: new FormControl({ value: '', disabled: true }),
			InferDevice: new FormControl({ value: '', disabled: true }),
			CamerasWatching: new FormControl({ value: '', disabled: true }),
			CamerasOnline: new FormControl({ value: '', disabled: true }),
			PersonMapped: new FormControl({ value: '', disabled: true }),
			PersonUnmapped: new FormControl({ value: '', disabled: true }),
			OutboxPending: new FormControl({ value: '', disabled: true }),
			CreatedBy: new FormControl({ value: '', disabled: true }),
			CreatedDate: new FormControl({ value: '', disabled: true }),
			ModifiedBy: new FormControl({ value: '', disabled: true }),
			ModifiedDate: new FormControl({ value: '', disabled: true }),
			RemoteConfig: formBuilder.group({
				enabled: [true],
				confidence_auto: [0.55],
				confidence_review_min: [0.45],
				guest_throttle_minutes: [5],
				in_window_before_minutes: [60],
				in_window_after_minutes: [30],
				out_window_after_minutes: [120],
				eod_checkout_hour_local: [23],
				eod_checkout_minute_local: [30],
				pipeline: formBuilder.group({
					sample_interval_sec: [0.5],
					hit_cooldown_sec: [8],
					min_face_px: [40],
					unknown_min: [0.35],
					det_size: [640],
					require_crop_verify: [true],
					min_skin_ratio: [0],
					min_sharpness: [18],
					unknown_confirm_frames: [2],
				}),
			}),
		});
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'hardware-chip-outline';
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
		this.branchList = [...(this.env.branchList || [])];
		super.preLoadData(event);
	}

	loadedData(event?: any, ignoredFromGroup?: boolean): void {
		if (this.item) {
			this.item.RemoteConfig = parseRemoteConfig(this.item.RemoteConfig);
			this.item.BranchIds = this.item.BranchIds || [];
		}
		super.loadedData(event, ignoredFromGroup);
		this.formGroup.get('RemoteConfig')?.patchValue(parseRemoteConfig(this.item?.RemoteConfig), { emitEvent: false });
		this.formGroup.get('BranchIds')?.patchValue(this.item?.BranchIds || [], { emitEvent: false });
		this.formGroup.get('InferRuntime')?.patchValue(inferRuntimeLabel(this.item), { emitEvent: false });
		this.cameraGroups = groupCamerasByBranch(this.item?.Cameras, this.item?.BranchIds);
		this.pageConfig.canAdd = false;
		this.pageConfig.ShowAdd = false;
	}

	processingOn(cam: EdgeCameraRow): boolean {
		return truthyFlag(cam?.ProcessingEnabled);
	}

	cameraDisabled(cam: EdgeCameraRow): boolean {
		return truthyFlag(cam?.CameraDisabled);
	}

	aiOff(cam: EdgeCameraRow): boolean {
		return !truthyFlag(cam?.AiEnabled);
	}

	async toggleCameraProcess(cam: EdgeCameraRow, ev: CustomEvent) {
		if (!this.item?.Id || !cam?.Id || !this.pageConfig.canEdit || this.togglingCamera) return;
		const enabled = !!(ev as any)?.detail?.checked;
		if (enabled === this.processingOn(cam)) return;
		this.togglingCamera = true;
		const prev = cam.ProcessingEnabled;
		cam.ProcessingEnabled = enabled;
		try {
			const saved: any = await firstValueFrom(this.vmsApi.setEdgeCameraProcess(this.item.Id, cam.Id, enabled));
			this.item = saved;
			this.loadedData();
			this.env.showMessage(enabled ? 'Camera processing on' : 'Camera processing off', 'success');
		} catch (e: any) {
			cam.ProcessingEnabled = prev;
			this.env.showMessage(e?.message || e?.error?.Message || 'Cannot update', 'danger');
		} finally {
			this.togglingCamera = false;
		}
	}

	inUse() {
		return this.item && !this.item.IsDisabled;
	}

	isOnline() {
		return isEdgeOnline(this.item);
	}

	async toggleInUse() {
		if (!this.item?.Id || !this.pageConfig.canEdit) return;
		const next = !this.inUse();
		try {
			await firstValueFrom(this.vmsApi.setEdgeInUse(this.item.Id, next));
			this.item.IsDisabled = !next;
			this.env.showMessage(next ? 'Enrolled' : 'Disabled', 'success');
		} catch (e: any) {
			this.env.showMessage(e?.message || 'Cannot update', 'danger');
		}
	}

	async refreshPersons() {
		if (!this.item?.Id || !this.pageConfig.canEdit) return;
		try {
			await firstValueFrom(this.vmsApi.refreshEdgePersons(this.item.Id));
			this.env.showMessage('Refresh persons queued — Edge will clean & pull on next heartbeat.', 'success');
		} catch (e: any) {
			this.env.showMessage(e?.message || e?.error?.Message || 'Cannot queue refresh', 'danger');
		}
	}

	async saveChange() {
		if (this.saving || !this.item?.Id || this.pageConfig.canEdit === false) return;
		this.saving = true;
		const payload = {
			Id: this.item.Id,
			Name: this.formGroup.get('Name')?.value,
			Remark: this.formGroup.get('Remark')?.value,
			BranchIds: this.formGroup.get('BranchIds')?.value || [],
			RemoteConfig: this.formGroup.get('RemoteConfig')?.getRawValue(),
		};
		try {
			const saved: any = await firstValueFrom(this.vmsApi.saveEdgeNode(payload));
			this.item = saved;
			this.loadedData();
			this.env.showMessage('Edge remote config saved; node will pull on next config sync.', 'success');
		} catch (e: any) {
			this.env.showMessage(e?.message || e?.error?.Message || 'Cannot update', 'danger');
		} finally {
			this.saving = false;
		}
	}

	delete(publishEventCode = this.pageConfig.pageName) {
		if (!this.pageConfig.ShowDelete || !this.item?.Id) return;
		this.env
			.actionConfirm('delete', 1, this.item?.Name || this.item?.UUID, this.pageConfig.pageTitle, async () => {
				await firstValueFrom(this.vmsApi.deleteEdgeNode(this.item.Id));
			})
			.then(() => {
				this.env.showMessage('DELETE_RESULT_SUCCESS', 'success');
				this.goBack();
			})
			.catch((err: any) => {
				if (err != 'User abort action') this.env.showMessage('DELETE_RESULT_FAIL', 'danger');
			});
	}
}
