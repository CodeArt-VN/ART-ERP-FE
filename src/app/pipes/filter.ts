import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { lib } from 'src/app/services/static/global-functions';

@Pipe({
    name: 'safeFrame',
    standalone: false
})
export class SafeFrame implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({
    name: 'safeHtml',
    standalone: false
})
export class SafeHtml {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

@Pipe({
    name: 'safeStyle',
    standalone: false
})
export class SafeStyle {
  constructor(private sanitizer: DomSanitizer) {}
  transform(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

@Pipe({
    name: 'isNotDeleted',
    standalone: false
})
export class isNotDeleted {
  transform(items: any[]) {
    return items.filter((ite) => ite.IsDeleted === false);
  }
}

@Pipe({
    name: 'filter', pure: false,
    standalone: false
})
export class filterProperties implements PipeTransform {
  transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
    return items.filter((item) => {
      for (let field in conditions) {
        if (conditions[field] === 'all' || conditions[field] === '') return true;
        if (item[field] != conditions[field]) {
          return false;
        }
      }
      return true;
    });
  }
}

@Pipe({
    name: 'search', pure: false,
    standalone: false
})
export class searchProperties implements PipeTransform {
  transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
    return items.filter((item) => {
      for (let field in conditions) {
        if (conditions[field] === 'all' || conditions[field] === '') return true;
        if (item[field].toLowerCase().indexOf(conditions[field]) == -1) {
          return false;
        }
      }
      return true;
    });
  }
}

@Pipe({
    name: 'myPipe',
    standalone: false
})
export class MyPipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}

@Pipe({
    name: 'searchNoAccent', pure: false,
    standalone: false
})
export class searchNoAccents implements PipeTransform {
  transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
    return items.filter((item) => {
      for (let field in conditions) {
        let keyword = conditions[field];
        if (keyword == 'deals') {
          return item.UoMs.some((uom) => uom.PriceList.some((price) => price.NewPrice !== undefined));
        } else {
          keyword = this.removeAccents(keyword);
          let data = item[field] + ' ' + (item.ForeignName || '');
          item['_searchOn' + field] = this.removeAccents(data);
          if (keyword === 'all' || keyword === '') return true;
          if (item['_searchOn' + field].indexOf(keyword) == -1) {
            return false;
          }
        }
      }
      return true;
    });
  }
  removeAccents(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
}
