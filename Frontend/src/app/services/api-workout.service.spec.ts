import { TestBed } from '@angular/core/testing';

import { ApiWorkoutService } from './api-workout.service';

describe('ApiWorkoutService', () => {
  let service: ApiWorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiWorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
