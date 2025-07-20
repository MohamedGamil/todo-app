import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { FullscreenSpinnerComponent } from '../../common/fullscreen-spinner/fullscreen-spinner.component';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, FullscreenSpinnerComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss'
})
export class GuestLayoutComponent implements OnInit {
  excludedPaths = ['/todos'];
  loading = signal<boolean>(true);

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    console.info('GuestLayoutComponent initialized');
  }

  async ngOnInit() {
    console.info('Checking for existing user session...');
    this.loading.set(true);

    // await this.authService.logout();

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.loading.set(false);

      if (isAuthenticated) {
        if (this.excludedPaths.includes(this.router.url)) {
          return;
        }

        console.info('User is already logged in, redirecting to dashboard...');
        this.router.navigate(['/home/dashboard']);
      }
    });
  }
}
