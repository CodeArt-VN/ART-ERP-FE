import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-multi-row',
  templateUrl: './card-multi-row.component.html',
  styleUrls: ['./card-multi-row.component.scss'],
})
export class CardMultiRowComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  @Input() title: any;
  @Input() value: any;
  @Input() percent: any;

  @Input() selected: any;

  constructor() {}

  ngOnInit() {}

  onClick(e) {
    this.onChange.emit(e);
  }
}
