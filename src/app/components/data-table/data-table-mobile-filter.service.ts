import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface MobileFilterClaim {
	inOverlay: boolean;
	area: number;
	open: () => void;
}

export interface MobileFilterRequest {
	/** click: plain toolbar click. modifier: Ctrl/Command+click, which always asks for the popup. */
	source: 'click' | 'modifier';
	register: (claim: MobileFilterClaim) => void;
}

/**
 * Toolbar search asks; the visible list table claims and opens its sheet.
 * A plain click is claimed on compact layouts or by a table with IsShowFilterPopup.
 * Ctrl/Command+click is claimed by any visible table that has filter columns.
 * Tables that do not claim (custom filter headers) leave the toolbar on the old toggle.
 */
@Injectable({ providedIn: 'root' })
export class DataTableMobileFilterService {
	private readonly requests = new Subject<MobileFilterRequest>();
	readonly requests$ = this.requests.asObservable();

	readonly activeCount$ = new BehaviorSubject<number>(0);
	private countOwner: object | null = null;

	requestOpen(source: 'click' | 'modifier' = 'click'): boolean {
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
