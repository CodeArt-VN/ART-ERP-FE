import { TestBed } from '@angular/core/testing';
import { exService } from '../core/common.service';



describe('ServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: exService = TestBed.get(exService);
    expect(service).toBeTruthy();
  });
});
