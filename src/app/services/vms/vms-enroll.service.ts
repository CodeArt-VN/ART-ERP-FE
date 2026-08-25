import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { personFromContact } from 'src/app/pages/VMS/person/vms-person.util';
import { VmsApiService } from './vms-api.service';
import { buildEnrollImageFormData, mapAssignEventResponse } from './vms-enroll.util';

export { buildEnrollImageFormData, mapAssignEventResponse } from './vms-enroll.util';

@Injectable({ providedIn: 'root' })
export class VmsEnrollService {
	constructor(private vmsApi: VmsApiService) {}

	/**
	 * Assign/merge via HQ Assign API only (1 request per event).
	 * BE AssignFromEvent already Upserts, remaps events, merges FaceVector/photos, AutoEnrolls.
	 */
	async assignFace(opts: {
		eventId: string;
		eventNumericId?: number;
		framePath?: string;
		personId?: string;
		contact: any;
	}): Promise<{ personId: string; displayName: string; id?: number; merged?: boolean; edgeError?: string; enrolled?: number }> {
		const mapped = personFromContact(opts.contact);
		const { personType, displayName, idContact, idStaff } = mapped;

		const assigned: any = await firstValueFrom(
			this.vmsApi.assignEvent(opts.eventId, {
				id_staff: idStaff || undefined,
				id_contact: idContact || undefined,
				person_type: personType,
			})
		);

		const rs = mapAssignEventResponse(assigned, displayName, String(opts.personId || '').trim());
		if (!rs.personId) {
			throw new Error('Assign did not return PersonId');
		}
		return rs;
	}

	/** Upload to HQ album; HQ proxies Edge enroll + MergeEmbedding (1 upload request). */
	async enrollImage(opts: {
		file: File | Blob;
		fileName?: string;
		personNumericId: number;
		personId: string;
		personType?: string;
		displayName?: string;
		employeeCode?: string;
		idStaff?: number;
		idContact?: number;
	}): Promise<{ personId: string; framePath?: string; edgeError?: string; dim?: number; enrolled?: boolean }> {
		const personId = String(opts.personId || '').trim();
		if (!personId) throw new Error('personId required');
		if (!opts.personNumericId) throw new Error('personNumericId required');
		if (!opts.file) throw new Error('file required');

		const uploaded: any = await firstValueFrom(
			this.vmsApi.uploadPersonPhoto(opts.personNumericId, opts.file, opts.fileName || (opts.file as File).name || 'face.jpg')
		);
		const framePath = String(uploaded?.framePath || uploaded?.FramePath || '').trim();
		const enrolled = uploaded?.enrolled === true;
		const dim = uploaded?.dim == null ? undefined : Number(uploaded.dim);
		const edgeError = enrolled ? undefined : String(uploaded?.edgeError || uploaded?.EdgeError || '').trim() || undefined;
		return { personId, framePath: framePath || undefined, edgeError, dim, enrolled };
	}

	async learnFromAlbum(personNumericId: number, take = 8): Promise<{ enrolled: number; photos: number; edgeError?: string }> {
		const rs: any = await firstValueFrom(this.vmsApi.learnPersonPhotos(personNumericId, take));
		const enrolled = Number(rs?.enrolled ?? 0) || 0;
		const photos = Number(rs?.photos ?? 0) || 0;
		const errors = Array.isArray(rs?.errors) ? rs.errors : [];
		const edgeError = enrolled < photos && errors.length ? String(errors[0]?.error || 'Edge enroll failed') : undefined;
		return { enrolled, photos, edgeError };
	}
}
