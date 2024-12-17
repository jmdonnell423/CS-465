import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for [(ngModel)]
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true, // Mark this as a standalone component
  imports: [CommonModule, FormsModule], // Import CommonModule and FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formError: string = '';
  public credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
    } else {
      this.authenticationService.login(this.credentials)
        .then(response => {
          this.authenticationService.saveToken(response.token);
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.formError = err.message || 'An error occurred during login.';
        });
    }
  }
}



























