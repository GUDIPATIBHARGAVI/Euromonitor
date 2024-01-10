import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'CMS';
  ismenurequired = false;
  isadminuser = false;
  isadmin = false;
  isMenuVisible = false;

  constructor(private route: Router, private service: AuthService) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin = true;
    }
  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }
    if (this.service.getuserrole() === 'admin') {
      this.isadminuser = true;
    } else {
      this.isadminuser === false;
    }
  }
  get isAdminUser(): boolean {
    return this.isadminuser;
  }
  //   this.service.getuserrole().subscribe(
  //     (userRole: string) => {
  //       this.isadminuser = userRole === 'admin';
  //     },
  //     (error) => {
  //       console.error('Error fetching user role:', error);
  //     }
  //   );
  // }
}
