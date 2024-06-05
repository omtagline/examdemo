import { Routes } from '@angular/router';
import { SignupComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AllexamsComponent } from './features/student/allexams/allexams.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (el) => el.LoginComponent
      ),

    pathMatch: 'full',
  },
  {
    path: 'singup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (el) => el.SignupComponent
      ),
  },
  {
    path: 'all-exams',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/student/allexams/allexams.component').then(
        (el) => el.AllexamsComponent
      ),
  },
  {
    path: 'give-exam/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/student/give-exam/give-exam.component').then(
        (el) => el.GiveExamComponent
      ),
  },
  {
    path: 'update-Password',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/auth/change-password/change-password.component').then(
        (e) => e.ChangePasswordComponent
      ),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/student/profile/profile.component').then(
        (el) => el.ProfileComponent
      ),
  },
  {
    path: 'all-student',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/teacher/all-student/all-student.component').then(
        (el) => el.AllStudentComponent
      ),
  },
  {
    path: 'student-detail/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/teacher/student-details/student-details.component'
      ).then((el) => el.StudentDetailsComponent),
  },
  {
    path: 'exams',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/teacher/exam/exam.component'
      ).then((el) => el.ExamComponent),
  },
];
