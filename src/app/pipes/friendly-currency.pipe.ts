import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyCurrency',
})
export class FriendlyCurrencyPipe implements PipeTransform {
  transform(value: any, decimalCount = 2, decimal = '.', thousands = ','): string {
    if (isNaN(value - parseFloat(value))) {
      return value;
    }
  }
}

// transform(value: any, currencyCode?: string, display?: string | boolean, digitsInfo?: string, locale?: string): string {
//   if (value != null)
//       return this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
//   return this.currencyPipe.transform(0, currencyCode, display, locale).split('0.00')[0];
// }
