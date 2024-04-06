import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageMessageComponent } from './page-message.component';

describe('PageMessageComponent', () => {
  let component: PageMessageComponent;
  let fixture: ComponentFixture<PageMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageMessageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
