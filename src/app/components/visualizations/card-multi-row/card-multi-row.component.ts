import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-multi-row',
  templateUrl: './card-multi-row.component.html',
  styleUrls: ['./card-multi-row.component.scss'],
})
export class CardMultiRowComponent implements OnInit {
  @Output() onChange = new EventEmitter();

  @Input() title: any;
  
  _value: number = 0;
  @Input() set value(val){
    this._value = val;
  }

  _comparitionValue: number = null;
  @Input() set comparitionValue(val){
    this._comparitionValue = val;
  }

  get percent(){
    return this._comparitionValue ? (this._value - this._comparitionValue) / this._comparitionValue * 100 : 0;
  }

  @Input() selected: any;

  constructor() {}

  ngOnInit() {}

  onClick(e) {
    this.onChange.emit(e);
  }
}
