import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CommonResData,
  PassswordRes,
  Response,
  singUpRes,
} from '../../shared/interface';
import { environment } from '../../../environments/environment';

type UpdatePassData = {
  Password: string;
  oldPassword: string;
  NewPassword: string;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private api: string = environment.apiHost + 'users/';

  public isAuth = signal<boolean>(localStorage.getItem('token') ? true : false);

  public role = signal<string>(localStorage.getItem('role') || '');

  public singup(value: singUpRes): Observable<singUpRes> {
    return this.http.post<singUpRes>(this.api + 'SignUp', value);
  }

  public login(
    value: Response<CommonResData>
  ): Observable<Response<CommonResData>> {
    return this.http.post<Response<CommonResData>>(this.api + 'Login', value);
  }

  public updatePassWord(
    data: UpdatePassData
  ): Observable<Response<PassswordRes>> {
    return this.http.post<Response<PassswordRes>>(
      this.api + 'ResetPassword',
      data
    );
  }

  public verifyPassword(
    token: string,
    data: { Password: String; ConfirmPassword: String }
  ): Observable<Response<CommonResData>> {
    return this.http.post<Response<CommonResData>>(
      this.api + `ForgotPassword/Verify??token=${token}`,
      data
    );
  }

  public forgotPass(email: string): Observable<Response<null>> {
    return this.http.post<Response<null>>(this.api + 'ForgotPassword', email);
  }
}
