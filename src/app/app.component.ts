import { Component, WritableSignal, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './features/auth/login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgbModule,
    LoginComponent,
    SidebarComponent,
    CommonModule,
    NgbToastModule,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private auth = inject(AuthService);

  public isAuth: WritableSignal<boolean>;

  constructor() {
    this.isAuth = this.auth.isAuth;
  }
}
