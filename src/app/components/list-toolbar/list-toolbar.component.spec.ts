import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListToolbarComponent } from './list-toolbar.component';

describe('ListToolbarComponent', () => {
	let component: ListToolbarComponent;
	let fixture: ComponentFixture<ListToolbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListToolbarComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(ListToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
