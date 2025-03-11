import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { AuthService } from '../services/auth.service';

export const isLoggedOrGuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.getUsernameFromToken() != null) {
    return true;
  }

  const guestService = inject(GuestService);
  if (guestService.isGuestMode()) return true;

  return false;
};
