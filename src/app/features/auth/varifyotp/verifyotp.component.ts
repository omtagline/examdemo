import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SvgfinderPipe } from '../../../core/pipes/svgfinder.pipe';

@Component({
  selector: 'app-verifyotp',
  standalone: true,
  imports: [ReactiveFormsModule, SvgfinderPipe],
  templateUrl: './verifyotp.component.html',
  styleUrl: './verifyotp.component.scss',
})
export class VarifyotpComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public resetForm!: FormGroup;
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  public token!: string;

  ngOnInit(): void {
    this.auth.isAuth.set(false);
    this.token =
      this.route.snapshot.queryParamMap.get('token')?.toString() || '';

    localStorage.clear();
    this.createForm();
  }

  private createForm(): void {
    this.resetForm = this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required],
    });
  }

  public changePass(): void {
    this.auth.verifyPassword(this.token, this.resetForm.value).subscribe(
      (data) => {
        if (data.statusCode == 200) {
          this.router.navigate(['']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
