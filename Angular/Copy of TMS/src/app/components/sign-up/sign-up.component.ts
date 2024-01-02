import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.uniqueEmailValidator()],
      ],
      password: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
        [this.uniqueMobileValidator()],
      ],
    });
  }

  public signUp() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.http
        .post<any>('http://localhost:3000/signUpusers', this.signupForm.value)
        .subscribe(
          (res) => {
            alert('Signup successful');
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          (err) => {
            alert('Something went wrong');
          }
        );
    } else {
      alert('Please fill in all required fields with valid information.');
    }
  }

  public getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (control?.hasError('emailTaken')) {
      return 'Email is already taken. Enter a different email.';
    }

    if (control?.hasError('mobileTaken')) {
      return 'Mobile number is already taken. Enter a different mobile number.';
    }

    if (control?.hasError('email')) {
      return 'Enter a valid email address.';
    }

    if (control?.hasError('pattern')) {
      return 'Enter a valid 10-digit mobile number.';
    }

    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'Mobile number should be exactly 10 digits.';
    }

    return '';
  }

  public uniqueEmailValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const email = control.value;
      return this.http
        .get<any[]>('http://localhost:3000/signUpusers?email=' + email)
        .pipe(
          map((res) => (res.length > 0 ? { emailTaken: true } : null)),
          catchError(() => of(null))
        );
    };
  }

  public uniqueMobileValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const mobile = control.value;
      return this.http
        .get<any[]>('http://localhost:3000/signUpusers?mobile=' + mobile)
        .pipe(
          map((res) => (res.length > 0 ? { mobileTaken: true } : null)),
          catchError(() => of(null))
        );
    };
  }
}
