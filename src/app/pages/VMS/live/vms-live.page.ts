import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, ModalController, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { PageBase } from 'src/app/page-base';
import { EnvService } from 'src/app/services/core/env.service';
import { firstValueFrom } from 'rxjs';
import { VmsApiService } from 'src/app/services/vms/vms-api.service';
import { VMS_CameraProvider, VMS_EdgeNodeProvider, VMS_EventProvider, VMS_NvrDeviceProvider } from 'src/app/services/static/services.service';
import { isLiveCameraSwitch, isStaleLiveSnapshot, liveSnapshotErrorMessage, playMjpegStream, shouldFallbackToSnapshot } from './vms-live.util';

type LiveCameraVm = {
	Id: number;
	Name: string;
	Code: string;
	ChannelNo: number | null;
	IDNvr: number | null;
	NvrName: string;
	NvrHost: string;
	NvrPort: number;
	BranchName: string;
	Role: string;
	AiEnabled: boolean;
	SnapshotApiUrl: string;
};

@Component({
	selector: 'app-vms-live',
	templateUrl: 'vms-live.page.html',
	styleUrls: ['vms-live.page.scss'],
	standalone: false,
})
export class VmsLivePage extends PageBase {
	edgeNodes: any[] = [];
	selectedEdge: any = null;
	selectedEdgeId: number = 0;
	cameras: LiveCameraVm[] = [];
	allCameras: LiveCameraVm[] = [];
	selectedCamera: LiveCameraVm | null = null;
	liveImageUrl: string | null = null;
	liveError = '';
	liveLoading = false;
	liveStreaming = false;
	liveSubtype = 1;
	private snapshotTimer: any = null;
	private edgePollTimer: any = null;
	private snapshotSeq = 0;
	private inFlightCameraId: number | null = null;
	private liveAbort: AbortController | null = null;
	private prevImageUrl: string | null = null;

	constructor(
		public pageProvider: VMS_CameraProvider,
		public eventProvider: VMS_EventProvider,
		public nvrProvider: VMS_NvrDeviceProvider,
		public edgeNodeProvider: VMS_EdgeNodeProvider,
		public vmsApi: VmsApiService,
		public modalController: ModalController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public loadingController: LoadingController,
		public env: EnvService,
		public navCtrl: NavController,
		public location: Location,
		public cdr: ChangeDetectorRef,
		private zone: NgZone
	) {
		super();
		this.pageConfig.canAdd = false;
		this.pageConfig.canDelete = false;
	}

	preLoadData(event?: any): void {
		this.pageConfig.pageIcon = 'play-circle-outline';
		super.preLoadData(event);
	}

	loadData(event = null, forceReload = false) {
		this.pageConfig.showSpinner = true;
		const q = {};
		Promise.all([
			this.pageProvider.read(q, true),
			this.nvrProvider.read(q, true),
			this.edgeNodeProvider.read(q, true),
		])
			.then(([cams, nvrs, edges]: any[]) => {
				this.allCameras = this.buildLiveCameras(cams?.data || [], nvrs?.data || []);
				this.edgeNodes = edges?.data || [];
				// Default "All" (id=0)
				if (this.selectedEdgeId === 0) {
					this.selectedEdge = null;
				}
				this.applyCameraFilter();
				this.startEdgePolling();
				this.loadedData(event);
			})
			.catch(() => this.loadedData(event));
	}

	selectEdge(edgeId: number) {
		this.selectedEdgeId = edgeId;
		if (edgeId === 0) {
			this.selectedEdge = null;
		} else {
			this.selectedEdge = this.edgeNodes.find((e) => e.Id === edgeId) || null;
		}
		this.applyCameraFilter();
	}

	isEdgeOnline(edge: any): boolean {
		if (!edge?.LastHeartbeat) return false;
		const diff = Date.now() - new Date(edge.LastHeartbeat).getTime();
		return diff < 120_000;
	}

