import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  public role: string | null = '';

  constructor() {
    this.role = localStorage.getItem('role');
  }

  public singout(): void {
    this.auth.isAuth.set(false);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
