import { finalize, pluck, tap } from 'rxjs';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let loaderService = inject(NgxSpinnerService);
  let router = inject(Router);
  let auth = inject(AuthService);

  const token = localStorage.getItem('token') || '';

  loaderService.show();

  const withtoken = req.clone({
    setHeaders: {
      'access-token': token,
    },
  });

  return next(withtoken).pipe(
    finalize(() => loaderService.hide()),
    tap((event) => {
      if (event instanceof HttpResponse) {
        if (event.body) {
          let body: any = event.body;
          if (body.statusCode == 401) {
            localStorage.clear();
            auth.isAuth.set(false);
            alert('Token Is Expired Redirecting TO Login.....');

            router.navigate(['']);
          }
        }
      }
    })
  );
};
