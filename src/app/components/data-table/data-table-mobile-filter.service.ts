import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MobileFilterClaim {
	inOverlay: boolean;
	area: number;
	open: () => void;
}

export interface MobileFilterRequest {
	/** compact: phone/card layout. modifier: Ctrl/Command+click on the desktop toolbar. */
	source: 'compact' | 'modifier';
	register: (claim: MobileFilterClaim) => void;
}

/**
 * Toolbar search asks; the visible list table claims and opens its sheet.
 * Compact layout claims on every search click. Desktop claims only for Ctrl/Command+click.
 * Tables that do not claim (custom filter headers) leave the toolbar on the old toggle.
 */
@Injectable({ providedIn: 'root' })
export class DataTableMobileFilterService {
	private readonly requests = new Subject<MobileFilterRequest>();
	readonly requests$ = this.requests.asObservable();

	readonly activeCount$ = new BehaviorSubject<number>(0);
	private countOwner: object | null = null;

	requestOpen(source: 'compact' | 'modifier' = 'compact'): boolean {
		const claims: MobileFilterClaim[] = [];
		this.requests.next({
			source,
			register: (claim) => claims.push(claim),
		});
		const winner = [...claims].sort((a, b) => {
			const ao = a.inOverlay ? 1 : 0;
			const bo = b.inOverlay ? 1 : 0;
			if (ao !== bo) {
				return ao - bo;
			}
			return b.area - a.area;
		})[0];
		if (!winner) {
			return false;
		}
		winner.open();
		return true;
	}

	publishActiveCount(owner: object, count: number) {
		this.countOwner = owner;
		this.activeCount$.next(count);
	}

	releaseActiveCount(owner: object) {
		if (this.countOwner === owner) {
			this.countOwner = null;
			this.activeCount$.next(0);
		}
	}
}
