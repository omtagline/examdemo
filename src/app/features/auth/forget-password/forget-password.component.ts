import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email } from '../../../core/constants/constants';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SvgfinderPipe } from '../../../core/pipes/svgfinder.pipe';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,SvgfinderPipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  private fb = inject(FormBuilder);
  private authS = inject(AuthService);
  private router = inject(Router);
  
  public form!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(email)]],
    });
  }

  public frogot(): void {
    this.authS.forgotPass(this.form.value).subscribe((data) => {
      if (data.statusCode === 200) {
        alert('Email Sent Successful');
        this.router.navigate(['']);
      } else if (data.statusCode == 500) {
        alert('User Not Founded');
      }
    });
  }
}
