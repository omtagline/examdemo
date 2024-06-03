import { Routes } from '@angular/router';
import { SingupComponent } from './features/singup/singup.component';
import { LoginComponent } from './features/login/login.component';
import { AllexamsComponent } from './features/allexams/allexams.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/login/login.component').then(
        (el) => el.LoginComponent
      ),

    pathMatch: 'full',
  },
  {
    path: 'singup',
    loadComponent: () =>
      import('./features/singup/singup.component').then(
        (el) => el.SingupComponent
      ),
  },
  {
    path: 'all-exams',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/allexams/allexams.component').then(
        (el) => el.AllexamsComponent
      ),
  },
  {
    path: 'give-exam/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/give-exam/give-exam.component').then(
        (el) => el.GiveExamComponent
      ),
  },
];
