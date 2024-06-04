import { LoaderService } from './../services/loader.service';
import { finalize, pluck } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let loaderService = inject(NgxSpinnerService);
  loaderService.show();
  const token = localStorage.getItem('token') || '';
  const withtoken = req.clone({
    setHeaders: {
      'access-token': token,
    },
  });
  return next(withtoken).pipe(finalize(() => loaderService.hide()));
};
