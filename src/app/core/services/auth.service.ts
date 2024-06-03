import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginRes, singUpRes } from '../../inter';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private api: string = 'https://examination.onrender.com/users/';

  public isAuth = signal<boolean>(localStorage.getItem('token') ? true : false);

  public singup(value: singUpRes): Observable<singUpRes> {
    return this.http.post<singUpRes>(this.api + 'SignUp', value);
  }

  public login(value: Login): Observable<LoginRes> {
    return this.http.post<LoginRes>(this.api + 'Login', value);
  }
}
