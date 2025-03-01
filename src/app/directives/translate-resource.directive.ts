import { Directive, ElementRef, Input } from '@angular/core';
import { EnvService } from '../services/core/env.service';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[appTranslateResource]',
	standalone: false,
})
export class TranslateResourceDirective {
	item: any = null;
	subscription: Subscription;

	@Input() set appTranslateResource(v: string) {
		this.item = v;
		this.updateText();
	}

	name: string = 'Name';
	@Input() set nameProperty(v: string) {
		this.name = v;
		this.updateText();
	}

	foreignName: string = 'ForeignName';
	@Input() set foreignNameProperty(v: string) {
		this.foreignName = v;
		this.updateText();
	}

	constructor(
		private el: ElementRef,
		private env: EnvService
	) {
		this.subscription = this.env.languageTracking.subscribe((_) => {
			this.updateText();
		});
	}
	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	}

	updateText() {
		if (this.item) {
			if (this.env.language.isDefault || !this.item[this.foreignName]) {
				this.el.nativeElement.innerHTML = this.item[this.name];
			} else {
				this.el.nativeElement.innerHTML = this.item[this.foreignName];
			}
		}
	}
}
