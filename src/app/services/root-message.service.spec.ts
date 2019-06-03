import { TestBed } from '@angular/core/testing';

import { RootMessageService } from './root-message.service';

describe('RootMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootMessageService = TestBed.get(RootMessageService);
    expect(service).toBeTruthy();
  });
});
