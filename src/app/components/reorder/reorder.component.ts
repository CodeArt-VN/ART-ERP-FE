import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
    selector: 'app-reorder',
    templateUrl: './reorder.component.html',
    styleUrls: ['./reorder.component.scss'],
    standalone: false
})
export class ReorderComponent implements OnInit {
  _items;
  constructor() {}

  ngOnInit() {}
  @Input() labelField = 'Name';
  @Input() sortProperty = 'Sort';

  @Input() set items(values) {
    this._items = [...values];
  }

  @Output() reoder = new EventEmitter();

  onReoder(ev: CustomEvent<ItemReorderEventDetail>) {
    this._items = ev.detail.complete(this._items );
    for(let i = 0; i < this._items.length ; i++){
      this._items[i][this.sortProperty] = i;
    }
    this.reoder.emit(this._items);
  }
}
