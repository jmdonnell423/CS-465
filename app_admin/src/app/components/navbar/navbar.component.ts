import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink

@Component({
  selector: 'app-navbar',
  standalone: true, // Mark as standalone
  imports: [CommonModule, RouterModule], // Include CommonModule and RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isLoggedIn(): boolean {
    // Example authentication logic (replace with your own service call)
    const token = localStorage.getItem('travlr-token');
    return !!token; // Returns true if token exists, otherwise false
  }

  public onLogout(): void {
    localStorage.removeItem('travlr-token'); // Clear token on logout
    window.location.reload(); // Optionally reload or navigate to login
  }
}

















