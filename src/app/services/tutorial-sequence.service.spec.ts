import { TestBed } from '@angular/core/testing';

import { TutorialSequenceService } from './tutorial-sequence.service';

describe('TutorialSequenceServiceService', () => {
  let service: TutorialSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
