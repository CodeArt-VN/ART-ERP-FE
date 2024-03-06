import { Directive, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appScrollbarTheme]',
})
export class ScrollbarThemeDirective {
  constructor(el: ElementRef) {
    if (environment.showScrollbar) {
      let stylesheet = `
    /*.scroll-y{
      overflow-y: hidden !important;
      padding-right: 3px !important;
      
    }
    .scroll-y:hover{
      overflow-y: auto !important;
      padding-right: 0px !important;
    }*/
    
    
    .scroll-y::-webkit-scrollbar {
      width: 6px;
    }
    
    .scroll-y::-webkit-scrollbar-track {
      background: var(--menu-right-border-color);
      background: transprent;
    }

    ::-webkit-scrollbar-corner {
      background: var(--menu-right-border-color);
    }
    
    .scroll-y::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background: var(--ion-color-primary);
      background: linear-gradient(var(--menu-background-top), var(--main-background-top));
      border: 1px solid rgba(var(--ion-color-primary-rgb,0,0,0),.25);
    }
    
    .scroll-y::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(var(--ion-color-primary), var(--ion-color-primary));
    }`;
      if (el.nativeElement.className.indexOf('scrollx') > -1) {
        stylesheet += `
      .inner-scroll{
        overflow-x: auto !important;
      }
  
      `;
      }

      const styleElmt = el.nativeElement.shadowRoot.querySelector('style');

      if (styleElmt) {
        styleElmt.append(stylesheet);
      } else {
        const barStyle = document.createElement('style');
        barStyle.append(stylesheet);
        el.nativeElement.shadowRoot.appendChild(barStyle);
      }

      //console.log('windows');
    }
  }
}
