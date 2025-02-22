import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-page-message',
    templateUrl: './page-message.component.html',
    styleUrls: ['./page-message.component.scss'],
    standalone: false
})
export class PageMessageComponent implements OnInit {
  @Input() itemsLength;
  @Input() showSpinner;
  @Input() message;
  @Input() subMessage;
  _imgSrc: string = 'assets/undraw_no_data_qbuo.svg';
  @Input() set imgSrc(value: string) {
    if (value) {

      if(value.indexOf('http') === 0) {
        this._imgSrc = value;
      }
      else{
        this._imgSrc = 'assets/' + value;
      }
      
    }
  }
  
  constructor() {}

  ngOnInit() {
    if (!this.message) {
      this.message = 'No data available';
    }
    if (!this.subMessage) {
      this.subMessage = 'Please check again';
    }
  }
}
