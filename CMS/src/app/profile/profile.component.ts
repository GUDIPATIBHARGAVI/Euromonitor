import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private router: Router) {}
  public getUserEmail() {
    return sessionStorage.getItem('email');
  }
  public getUserNumber() {
    return sessionStorage.getItem('number');
  }
  public getUserName() {
    return sessionStorage.getItem('username');
  }
  public getUserRole() {
    return sessionStorage.getItem('userrole');
  }
  public navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
