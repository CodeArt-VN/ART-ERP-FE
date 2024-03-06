import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  items = [
    { Code: 'primary', Name: 'Primary' },
    { Code: 'secondary', Name: 'Secondary' },
    { Code: 'tertiary', Name: 'Tertiary' },

    { Code: 'success', Name: 'Success' },
    { Code: 'warning', Name: 'Warning' },
    { Code: 'danger', Name: 'Danger' },

    { Code: 'red', Name: 'Red' },
    { Code: 'pink', Name: 'Pink' },
    { Code: 'purple', Name: 'Purple' },

    { Code: 'blue', Name: 'Blue' },
    { Code: 'bluegreen', Name: 'Bluegreen' },

    { Code: 'dark', Name: 'Dark' },
    { Code: 'medium', Name: 'Medium' },
    { Code: 'light', Name: 'Light' },
  ];

  constructor() {}

  ngOnInit() {}

  @Output() selected = new EventEmitter();
  onSelected(event) {
    this.selected.emit(event);
  }

  segmentView = 's1';
  segmentChanged(ev: any) {
    this.segmentView = ev.detail.value;
  }
}
