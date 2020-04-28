import { TestBed } from '@angular/core/testing';

import { NgrxComposeService } from './ngrx-compose.service';

describe('NgrxComposeService', () => {
  let service: NgrxComposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxComposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
