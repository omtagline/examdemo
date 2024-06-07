import { Component, inject } from '@angular/core';
import { StudentService } from '../../../core/services/student/student.service';
import { CommonResData } from '../../../shared/interface';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, pluck } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private studentService = inject(StudentService);
  private auth = inject(AuthService);
  private router = inject(Router);

  public data!: CommonResData;

  public edit: boolean = false;
  public isLoading: boolean = false;

  data$ = this.studentService.getProfile().pipe(pluck('data'));

  ngOnInit(): void {
    this.getProfileDetails();
  }

  private getProfileDetails(): void {
    // this.studentService.getProfile().subscribe((data) => {
    //   this.data = data.data;
    // });
  }

  public isEdit(): void {
    this.edit = !this.edit;
  }

  public save(name: string): void {
    this.studentService.UpdateProfile({ name: name }).subscribe(() => {
      this.getProfileDetails();
      this.edit = false;
    });
  }

  public logout(): void {
    this.auth.isAuth.set(false);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
