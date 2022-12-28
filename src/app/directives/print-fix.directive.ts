import { Directive, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
	selector: '[appPrintFix]'
})
export class PrintFixDirective {
	constructor(el: ElementRef) {
		const stylesheet = `@media print {.inner-scroll {position: inherit !important; overflow: hidden !important;}}`;
		const styleElmt = el.nativeElement.shadowRoot.querySelector('style');

		if (styleElmt) {
			styleElmt.append(stylesheet);
		} else {
			const barStyle = document.createElement('style');
			barStyle.append(stylesheet);
			el.nativeElement.shadowRoot.appendChild(barStyle);
		}
	}
}
