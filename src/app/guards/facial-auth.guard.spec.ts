import { TestBed } from '@angular/core/testing';

import { FacialAuthGuard } from './facial-auth.guard';

describe('FacialAuthGuard', () => {
  let guard: FacialAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacialAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
