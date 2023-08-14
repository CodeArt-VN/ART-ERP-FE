import { Component, Input, OnInit } from '@angular/core';
import { lib } from 'src/app/services/static/global-functions';


@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() icon;
  @Input() color;
  @Input() title;
  @Input() remark;


  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    
  }


}
