import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-tabs-card',
  templateUrl: './tabs-card.component.html',
  styleUrls: ['./tabs-card.component.scss'],
})
export class TabsCardComponent implements OnInit {
  @Input() tabs = [];
  @Input() type;
  @Output() onChange = new EventEmitter();


  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    
  }


}
