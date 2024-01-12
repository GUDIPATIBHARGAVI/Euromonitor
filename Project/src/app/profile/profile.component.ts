import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private router: Router) {}
  getUserEmail() {
    return sessionStorage.getItem('email');
  }
  getUserNumber() {
    return sessionStorage.getItem('number');
  }
  getUserName() {
    return sessionStorage.getItem('username');
  }
  getUserRole() {
    return sessionStorage.getItem('userrole');
  }
  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
