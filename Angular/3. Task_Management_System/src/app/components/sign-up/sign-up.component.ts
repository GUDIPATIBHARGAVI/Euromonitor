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
import { lastValueFrom } from 'rxjs';
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

  public async signUp() {
    try {
      if (!this.signupForm.valid) {
        return alert(
          'Please fill in all required fields with valid information.'
        );
      }

      const response = await lastValueFrom(
        this.http.post<any>(
          'http://localhost:3000/signUpusers',
          this.signupForm.value
        )
      );

      if (response) {
        alert('Signup successful');
        this.signupForm.reset();
        this.router.navigate(['login']);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong');
    }
  }

  public getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    const errorConditions = [
      {
        condition: control?.hasError('emailTaken'),
        message: 'Email is already taken. Enter a different email.',
      },
      {
        condition: control?.hasError('mobileTaken'),
        message:
          'Mobile number is already taken. Enter a different mobile number.',
      },
      {
        condition: control?.hasError('email'),
        message: 'Enter a valid email address.',
      },
      {
        condition: control?.hasError('pattern'),
        message: 'Enter a valid 10-digit mobile number.',
      },
    ];

    for (const condition of errorConditions) {
      if (condition.condition) {
        return condition.message;
      }
    }

    return this.getLengthErrorMessage(control);
  }

  private getLengthErrorMessage(control: AbstractControl | null): string {
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'Mobile number should be exactly 10 digits.';
    } else {
      return '';
    }
  }

  public uniqueEmailValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const email = control.value;
      return this.checkUniqueValue('email', email);
    };
  }

  public uniqueMobileValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const mobile = control.value;
      return this.checkUniqueValue('mobile', mobile);
    };
  }

  private checkUniqueValue(
    type: string,
    value: string
  ): Observable<{ [key: string]: any } | null> {
    return this.http
      .get<any[]>(`http://localhost:3000/signUpusers?${type}=${value}`)
      .pipe(
        map((res) => (res.length > 0 ? { [`${type}Taken`]: true } : null)),
        catchError(() => of(null))
      );
  }
}
