import { TestBed } from '@angular/core/testing';

import { Args } from './args';

describe('Args', () => {
  let service: Args;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Args);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
