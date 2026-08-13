import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';

@Injectable({ providedIn: 'root' })
export class VmsApiService {
	constructor(
		public commonService: CommonService,
		public env: EnvService
	) {}

	private branchQuery(extra: any = {}) {
		const IDBranch = this.env.selectedBranch;
		return { IDBranch, ...extra };
	}

	private get(url: string, data: any = null): Observable<any> {
		return this.commonService.connect('GET', url, data) as Observable<any>;
	}

	private post(url: string, data: any = null): Observable<any> {
		return this.commonService.connect('POST', url, data) as Observable<any>;
	}

	listNvr(): Observable<any> {
		return this.get('VMS/Nvr', this.branchQuery());
	}
	saveNvr(item: any): Observable<any> {
		return this.post('VMS/Nvr', item);
	}
	deleteNvr(id: number): Observable<any> {
		return this.post(`VMS/Nvr/${id}/Delete`, {});
	}
	getNvrPassword(id: number): Observable<any> {
		return this.get(`VMS/Nvr/${id}/Password`, null);
	}
	listCamera(): Observable<any> {
		return this.get('VMS/Camera', this.branchQuery());
	}
	saveCamera(item: any): Observable<any> {
		return this.post('VMS/Camera', item);
	}
	importChannels(idNvr: number, channels: any[]): Observable<any> {
		return this.post(`VMS/Nvr/${idNvr}/ImportChannels`, channels);
	}
	listNvrCameras(idNvr: number): Observable<any> {
		return this.get(`VMS/Nvr/${idNvr}/Cameras`, null);
	}
	scanNvr(idNvr: number): Observable<any> {
		return this.post(`VMS/Nvr/${idNvr}/Scan`, {});
	}
	setCameraInUse(id: number, inUse: boolean): Observable<any> {
		return this.post(`VMS/Camera/${id}/InUse`, { inUse });
	}
	deleteCamera(id: number): Observable<any> {
		return this.post(`VMS/Camera/${id}/Delete`, {});
	}
	listPermissions(idCamera: number): Observable<any> {
		return this.get(`VMS/Camera/${idCamera}/Permissions`, null);
	}
	setPermission(item: any): Observable<any> {
		return this.post('VMS/Camera/Permission', item);
	}
	listEvents(eventType?: string): Observable<any> {
		return this.get('VMS/Events', this.branchQuery({ eventType }));
	}
	reviewEvent(eventId: string, approve: boolean): Observable<any> {
		return this.post(`VMS/Events/${eventId}/Review`, { approve });
	}
	listEdgeNodes(): Observable<any> {
		return this.get('VMS/EdgeNodes', this.branchQuery());
	}
	approveEdgeNode(id: number): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/Approve`, {});
	}
	setEdgeInUse(id: number, inUse: boolean): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/InUse`, { inUse });
	}
	deleteEdgeNode(id: number): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/Delete`, {});
	}
	listGallery(personType?: string): Observable<any> {
		return this.get('VMS/Gallery', { personType });
	}
	upsertGallery(item: any): Observable<any> {
		return this.post('VMS/Gallery', item);
	}
	disableGallery(personId: string): Observable<any> {
		return this.post(`VMS/Gallery/${personId}/Disable`, {});
	}
	guestVisits(): Observable<any> {
		return this.get('VMS/GuestVisits', this.branchQuery());
	}
}
