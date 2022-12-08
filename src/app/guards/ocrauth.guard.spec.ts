import { TestBed } from '@angular/core/testing';

import { OCRAuthGuard } from './ocrauth.guard';

describe('OCRAuthGuard', () => {
  let guard: OCRAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OCRAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
