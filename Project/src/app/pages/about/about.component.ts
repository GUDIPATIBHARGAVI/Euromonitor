import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private router: Router) {}
  navigateToHome(): void {
    this.router.navigateByUrl('/home');
  }

  navigateToContact(): void {
    this.router.navigateByUrl('/contact');
  }
}
