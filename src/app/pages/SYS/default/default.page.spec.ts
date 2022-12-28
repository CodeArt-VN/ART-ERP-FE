import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPage } from './default.page';

describe('DefaultPage', () => {
  let component: DefaultPage;
  let fixture: ComponentFixture<DefaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
