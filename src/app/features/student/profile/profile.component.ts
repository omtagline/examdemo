import { Component, inject } from '@angular/core';
import { StudentService } from '../../../core/services/student/student.service';
import { CommonResData } from '../../../shared/interface';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProfileDetails();
  }

  private getProfileDetails(): void {
    this.isLoading = true;
    this.studentService.getProfile().subscribe((data) => {
      this.isLoading = false;
      console.log('data.data :>> ', data.data);
      this.data = data.data;
    });
  }

  public isEdit(): void {
    this.edit = !this.edit;
  }

  public save(name: string) {
    this.isLoading = true;
    // console.log(name);
    this.studentService.UpdateProfile({ name: name }).subscribe((data) => {
      this.isLoading = false;
      this.getProfileDetails();
      this.edit = false;
    });
  }

  public logout() {
    this.auth.isAuth.set(false);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
