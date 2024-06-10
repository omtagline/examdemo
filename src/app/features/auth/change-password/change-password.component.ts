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

  ngOnInit(): void {
    this.createFrom();
  }

  public createFrom(): void {
    this.updateForm = this.pb.group({
      oldPassword: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }

  public UpdateSubmit(): void {
    this.auth.updatePassWord(this.updateForm.value).subscribe(
      (data) => {
        if (data.statusCode == 200) {
          alert('Reset Password Successfully');
          this.router.navigate(['/all-exams']);
        } else if (data.message == 'Old password or new password are same') {
          alert('Old password or new password are same');
        } else if (data.statusCode == 500) {
          alert('Invalid Old Password');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
