import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let isAuth = inject(AuthService);
  if (isAuth.isAuth()) {
    return true;
  } else {
    return false;
  }
};
