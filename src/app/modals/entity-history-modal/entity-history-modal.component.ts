import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EnvService } from 'src/app/services/core/env.service';
import { HistoryService } from 'src/app/services/custom/history.service';

@Component({
	selector: 'app-entity-history-modal',
	templateUrl: './entity-history-modal.component.html',
	styleUrls: ['./entity-history-modal.component.scss'],
	standalone: false,
})
export class EntityHistoryModalComponent implements OnInit {
	segment3: string;
	segment4: string;
	entityId: number | string;
	entityTitle: string;

	items: any[] = [];
	selected: any = null;
	diffRows: { field: string; label: string; before: string; after: string }[] = [];
	summaryLines: string[] = [];
	panelMode: 'diff' | 'summary' | 'empty' = 'empty';
	showSpinner = true;

	constructor(
		public modalController: ModalController,
		public historyService: HistoryService,
		public env: EnvService
	) {}

	ngOnInit(): void {
		this.load();
	}

	load() {
		this.showSpinner = true;
		this.historyService
			.loadHistory(this.segment3, this.segment4, this.entityId)
			.then((asc) => {
				asc.forEach((row, i) => {
					row._prevData = i > 0 ? asc[i - 1]._data : null;
				});
				this.items = this.historyService.toNewestFirst(asc);
				if (this.items.length) {
					this.select(this.items[0]);
				} else {
					this.selected = null;
					this.clearPanel();
				}
			})
			.catch((err) => {
				this.env.showMessage(err?.message || 'Cannot load history', 'danger');
			})
			.finally(() => {
				this.showSpinner = false;
			});
	}

	select(item: any) {
		this.selected = item;
		this.diffRows = [];
		this.summaryLines = [];
		this.panelMode = 'empty';

		const method = (item.Method || '').toUpperCase();
		const data = item._data;
		const prev = item._prevData;

		if (method === 'DELETE') {
			const ids = this.historyService.parseIdList(item._action || item.Segment5);
			this.summaryLines.push(
				ids.length ? `Removed ${ids.length} line(s): ${ids.join(', ')}` : 'Removed order line(s)'
			);
			this.panelMode = 'summary';
			return;
		}

		if (item._action && /ImportDetailFile/i.test(item._action)) {
			this.summaryLines.push('Imported product lines from Excel');
			const created = data?.CreatedIds?.length ?? 0;
			const updated = data?.UpdatedIds?.length ?? 0;
			if (created) this.summaryLines.push(`Added ${created} line(s)`);
			if (updated) this.summaryLines.push(`Updated ${updated} line(s)`);
			if (!created && !updated) this.summaryLines.push('See file result for details');
			this.panelMode = 'summary';
			return;
		}

		if (item._action && /ImportDetailFromSaleOrders/i.test(item._action)) {
			this.summaryLines.push('Imported lines from sale orders');
			const soIds = data?.SOIds;
			if (Array.isArray(soIds) && soIds.length) {
				this.summaryLines.push(`From ${soIds.length} sale order(s): ${soIds.join(', ')}`);
			}
			this.panelMode = 'summary';
			return;
		}

		if (item._badge === 'action') {
			this.summaryLines.push(item._label);
			this.panelMode = 'summary';
			return;
		}

		if (data && typeof data === 'object' && !Array.isArray(data)) {
			this.diffRows = this.historyService.buildDiff(prev, data, item._badge === 'create');
			const lineSummary = this.historyService.summarizeLines(data);
			if (lineSummary) this.summaryLines.push(lineSummary);

			if (this.diffRows.length) {
				this.panelMode = 'diff';
			} else if (this.summaryLines.length) {
				this.panelMode = 'summary';
			} else {
				this.summaryLines.push('No readable field changes in this request');
				this.panelMode = 'summary';
			}
			return;
		}

		this.summaryLines.push('No request detail recorded for this step');
		this.panelMode = 'summary';
	}

	clearPanel() {
		this.diffRows = [];
		this.summaryLines = [];
		this.panelMode = 'empty';
	}

	selectPrev() {
		if (!this.selected) return;
		const i = this.items.findIndex((x) => x.Id === this.selected.Id);
		if (i >= 0 && i < this.items.length - 1) this.select(this.items[i + 1]);
	}

	selectNext() {
		if (!this.selected) return;
		const i = this.items.findIndex((x) => x.Id === this.selected.Id);
		if (i > 0) this.select(this.items[i - 1]);
	}

	dismiss() {
		this.modalController.dismiss();
	}
}
