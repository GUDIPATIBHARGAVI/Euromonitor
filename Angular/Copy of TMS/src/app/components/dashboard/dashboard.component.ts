import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  public redirectToTaskForm() {
    this.router.navigate(['/task-form']);
  }

  public redirectToTaskList() {
    this.router.navigate(['/task-list']);
  }
  logout() {
    this.authService.logout().subscribe(
      () => {
        // Logout was successful
        // Clear any other local data or perform additional cleanup if needed
        this.router.navigate(['/login']); // Navigate to the login page
      },
      (error) => {
        // Handle logout error
        console.error('Logout failed', error);
      }
    );
  }
}
