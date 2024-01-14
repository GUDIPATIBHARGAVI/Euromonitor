import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  constructor(private router: Router) {}
  public navigateToHome(): void {
    this.router.navigateByUrl('/home');
  }

  public navigateToContact(): void {
    this.router.navigateByUrl('/contact');
  }
}
