import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-message',
  templateUrl: './page-message.component.html',
  styleUrls: ['./page-message.component.scss'],
})
export class PageMessageComponent implements OnInit {
  @Input() itemsLength;
  @Input() showSpinner;
  @Input() message;
  @Input() subMessage;
  _imgSrc: string;
  @Input() set imgSrc(value: string) {
    if (value) {
      this._imgSrc = value;
    }
    else {
      this._imgSrc = 'assets/undraw_no_data_qbuo.svg';
    }

    this._imgSrc = '../../../'+ this._imgSrc;
    console.log(this._imgSrc);
    
  }
  
  constructor() {}

  ngOnInit() {
    if (!this.message) {
      this.message = 'No data available';
    }
    if (!this.subMessage) {
      this.subMessage = 'Please check again';
    }
    if(!this._imgSrc) {
      this._imgSrc = '../../../assets/undraw_no_data_qbuo.svg';
    }
  }
}
