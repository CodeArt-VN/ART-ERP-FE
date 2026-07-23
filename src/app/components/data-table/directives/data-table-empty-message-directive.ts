import { ContentChild, Directive, Injectable, Input, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataTableEmptyMessageTemplateDirective } from './data-table-empty-message-template-directive';

@Directive({
	selector: 'datatable-empty-message',
	standalone: false,
})
export class DataTableEmptyMessageDirective {
	@Input() message: string;
	@Input() subMessage: string;
	@Input() imgSrc: string;
	@Input() showImg: boolean = true;
	/**
	 * No default here on purpose: leaving it unset lets data-table.scss's `.is-empty` flex-fill
	 * (governed by the table's own `[minHeight]`) size the empty message. Set an explicit value
	 * (e.g. '125px') only when you want to override that.
	 */
	@Input() minHeight: string;
	@Input('emptyMessageTemplate') _emptyMessageTemplateInput: TemplateRef<any>;

	@ContentChild(DataTableEmptyMessageTemplateDirective, {
		read: TemplateRef,
		static: true,
	})
	_emptyMessageTemplateQuery: TemplateRef<any>;

	get emptyMessageTemplate(): TemplateRef<any> {
		return this._emptyMessageTemplateInput || this._emptyMessageTemplateQuery;
	}

	constructor(private emptyMessageChangesService: EmptyMessageChangesService) {}
	private isFirstChange = true;
	ngOnChanges() {
		if (this.isFirstChange) {
			this.isFirstChange = false;
		} else {
			this.emptyMessageChangesService.onInputChange();
		}
	}
}

@Injectable()
export class EmptyMessageChangesService {
	private emptyMessageInputChanges = new Subject<void>();

	get emptyMessageInputChanges$(): Observable<void> {
		return this.emptyMessageInputChanges.asObservable();
	}

	onInputChange(): void {
		this.emptyMessageInputChanges.next();
	}
}
