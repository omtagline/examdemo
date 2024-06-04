import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private pb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  public updateForm!: FormGroup;
  public passwordMatch!: boolean;

  ngOnInit(): void {
    this.createFrom();
  }

  public createFrom(): void {
    this.updateForm = this.pb.group({
      oldPassword: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }

  public passMatch(e: any, name: string) {
    let value: String;

    if (name == 'pass') {
      value = this.updateForm.get('Password')?.value;
    } else {
      value = this.updateForm.get('ConfirmPassword')?.value;
    }
    if (e.target.value == value) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  public UpdateSubmit() {
    this.auth.updatePassWord(this.updateForm.value).subscribe((data) => {
      if (data.message == 'Reset Password Successfully') {
        alert('Reset Password Successfully');
        this.router.navigate(['/all-exams']);
      } else if (data.message == 'Old password or new password are same') {
        alert('Old password or new password are same');
      } else if (data.message == 'Invalid Old Password') {
        alert('Invalid Old Password');
      }
    });
  }
}
