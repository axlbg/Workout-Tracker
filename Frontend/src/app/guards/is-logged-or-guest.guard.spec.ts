import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLoggedOrGuestGuard } from './is-logged-or-guest.guard';

describe('isLoggedOrGuestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      isLoggedOrGuestGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
