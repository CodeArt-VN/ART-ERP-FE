import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
	selector: 'app-history-log-json-modal',
	template: `
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ 'Log detail' | translate }}</ion-title>
				<ion-buttons slot="end">
					<ion-button
						fill="clear"
						(click)="showRaw = !showRaw"
						[title]="(showRaw ? 'Tree view' : 'Raw JSON') | translate"
					>
						<ion-icon
							slot="icon-only"
							[name]="showRaw ? 'reorder-four-outline' : 'code-slash-outline'"
						></ion-icon>
					</ion-button>
					<ion-button (click)="dismiss()" title="{{ 'Close' | translate }}">
						<ion-icon slot="icon-only" name="close"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<div class="log-meta" *ngIf="metaForm">
				<app-form-control
					[inline]="true"
					[field]="{ id: 'LoggedBy', label: 'Logged by', type: 'text', form: metaForm }"
				></app-form-control>
				<app-form-control
					[inline]="true"
					[field]="{ id: 'Date', label: 'Date', type: 'text', form: metaForm }"
				></app-form-control>
			</div>
			<app-json-viewer
				*ngIf="!showRaw && item != null"
				[item]="item"
				[isCompare]="false"
				[isShowDifference]="false"
			>
			</app-json-viewer>
			<pre *ngIf="showRaw" class="json-raw">{{ rawJson }}</pre>
		</ion-content>
	`,
	styles: [
		`
			.log-meta {
				margin-bottom: 12px;
			}
			.json-raw {
				margin: 0;
				padding: 12px;
				font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
				font-size: 12px;
				line-height: 1.45;
				white-space: pre-wrap;
				word-break: break-word;
				background: var(--ion-color-light);
				border-radius: 8px;
			}
		`,
	],
	standalone: false,
})
export class HistoryLogJsonModalComponent implements OnInit {
	@Input() item: any;
	@Input() loggedBy = '';
	@Input() loggedAt = '';
	showRaw = false;
	metaForm: FormGroup;

	constructor(
		private modalCtrl: ModalController,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.metaForm = this.formBuilder.group({
			LoggedBy: [{ value: this.loggedBy || '—', disabled: true }],
			Date: [{ value: this.loggedAt || '—', disabled: true }],
		});
	}

	get rawJson(): string {
		try {
			return JSON.stringify(this.item ?? {}, null, 2);
		} catch {
			return String(this.item ?? '');
		}
	}

	dismiss() {
		this.modalCtrl.dismiss();
	}
}

@Component({
	selector: 'app-history-log-popover',
	template: `
		<ion-list [inset]="false">
			<ion-item
				button
				[detail]="false"
				*ngFor="let entry of displayItems; let i = index"
				[class.is-active]="displayIndexToNewestFirst(i) === selectedIndex"
				[attr.aria-current]="displayIndexToNewestFirst(i) === selectedIndex ? 'true' : null"
				(click)="pick(i)"
			>
				<ion-icon
					slot="start"
					[name]="actionIcon(entry)"
					[color]="actionColor(entry)"
					[title]="(entry._label || entry.Method || '') | translate"
				></ion-icon>
				<ion-label class="ion-text-wrap">
					<h4>{{ entry.LoggedBy || '—' }}</h4>
					<p class="action-line" *ngIf="entry._label">{{ entry._label | translate }}
					<small class="time-line">{{ formatTime(entry) }}</small>
					</p>
				</ion-label>
				<ion-button
					slot="end"
					fill="clear"
					size="small"
					title="{{ 'HISTORY_VIEW_JSON' | translate }}"
					(click)="viewJson($event, entry)"
				>
					<ion-icon slot="icon-only" name="code-slash-outline"></ion-icon>
				</ion-button>
			</ion-item>
		</ion-list>
	`,
	styles: [
		`
			:host {
				display: block;
				min-width: 300px;
				max-width: 400px;
				max-height: 70vh;
				overflow: auto;
			}
		
			ion-item.is-active {
				--background: rgba(var(--ion-color-primary-rgb), 0.14);
				--color: var(--ion-color-primary);
				--border-color: rgba(var(--ion-color-primary-rgb), 0.35);
			}
			ion-item.is-active h2,
			ion-item.is-active p {
				color: inherit;
			}
		`,
	],
	standalone: false,
})
export class HistoryLogPopoverComponent {
	/** Newest-first (same order as page.historyItems). */
	@Input() items: any[] = [];
	/** Newest-first selected index. */
	@Input() selectedIndex = 0;
	/** Keep popover open — parent applies snapshot without dismiss. */
	@Input() onSelect: (index: number) => void;

