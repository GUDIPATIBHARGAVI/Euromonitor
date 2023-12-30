import { Component } from '@angular/core';

@Component({
  selector: 'app-business',
  template: `
    <h2>Business Department</h2>
    <p>Welcome to the Business Department. Click below to view more details:</p>
    <nav>
      <ul>
        <li>
          <a routerLink="accounts" routerLinkActive="active-link">accounts</a>
        </li>
        <li>
          <a routerLink="marketing" routerLinkActive="active-link">marketing</a>
        </li>
        <li><a routerLink="sales" routerLinkActive="active-link">sales</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent {}
