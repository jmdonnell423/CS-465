import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
})
export class LoginComponent {
  public formError: string = '';
  public credentials = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
    } else {
      this.authenticationService.login(this.credentials).subscribe({
        next: (response: { token: string }) => {
          console.log('Login successful:', response);
          this.authenticationService.saveToken(response.token);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error('Login failed:', err);
          if (err.status === 401) {
            this.formError = 'Invalid email or password.';
          } else {
            this.formError = 'An error occurred. Please try again.';
          }
        },
      });
    }
  }
}
















