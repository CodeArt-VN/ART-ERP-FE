import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class GoogleAdminSyncService {
	private readonly baseUrl = 'https://admin.googleapis.com/admin/directory/v1';
	private token = '';

	constructor(private http: HttpClient) {}

	setAccessToken(token: string) {
		this.token = token || '';
	}

	testConnection(domain: string) {
		return this.listUsers({ domain, maxResults: 1 })
			.then(() => true)
			.catch(() => false);
	}

	listUsers(opts: {
		domain?: string;
		customer?: string;
		maxResults?: number;
		pageToken?: string;
		orderBy?: 'email' | 'familyName' | 'givenName';
		sortOrder?: 'ASCENDING' | 'DESCENDING';
		projection?: 'BASIC' | 'FULL' | 'CUSTOM';
		viewType?: 'admin_view' | 'domain_public';
		query?: string;
		customFieldMask?: string;
	} = {}) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		let params = new HttpParams();
		Object.entries(opts || {}).forEach(([k, v]) => {
			if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
		});
		return this.http.get<any>(`${this.baseUrl}/users`, { headers, params }).toPromise();
	}

	getUser(userKey: string, opts: { projection?: 'BASIC' | 'FULL' | 'CUSTOM'; viewType?: 'admin_view' | 'domain_public'; customFieldMask?: string } = {}) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		let params = new HttpParams();
		Object.entries(opts || {}).forEach(([k, v]) => {
			if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
		});
		return this.http.get<any>(`${this.baseUrl}/users/${encodeURIComponent(userKey)}`, { headers, params }).toPromise();
	}

	insertUser(body: {
		primaryEmail: string;
		name: { givenName: string; familyName: string };
		password?: string;
		orgUnitPath?: string;
		hashFunction?: string;
		changePasswordAtNextLogin?: boolean;
		[key: string]: any;
	}) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		return this.http.post<any>(`${this.baseUrl}/users`, body, { headers }).toPromise();
	}

	updateUser(userKey: string, body: { [key: string]: any }) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		return this.http.put<any>(`${this.baseUrl}/users/${encodeURIComponent(userKey)}`, body, { headers }).toPromise();
	}

	patchUser(userKey: string, body: { [key: string]: any }) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		return this.http.patch<any>(`${this.baseUrl}/users/${encodeURIComponent(userKey)}`, body, { headers }).toPromise();
	}

	deleteUser(userKey: string) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.token}`,
			'Content-Type': 'application/json',
		});
		return this.http.delete<any>(`${this.baseUrl}/users/${encodeURIComponent(userKey)}`, { headers }).toPromise();
	}
}