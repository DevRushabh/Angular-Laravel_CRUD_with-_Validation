import { TestBed } from '@angular/core/testing';

import { StoreDataServiceService } from './store-data-service.service';

describe('StoreDataServiceService', () => {
  let service: StoreDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
