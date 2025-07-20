import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FullscreenSpinnerComponent } from '../../common/fullscreen-spinner/fullscreen-spinner.component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, FullscreenSpinnerComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent implements OnInit {
  excludedPaths = ['/todos'];
  loading = signal<boolean>(false);

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    console.info('UserLayoutComponent initialized');
  }

  ngOnInit() {
    if (this.excludedPaths.includes(this.router.url)) {
      return;
    }

    console.info('Checking for existing user session...');
    this.loading.set(true);

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (!isAuthenticated) {

        console.info('User is not logged in, redirecting to login...');
        this.router.navigate(['/auth/login']);
      }

      this.loading.set(false);
    });
  }
}
