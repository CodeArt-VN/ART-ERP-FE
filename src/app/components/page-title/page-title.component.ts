import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-page-title',
	templateUrl: './page-title.component.html',
	styleUrls: ['./page-title.component.scss'],
	standalone: false,
})
export class PageTitleComponent implements OnInit {
	@Input() icon;
	@Input() color;
	@Input() title;
	@Input() remark;
	@Input() pageName;

	private _reportIds: number[] = [];
	activeReportIndex = 0;

	get reportIds(): number[] {
		return this._reportIds;
	}

	/** Prefer this over singular reportId when binding multiple charts. */
	@Input()
	set reportIds(value: number[]) {
		this.applyReportIds(value);
	}

	/** Legacy single id — kept for shipment and older pages. */
	@Input()
	set reportId(value: number) {
		if (value == null) return;
		this.applyReportIds([value]);
	}

	@Input() set pageConfig(value) {
		if (value) {
			this.icon = value.pageIcon;
			this.color = value.pageColor;
			this.title = value.pageTitle;
			this.remark = value.pageRemark;
			this.pageName = value.pageName;
			if (value.reportIds?.length) {
				this.applyReportIds(value.reportIds);
			} else {
				this.applyReportIds(value.reportId != null ? [value.reportId] : []);
			}
		}
	}

	get activeReportId(): number | undefined {
		return this._reportIds[this.activeReportIndex];
	}

	get showReportDots(): boolean {
		return this._reportIds.length > 1;
	}

	constructor() {}

	ngOnInit() {}
	ngAfterViewInit() {}

	/** Top half = previous (-1), bottom half = next (+1). Wraps either way. */
	cycleReport(ev?: Event, direction: 1 | -1 = 1) {
		ev?.stopPropagation();
		ev?.preventDefault();
		const n = this._reportIds.length;
		if (n < 2) return;
		this.activeReportIndex = (this.activeReportIndex + direction + n) % n;
	}

	private applyReportIds(ids: number[] | null | undefined) {
		this._reportIds = (ids || []).filter((id) => id != null);
		if (this.activeReportIndex >= this._reportIds.length) {
			this.activeReportIndex = 0;
		}
	}
}
