import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') || '';
  const withtoken = req.clone({
    setHeaders: {
      'access-token': token,
    },
  });
  return next(withtoken);
};
