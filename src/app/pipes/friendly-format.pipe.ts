import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { lib } from '../services/static/global-functions';

@Pipe({
	name: 'dateFriendly',
	standalone: false,
})
export class DateFriendlyPipe implements PipeTransform {
	transform(date: string): Observable<string> {
		return timer(0, 1000).pipe(
			map(() => {
				return lib.dateFormatFriendly(date);
			})
		);
	}
}

@Pipe({
	name: 'numberFriendly',
	standalone: false,
})
export class NumberFriendlyPipe implements PipeTransform {
	transform(value) {
		return lib.isNumeric(value) ? lib.currencyFormatFriendly(value) : value;
	}
}
