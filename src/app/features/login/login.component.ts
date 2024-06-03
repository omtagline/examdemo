import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email } from '../../allregx';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  public loginForm!: FormGroup;
  private isAuth!: boolean;

  constructor() {
    this.createForm();
    this.isAuth = this.auth.isAuth();
    if (this.isAuth) {
      this.router.navigate(['/all-exams']);
    }
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {
    this.auth
      .login(this.loginForm.value)
      .pipe()
      .subscribe((data: any) => {
        if (data.message == 'Invalid email') {
          alert('Invalid email');
        } else if (data.message == 'Please Verify Email') {
          alert('Please Verify Email');
        } else if (data.message == 'Login successful') {
          this.auth.isAuth.set(true);
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('role', data.data.role);

          this.router.navigate(['/all-exams']);
        }
      });
  }
}