	private applyCameraFilter() {
		if (!this.selectedEdge) {
			this.cameras = this.allCameras;
		} else {
			const branchIds = Array.isArray(this.selectedEdge?.BranchIds)
				? this.selectedEdge.BranchIds.map((x: any) => Number(x)).filter((n: number) => n > 0)
				: [];
			this.cameras = branchIds.length
				? this.allCameras.filter((c: any) => branchIds.includes(Number(c.IDBranch)) || !c.IDBranch)
				: this.allCameras;
		}
		this.items = this.cameras;
		this.ensureSelectedCamera();
	}

	private buildLiveCameras(cameras: any[], nvrs: any[]): LiveCameraVm[] {
		const nvrMap = new Map<number, any>((nvrs || []).map((n) => [n.Id, n]));
		return (cameras || []).map((cam) => {
			const nvr = nvrMap.get(cam.IDNvr);
			const host = this.normalizeHost(nvr?.Host || nvr?.HostWan || '');
			const port = Number(nvr?.Port) > 0 ? Number(nvr.Port) : 80;
			const channelNo = Number.isFinite(Number(cam.ChannelNo)) ? Number(cam.ChannelNo) : null;
			return {
				...cam,
				Id: cam.Id,
				Name: cam.Name,
				Code: cam.Code,
				ChannelNo: channelNo,
				IDNvr: cam.IDNvr ?? null,
				NvrName: nvr?.Name || 'NVR',
				NvrHost: host,
				NvrPort: port,
				BranchName: this.branchNameOf(cam.IDBranch),
				Role: cam.Role || 'BOTH',
				AiEnabled: !!cam.AiEnabled,
				SnapshotApiUrl: this.vmsApi.cameraSnapshotUrl(cam.Id),
			} as LiveCameraVm;
		});
	}

	private branchNameOf(idBranch: number | null | undefined): string {
		const branch = (this.env.branchList || []).find((x) => x.Id == idBranch);
		return branch ? branch.Name || branch.Code : idBranch ? '#' + idBranch : '—';
	}

