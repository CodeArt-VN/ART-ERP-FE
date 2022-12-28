import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeFrame' })
export class SafeFrame implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Pipe({ name: 'safeHtml' })
export class SafeHtml {
    constructor(private sanitizer: DomSanitizer) { }
    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}

@Pipe({ name: 'safeStyle' })
export class SafeStyle {
    constructor(private sanitizer: DomSanitizer) { }
    transform(style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }
}

@Pipe({ name: 'isNotDeleted' })
export class isNotDeleted {
    transform(items: any[]) {
        return items.filter(ite => ite.IsDeleted === false);
    }
}

@Pipe({ name: "filter", pure: false })
export class filterProperties implements PipeTransform {
    transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
        return items.filter(item => {
            for (let field in conditions) {
                if(conditions[field]==='all' || conditions[field]==='') return true;  
                if (item[field] != conditions[field]) {
                    return false;
                }
            }
            return true;
        });
    }
}

@Pipe({ name: "search", pure: false })
export class searchProperties implements PipeTransform {
    transform(items: Array<any>, conditions: { [field: string]: any }): Array<any> {
        return items.filter(item => {
            for (let field in conditions) {
                if(conditions[field]==='all' || conditions[field]==='') return true;  
                if (item[field].toLowerCase().indexOf(conditions[field])==-1) {
                    return false;
                }
            }
            return true;
        });
    }
}

@Pipe({
    name: 'myPipe',
})
export class MyPipe implements PipeTransform {
    transform(value: string, ...args) {
        return value.toLowerCase();
    }
}