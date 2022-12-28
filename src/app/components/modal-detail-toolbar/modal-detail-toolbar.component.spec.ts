import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetailToolbarComponent } from './modal-detail-toolbar.component';

describe('ModalDetailToolbarComponent', () => {
  let component: ModalDetailToolbarComponent;
  let fixture: ComponentFixture<ModalDetailToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailToolbarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetailToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
