import { TestBed } from '@angular/core/testing';

import { TLDService } from './tld.service';

describe('TLDService', () => {
  let service: TLDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TLDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
