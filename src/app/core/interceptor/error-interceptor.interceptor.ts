import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log(error.message);
      return throwError(error.message);
    })
  );
};
