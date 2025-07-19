import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent {
  formData: FormGroup = new FormGroup({});

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
  ) {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.formData.valid) {
      const { email, password } = this.formData.value;
      console.log('Login Data:', { email, password });

      try {
        const response = await this.authService.login(email, password);

        console.info('Login successful:', response);
        this.snackbar.show('Login successful!', 3000);
        this.router.navigate(['/home/dashboard']);
      } catch(error) {
        console.warn('Error during login:', error);
        this.snackbar.show('Login failed. Please try again.', 5000);
        return;
      }
    } else {
      console.info('Form is invalid:', this.formData.errors);
      // Optionally, show validation errors to the user
    }
  }
}
