import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  public redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
