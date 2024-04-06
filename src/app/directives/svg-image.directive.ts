import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSvgImage]',
})
export class SvgImageDirective {
  @Input() src;
  @Input() defaultColor: string;
  @HostListener('mouseenter') onMouseEnter() {}
  @HostListener('mouseleave') onMouseLeave() {}

  constructor(public el: ElementRef) {}

  ngOnInit() {
    let element = this.el.nativeElement;
    var imgID = element.getAttribute('id');
    var imgClass = element.getAttribute('class');

    if (this.src) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var svg = xhr.responseXML.getElementsByTagName('svg')[0];

          if (imgID != null) {
            svg.setAttribute('id', imgID);
          }

          if (imgClass != null) {
            svg.setAttribute('class', imgClass + ' replaced-svg');
          }

          svg.removeAttribute('xmlns:a');

          if (!svg.hasAttribute('viewBox') && svg.hasAttribute('height') && svg.hasAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'));
          }
          svg.setAttribute('height', 'auto');
          svg.setAttribute('width', 'auto');

          let primaryColorEls = svg.querySelectorAll('[fill*="f15a24"]');
          primaryColorEls.forEach((cel) => {
            cel.setAttribute('class', 'cus-fill');
          });

          element.parentElement.replaceChild(svg, element);
        }
      };
      xhr.open('GET', this.src, true);
      xhr.send(null);
    }
  }
}
