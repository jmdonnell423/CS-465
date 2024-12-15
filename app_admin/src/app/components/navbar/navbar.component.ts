import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.authService.loggedIn$.subscribe((loggedIn) => {
      console.log('Login state changed:', loggedIn); // Debug log
      this.isLoggedIn = loggedIn; // Update UI dynamically
    });
  }

  onLogout(): void {
    console.log('Logout button clicked'); // Debug log
    this.authService.logout(); // Call logout
    this.router.navigate(['/login']); // Redirect to login page
  }
}






