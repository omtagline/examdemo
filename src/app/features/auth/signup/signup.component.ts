import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { pluck } from 'rxjs';
import { email } from '../../../core/constants/constants';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public singUpForm!: FormGroup;

  constructor() {
    this.createForm();
  }

  private createForm(): void {
    this.singUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(email)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', [Validators.required]],
    });
  }

  public singUp(): void {
    const formvalues = this.singUpForm.value;
    delete formvalues.confirmPassword;

    this.auth
      .singup(formvalues)
      .pipe(pluck('message'))
      .subscribe((data) => {
        console.log(data);
        if (data == 'Sign Up Successfully') {
          alert(data);
          this.router.navigate(['']);
        } else if (data == 'Email already exist') {
          alert('Email already exist');
        }
      });
  }
}
