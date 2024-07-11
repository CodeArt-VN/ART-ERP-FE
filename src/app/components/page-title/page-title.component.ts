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
  @Input() set pageConfig(value) {
      if(value){
        this.icon = value.pageIcon;
        this.color = value.pageColor;
        this.title = value.pageTitle;
        this.remark = value.pageRemark;
      }
  }

  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {}
}
