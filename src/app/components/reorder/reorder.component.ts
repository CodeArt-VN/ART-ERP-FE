import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.scss'],
})
export class ReorderComponent implements OnInit {
  _items;
  constructor() {}

  ngOnInit() {}

  @Input() set items(values) {}

  get items() {
    return this._items;
  }

  @Output() reoder = new EventEmitter();

  onReoder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.reoder.emit(this._items);
    ev.detail.complete();
  }
}
