import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-quantity',
  templateUrl: './format-quantity.component.html',
  styleUrls: ['./format-quantity.component.scss'],
  standalone: false
})
export class FormatQuantityComponent  implements OnInit {

  @Input() splitQuantityList;
  @Input() quantity;
  constructor() { }

  ngOnInit() {}

}
