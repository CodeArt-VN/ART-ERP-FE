import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailToolbarComponent } from './detail-toolbar.component';

describe('DetailToolbarComponent', () => {
	let component: DetailToolbarComponent;
	let fixture: ComponentFixture<DetailToolbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DetailToolbarComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
