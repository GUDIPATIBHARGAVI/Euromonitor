import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  registerform = this.builder.group({
    id: ['', [Validators.required, Validators.minLength(4)]],
    name: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.uniqueValueValidator('email')],
    ],
    number: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
      [this.uniqueValueValidator('number')],
    ],
    gender: ['male'],
    role: [''],
    isactive: [false],
  });

  public proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(
        (result) => {
          this.toastr.success(
            'Please contact admin for enable access.',
            'Registered successfully'
          );
          this.router.navigate(['login']);
        },
        (error) => {
          console.error('Error registering user:', error);
          this.toastr.error('username already exists, choose another Username');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.');
      this.displayValidationErrors();
    }
  }

  private uniqueValueValidator(type: string): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const value = control.value;
      return this.checkUniqueValue(
        type,
        value,
        `${type.charAt(0).toUpperCase() + type.slice(1)}`
      );
    };
  }

  private checkUniqueValue(
    type: string,
    value: string,
    fieldName: string
  ): Observable<{ [key: string]: any } | null> {
    return this.http
      .get<any[]>(`http://localhost:3000/users?${type}=${value}`)
      .pipe(
        map((res) => {
          if (res.length > 0) {
            const error = { [`${type}Exists`]: true };
            this.toastr.warning(`${fieldName} already exists.`);
            return error;
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  private displayValidationErrors() {
    const passwordControl = this.registerform.get('password');
    const emailControl = this.registerform.get('email');
    const numberControl = this.registerform.get('number');
    const nameControl = this.registerform.get('id');

    if (passwordControl && passwordControl.hasError('pattern')) {
      this.toastr.warning(
        'Password should contain at least one capital letter, one number, and be at least 8 characters long.',
        'Password Requirements'
      );
    }

    if (emailControl && emailControl.hasError('email')) {
      this.toastr.warning('Enter a valid email address.', 'Email Validation');
    }

    if (
      numberControl &&
      (numberControl.hasError('required') ||
        numberControl.hasError('maxlength') ||
        numberControl?.hasError('minlength'))
    ) {
      this.toastr.warning(
        'Enter a valid 10-digit mobile number.',
        'Mobile Number Validation'
      );
    }
    if (nameControl && nameControl.hasError('minlength')) {
      this.toastr.warning('Enter Username with atleast 5 characters');
    }
  }
}
