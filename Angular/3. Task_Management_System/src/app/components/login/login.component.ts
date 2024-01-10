import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async login() {
    try {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const response = await lastValueFrom(
        this.authService.login(email, password)
      );

      if (response && response.success) {
        alert('Login success');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        alert('Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  }
}