	private normalizeHost(raw: string): string {
		return String(raw || '')
			.replace(/^https?:\/\//i, '')
			.replace(/\/+$/, '')
			.trim();
	}

	selectCamera(camera: LiveCameraVm) {
		if (!isLiveCameraSwitch(this.selectedCamera?.Id, camera.Id)) return;
		this.beginLiveSwitch();
		this.selectedCamera = camera;
		this.startLiveStream();
	}

	setLiveSubtype(subtype: number) {
		const next = subtype === 0 ? 0 : 1;
		if (this.liveSubtype === next) return;
		this.liveSubtype = next;
		this.beginLiveSwitch();
		if (this.selectedCamera) this.startLiveStream();
	}

	onLiveFrameLoaded() {
		if (this.prevImageUrl) {
			URL.revokeObjectURL(this.prevImageUrl);
			this.prevImageUrl = null;
		}
	}

	private startLiveStream() {
		if (this.snapshotTimer) {
			clearInterval(this.snapshotTimer);
			this.snapshotTimer = null;
		}
		this.stopStreamOnly();
		const camera = this.selectedCamera;
		if (!camera?.Id) return;
		this.liveAbort = new AbortController();
		const seq = this.snapshotSeq;
		const cameraId = camera.Id;
		if (!this.liveImageUrl) this.liveLoading = true;
		playMjpegStream({
			url: this.vmsApi.cameraMjpegUrl(cameraId, this.liveSubtype),
			headers: this.vmsApi.liveAuthHeaders(),
			signal: this.liveAbort.signal,
			onFrame: (blobUrl) => {
				this.zone.run(() => {
					if (seq !== this.snapshotSeq || this.selectedCamera?.Id !== cameraId) {
						URL.revokeObjectURL(blobUrl);
						return;
					}
					this.replaceLiveImage(blobUrl);
					this.liveStreaming = true;
					this.liveLoading = false;
					this.liveError = '';
					this.cdr?.detectChanges();
				});
			},
			onFatal: (err) => {
				this.zone.run(() => {
					if (seq !== this.snapshotSeq || this.selectedCamera?.Id !== cameraId) return;
					this.liveStreaming = false;
					const status = Number(err?.status);
					if (shouldFallbackToSnapshot(status)) {
						this.startSnapshotLoop();
						return;
					}
					this.liveError = liveSnapshotErrorMessage(err);
					this.liveLoading = false;
					this.cdr?.detectChanges();
				});
			},
		});
	}

	private startSnapshotLoop() {
		if (this.snapshotTimer) clearInterval(this.snapshotTimer);
		this.refreshSnapshot();
		this.snapshotTimer = setInterval(() => this.refreshSnapshot(), 400);
	}

	private async refreshSnapshot() {
		const cameraId = this.selectedCamera?.Id;
		if (!cameraId) return;
		if (this.inFlightCameraId === cameraId) return;
		const seq = this.snapshotSeq;
		this.inFlightCameraId = cameraId;
		if (!this.liveImageUrl) this.liveLoading = true;
		try {
			const blob = await firstValueFrom(this.vmsApi.getCameraSnapshot(cameraId));
			if (isStaleLiveSnapshot(seq, this.snapshotSeq, cameraId, this.selectedCamera?.Id)) return;
			this.replaceLiveImage(URL.createObjectURL(blob));
			this.liveStreaming = true;
			this.liveError = '';
			this.cdr?.detectChanges();
		} catch (err: any) {
			if (isStaleLiveSnapshot(seq, this.snapshotSeq, cameraId, this.selectedCamera?.Id)) return;
			this.liveError = liveSnapshotErrorMessage(err);
		} finally {
			if (this.inFlightCameraId === cameraId) this.inFlightCameraId = null;
			if (seq === this.snapshotSeq) this.liveLoading = false;
		}
	}

	private replaceLiveImage(nextUrl: string) {
		this.prevImageUrl = this.liveImageUrl;
		this.liveImageUrl = nextUrl;
	}

	private stopStreamOnly() {
		this.liveAbort?.abort();
		this.liveAbort = null;
		this.liveStreaming = false;
	}

	private stopLive() {
		this.stopStreamOnly();
		if (this.snapshotTimer) {
			clearInterval(this.snapshotTimer);
			this.snapshotTimer = null;
		}
		if (this.prevImageUrl) {
			URL.revokeObjectURL(this.prevImageUrl);
			this.prevImageUrl = null;
		}
		if (this.liveImageUrl) {
			URL.revokeObjectURL(this.liveImageUrl);
			this.liveImageUrl = null;
		}
	}

	private beginLiveSwitch() {
		this.snapshotSeq++;
		this.inFlightCameraId = null;
		this.stopLive();
		this.liveLoading = true;
		this.liveError = '';
		this.cdr?.detectChanges();
	}

	private ensureSelectedCamera() {
		if (!this.cameras.length) {
			this.snapshotSeq++;
			this.selectedCamera = null;
			this.stopLive();
			this.liveError = '';
			this.liveLoading = false;
			this.inFlightCameraId = null;
			return;
		}
		const currentId = this.selectedCamera?.Id;
		if (!this.cameras.find((x) => x.Id === currentId)) {
			this.selectCamera(this.cameras[0]);
		}
	}

	private startEdgePolling() {
		if (this.edgePollTimer) clearInterval(this.edgePollTimer);
		this.edgePollTimer = setInterval(() => this.refreshEdgeStats(), 15_000);
	}

	private async refreshEdgeStats() {
		try {
			const edges: any = await this.edgeNodeProvider.read({}, true);
			const list = edges?.data || [];
			this.edgeNodes = list;
			const fresh = list.find((e: any) => e.Id === this.selectedEdge?.Id);
			if (fresh) this.selectedEdge = fresh;
			else if (this.selectedEdgeId !== 0) {
				this.selectedEdgeId = 0;
				this.selectedEdge = null;
				this.applyCameraFilter();
			}
		} catch {
			/* silent */
		}
	}

	override ngOnDestroy() {
		if (this.edgePollTimer) clearInterval(this.edgePollTimer);
		this.snapshotSeq++;
		this.stopLive();
		super.ngOnDestroy();
	}
}