	constructor(
		private popoverCtrl: PopoverController,
		private modalCtrl: ModalController
	) {}

	/** Oldest-first for display: #1 at top. */
	get displayItems(): any[] {
		return [...(this.items || [])].reverse();
	}

	displayIndexToNewestFirst(displayIndex: number): number {
		return (this.items?.length || 0) - 1 - displayIndex;
	}

	/** Match toolbar / event button icons. */
	private resolveActionVisual(entry: any): { icon: string; color: string } {
		const action = String(entry?._action || entry?.Segment5 || '').toLowerCase();
		const badge = String(entry?._badge || '').toLowerCase();
		const method = String(entry?.Method || '').toUpperCase();

		// Named API actions — same icons/colors as toolbar event buttons
		if (/disapprove|reject/.test(action)) return { icon: 'thumbs-down-outline', color: 'warning' };
		if (/approve/.test(action)) return { icon: 'thumbs-up-outline', color: 'success' };
		if (/submitorders|submit.?order/.test(action)) return { icon: 'cart-outline', color: 'success' };
		if (/submit/.test(action)) return { icon: 'send-outline', color: 'success' };
		if (/cancel/.test(action)) return { icon: 'ban-outline', color: 'danger' };
		if (/merge/.test(action)) return { icon: 'git-pull-request', color: 'warning' };
		if (/split/.test(action)) return { icon: 'git-branch', color: 'warning' };
		if (/changebranch|change.?branch/.test(action)) return { icon: 'sitemap', color: 'warning' };
		if (/copy/.test(action)) return { icon: 'copy-outline', color: 'medium' };
		if (/reopen|unarchive/.test(action)) return { icon: 'arrow-undo', color: 'warning' };
		if (/archive/.test(action)) return { icon: 'archive', color: 'warning' };
		if (/importdetail|import/.test(action) || badge === 'import') return { icon: 'cloud-upload-outline', color: 'warning' };
		if (/export/.test(action)) return { icon: 'cloud-download-outline', color: 'warning' };

		// CRUD — match Add / Delete / edit icons on toolbar
		if (badge === 'create' || (method === 'POST' && badge !== 'action')) return { icon: 'add-outline', color: 'success' };
		if (badge === 'delete' || method === 'DELETE') return { icon: 'trash-outline', color: 'danger' };
		if (badge === 'update' || method === 'PUT') return { icon: 'create-outline', color: 'primary' };

		return { icon: 'ellipse-outline', color: 'medium' };
	}

	actionIcon(entry: any): string {
		return this.resolveActionVisual(entry).icon;
	}

	actionColor(entry: any): string {
		return this.resolveActionVisual(entry).color;
	}

	formatTime(entry: any): string {
		const t = entry?._time ? new Date(entry._time) : entry?.Date ? new Date(entry.Date) : null;
		if (!t || isNaN(t.getTime())) return '—';
		const dd = String(t.getDate()).padStart(2, '0');
		const mm = String(t.getMonth() + 1).padStart(2, '0');
		const yyyy = t.getFullYear();
		const hh = String(t.getHours()).padStart(2, '0');
		const mi = String(t.getMinutes()).padStart(2, '0');
		const ss = String(t.getSeconds()).padStart(2, '0');
		return `${dd}/${mm}/${yyyy} ${hh}:${mi}:${ss}`;
	}

	pick(displayIndex: number) {
		const index = this.displayIndexToNewestFirst(displayIndex);
		this.selectedIndex = index;
		if (typeof this.onSelect === 'function') {
			this.onSelect(index);
			return;
		}
		this.popoverCtrl.dismiss({ index });
	}

	async viewJson(ev: Event, entry: any) {
		ev?.stopPropagation?.();
		ev?.preventDefault?.();

		const payload = entry?._data ?? entry?.Data ?? entry;
		let item: any = payload;
		if (typeof payload === 'string') {
			try {
				item = JSON.parse(payload);
			} catch {
				item = { Data: payload };
			}
		}
		if (item == null) item = {};

		const modal = await this.modalCtrl.create({
			component: HistoryLogJsonModalComponent,
			componentProps: {
				item,
				loggedBy: entry?.LoggedBy || '—',
				loggedAt: this.formatTime(entry),
			},
			cssClass: 'modal90vh',
		});
		await modal.present();
	}
}
