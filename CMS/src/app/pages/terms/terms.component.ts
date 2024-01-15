import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent {
  constructor(private router: Router) {}
  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
