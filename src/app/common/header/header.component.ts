import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isReady = signal(false);
  isAuthenticated = signal(false);

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isAuthenticated.set(isAuth);
      this.isReady.set(true);
    });
  }

  logout(): void {
    if (!window.confirm('Are you sure you want to log out?')) {
      return;
    }

    console.info('Logging out user...');

    this.authService.logout().then(() => {
      console.info('User logged out successfully');
    }).catch(error => {
      console.warn('Logout failed', error);
    });
  }
}
