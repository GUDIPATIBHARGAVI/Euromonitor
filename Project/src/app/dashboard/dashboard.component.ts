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

  getEmail() {
    return sessionStorage.getItem('email');
  }
  getNumber() {
    return sessionStorage.getItem('number');
  }
  getName() {
    return sessionStorage.getItem('username');
  }
  getRole() {
    return sessionStorage.getItem('userrole');
  }
}
