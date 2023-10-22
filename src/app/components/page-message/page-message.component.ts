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
  
  constructor() { }

  ngOnInit() {
    if (!this.message) {
      this.message = 'No data available';
    }
    if (!this.subMessage) {
      this.subMessage = 'Please check again';
    }
  }

}
