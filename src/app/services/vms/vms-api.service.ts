import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../core/common.service';
import { EnvService } from '../core/env.service';
import { ApiSetting } from '../static/api-setting';

/** Custom VMS actions only (not GenCode CRUD — use providers in services.service.ts). */
@Injectable({ providedIn: 'root' })
export class VmsApiService {
	constructor(
		public commonService: CommonService,
		public env: EnvService
	) {}

	private get(url: string, data: any = null): Observable<any> {
		return this.commonService.connect('GET', url, data || {}) as Observable<any>;
	}

	private post(url: string, data: any = null): Observable<any> {
		return this.commonService.connect('POST', url, data) as Observable<any>;
	}

	deleteNvr(id: number): Observable<any> {
		return this.post(`VMS/Nvr/${id}/Delete`, {});
	}
	getNvrPassword(id: number): Observable<any> {
		return this.get(`VMS/Nvr/${id}/Password`, null);
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
	cameraSnapshotUrl(idCamera: number): string {
		return ApiSetting.apiDomain(`VMS/Camera/${idCamera}/Snapshot`);
	}
	cameraMjpegUrl(idCamera: number, subtype = 1): string {
		return ApiSetting.apiDomain(`VMS/Camera/${idCamera}/Mjpeg?subtype=${subtype}`);
	}
	liveAuthHeaders(): Record<string, string> {
		return {
			Authorization: this.commonService.getToken(),
			'App-Version': environment.appVersion,
		};
	}
	getCameraSnapshot(idCamera: number): Observable<Blob> {
		return this.commonService.http.get(this.cameraSnapshotUrl(idCamera), {
			headers: new HttpHeaders({
				Authorization: this.commonService.getToken(),
				'App-Version': environment.appVersion,
			}),
			responseType: 'blob',
		});
	}
	setPermission(item: any): Observable<any> {
		return this.post('VMS/Camera/Permission', item);
	}
	assignEvent(eventId: string, body: { id_staff?: number; id_contact?: number; person_type?: string }): Observable<any> {
		return this.post(`VMS/Events/${eventId}/Assign`, body);
	}
	unassignEvent(eventId: string): Observable<any> {
		return this.post(`VMS/Events/${eventId}/Unassign`, {});
	}
	unassignPerson(personIds: string[]): Observable<any> {
		const ids = (personIds || []).map((id) => String(id || '').trim()).filter(Boolean);
		if (!ids.length) return of({ ok: true, people: 0, events_unlinked: 0 });
		return this.post('VMS/Person/Unassign', { person_ids: ids, IgnoredBranch: true });
	}
	setEdgeInUse(id: number, inUse: boolean): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/InUse`, { inUse });
	}
	refreshEdgePersons(id: number): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/RefreshPersons`, {});
	}
	deleteEdgeNode(id: number): Observable<any> {
		return this.post(`VMS/EdgeNodes/${id}/Delete`, {});
	}
	saveEdgeNode(item: any): Observable<any> {
		return this.post('VMS/EdgeNodes', item);
	}
	setEdgeCameraProcess(nodeId: number, cameraId: number, enabled: boolean): Observable<any> {
		return this.post(`VMS/EdgeNodes/${nodeId}/Cameras/${cameraId}/Process`, { enabled });
	}
	listPersonPhotos(id: number): Observable<any> {
		return this.get(`VMS/Person/${id}/Photos`);
	}
	uploadPersonPhoto(id: number, file: File | Blob, fileName = 'face.jpg'): Observable<any> {
		const fd = new FormData();
		fd.append('image', file, fileName);
		return this.commonService.connect('UPLOAD', `VMS/Person/${id}/Photos/Upload`, fd) as Observable<any>;
	}
	createPersonFromPhoto(file: File | Blob, fileName = 'face.jpg', extra?: { id_contact?: number; id_staff?: number; person_type?: string }): Observable<any> {
		const fd = new FormData();
		fd.append('file', file, fileName);
		if (extra?.id_contact) fd.append('id_contact', String(extra.id_contact));
		if (extra?.id_staff) fd.append('id_staff', String(extra.id_staff));
		if (extra?.person_type) fd.append('person_type', extra.person_type);
		return this.commonService.connect('UPLOAD', 'VMS/Person/CreateFromPhoto', fd) as Observable<any>;
	}
	bulkCreateFromPhotos(files: Array<File | Blob>, fileNames?: string[]): Observable<any> {
		const fd = new FormData();
		(files || []).forEach((f, i) => {
			const name = fileNames?.[i] || (f as File).name || `face-${i}.jpg`;
			fd.append('file', f, name);
		});
		return this.commonService.connect('UPLOAD', 'VMS/Person/BulkCreateFromPhotos', fd) as Observable<any>;
	}
	learnPersonPhotos(id: number, take = 8): Observable<any> {
		return this.post(`VMS/Person/${id}/Photos/Learn?Take=${encodeURIComponent(String(take))}`, {});
	}
	deletePersonPhoto(id: number, photoId: number): Observable<any> {
		return this.post(`VMS/Person/${id}/Photos/${photoId}/Delete`, {});
	}
	setPersonPrimaryPhoto(id: number, photoId: number): Observable<any> {
		return this.post(`VMS/Person/${id}/Photos/${photoId}/SetPrimary`, {});
	}
	listPersonVisits(id: number, skip = 0, take = 50): Observable<any> {
		return this.get(`VMS/Person/${id}/Visits`, { Skip: skip, Take: take });
	}
	listPersonEvents(id: number, skip = 0, take = 50): Observable<any> {
		return this.get(`VMS/Person/${id}/Events`, { Skip: skip, Take: take });
	}
	upsertPerson(item: any): Observable<any> {
		return this.post('VMS/Person', item);
	}
	disablePerson(personId: string): Observable<any> {
		return this.post(`VMS/Person/${encodeURIComponent(personId)}/Disable`, {});
	}
	enablePerson(personId: string): Observable<any> {
		return this.post(`VMS/Person/${encodeURIComponent(personId)}/Enable`, {});
	}
	deletePerson(body: { person_ids?: string[]; event_ids?: string[] }): Observable<any> {
		return this.post('VMS/Person/Delete', { ...(body || {}), IgnoredBranch: true });
	}
}
