import { Injectable } from '@angular/core';
import { CommonService } from '../core/common.service';
import { providerService } from '../core/extend-service';

/** Avoid selectedBranchAndChildren URL explosion (400+ ids → status 0). */
function withIgnoredBranch(query: any = null) {
	return Object.assign({}, query || {}, { IgnoredBranch: true });
}

function asListResult(data: any) {
	const rows = Array.isArray(data) ? data : data?.data || [];
	return { count: rows.length, data: rows };
}

/** Custom VMS helpers (NVR/Events/Gallery/Edge) — not GenCode table names. */
function vmsCustomApi(resource: string) {
	return {
		getList: { method: 'GET', url: () => `VMS/${resource}` },
		getItem: { method: 'GET', url: (id) => `VMS/${resource}/${id}` },
		postItem: { method: 'POST', url: () => `VMS/${resource}` },
		putItem: { method: 'POST', url: (_id?) => `VMS/${resource}` },
		delItem: { method: 'POST', url: (id) => `VMS/${resource}/${id}/Delete` },
	};
}

/** GenCode EF CRUD — matches api-list.ts VMS_* */
function vmsGenApi(resource: string) {
	return {
		getList: { method: 'GET', url: () => `VMS/${resource}` },
		getSearchList: { method: 'GET', url: () => `VMS/${resource}/Search` },
		getAnItem: { method: 'GET', url: (id) => `VMS/${resource}/` + id },
		getItem: { method: 'GET', url: (id) => `VMS/${resource}/` + id },
		putItem: { method: 'PUT', url: (id) => `VMS/${resource}/` + id },
		postItem: { method: 'POST', url: () => `VMS/${resource}` },
		disableItem: { method: 'PUT', url: (id) => `VMS/${resource}/Disable/` + id },
		enableItem: { method: 'PUT', url: (id) => `VMS/${resource}/Enable/` + id },
		deleteItem: { method: 'DELETE', url: (id) => `VMS/${resource}/` + id },
		delItem: { method: 'DELETE', url: (id) => `VMS/${resource}/` + id },
	};
}

@Injectable({ providedIn: 'root' })
export class VMS_CameraProvider extends providerService {
	constructor(public commonService: CommonService) {
		super();
		this.commonService = commonService;
		this.apiPath = vmsGenApi('Camera');
		this.serviceName = 'VMS_Camera';
		this.allowCache = false;
	}

	readServer(query: any = null) {
		const apiPath = this.apiPath.getList;
		return this.commonService
			.connect(apiPath.method, apiPath.url(), withIgnoredBranch(query))
			.toPromise()
			.then((data: any) => asListResult(data));
	}
}

@Injectable({ providedIn: 'root' })
export class VMS_NvrProvider extends providerService {
	constructor(public commonService: CommonService) {
		super();
		this.commonService = commonService;
		// Custom masked NVR API (GenCode table is NvrDevice)
		this.apiPath = vmsCustomApi('Nvr');
		this.serviceName = 'VMS_Nvr';
		this.allowCache = false;
	}

	readServer(query: any = null) {
		const apiPath = this.apiPath.getList;
		return this.commonService
			.connect(apiPath.method, apiPath.url(), withIgnoredBranch(query))
			.toPromise()
			.then((data: any) => asListResult(data));
	}
}

@Injectable({ providedIn: 'root' })
export class VMS_EdgeNodeProvider extends providerService {
	constructor(public commonService: CommonService) {
		super();
		this.commonService = commonService;
		this.apiPath = {
			getList: { method: 'GET', url: () => 'VMS/EdgeNodes' },
			getItem: { method: 'GET', url: (id) => `VMS/EdgeNodes/${id}` },
			postItem: { method: 'POST', url: () => 'VMS/EdgeNodes' },
			putItem: { method: 'POST', url: (_id?) => 'VMS/EdgeNodes' },
		};
		this.serviceName = 'VMS_EdgeNode';
		this.allowCache = false;
	}

	readServer(query: any = null) {
		const apiPath = this.apiPath.getList;
		return this.commonService
			.connect(apiPath.method, apiPath.url(), withIgnoredBranch(query))
			.toPromise()
			.then((data: any) => asListResult(data));
	}
}

@Injectable({ providedIn: 'root' })
export class VMS_EventProvider extends providerService {
	constructor(public commonService: CommonService) {
		super();
		this.commonService = commonService;
		this.apiPath = {
			getList: { method: 'GET', url: () => 'VMS/Events' },
			getItem: { method: 'GET', url: (id) => `VMS/Events/${id}` },
			postItem: { method: 'POST', url: () => 'VMS/Events' },
			putItem: { method: 'POST', url: (_id?) => 'VMS/Events' },
		};
		this.serviceName = 'VMS_Event';
		this.allowCache = false;
	}

	readServer(query: any = null) {
		const apiPath = this.apiPath.getList;
		return this.commonService
			.connect(apiPath.method, apiPath.url(), withIgnoredBranch(query))
			.toPromise()
			.then((data: any) => asListResult(data));
	}
}

@Injectable({ providedIn: 'root' })
export class VMS_GalleryProvider extends providerService {
	constructor(public commonService: CommonService) {
		super();
		this.commonService = commonService;
		this.apiPath = {
			getList: { method: 'GET', url: () => 'VMS/Gallery' },
			getItem: { method: 'GET', url: (id) => `VMS/Gallery/${id}` },
			postItem: { method: 'POST', url: () => 'VMS/Gallery' },
			putItem: { method: 'POST', url: (_id?) => 'VMS/Gallery' },
		};
		this.serviceName = 'VMS_Gallery';
		this.allowCache = false;
	}

	readServer(query: any = null) {
		const apiPath = this.apiPath.getList;
		return this.commonService
			.connect(apiPath.method, apiPath.url(), withIgnoredBranch(query))
			.toPromise()
			.then((data: any) => asListResult(data));
	}
}
