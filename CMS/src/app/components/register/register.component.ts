import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    const url = `http://localhost:3000/users?${type}=${value}`;
    return this.http.get<any[]>(url).pipe(
      map((res) => this.handleDuplicateValue(res, fieldName)),
      catchError(() => of(null))
    );
  }

  private handleDuplicateValue(
    res: any[],
    fieldName: string
  ): { [key: string]: any } | null {
    if (this.hasDuplicate(res)) {
      this.showDuplicateWarning(fieldName);
      return { [`${this.getType(res)}Exists`]: true };
    }
    return null;
  }

  private hasDuplicate(res: any[]): boolean {
    return res.length > 0;
  }

  private showDuplicateWarning(fieldName: string): void {
    this.toastr.warning(`${fieldName} already exists.`);
  }

  private getType(res: any[]): string {
    return res.length > 0 ? 'type' : '';
  }

  private displayValidationErrors() {
    this.displayError(
      'password',
      'Password should contain at least one capital letter, one number, and be at least 8 characters long.',
      'Password Requirements'
    );
    this.displayError(
      'email',
      'Enter a valid email address.',
      'Email Validation'
    );
    this.displayError(
      'number',
      'Enter a valid 10-digit mobile number.',
      'Mobile Number Validation'
    );
    this.displayError('id', 'Enter Username with at least 4 characters');
  }

  private displayError(
    controlName: string,
    errorMessage: string,
    toastrTitle?: string
  ) {
    const control = this.registerform.get(controlName);

    if (control && control.errors) {
      this.toastr.warning(
        errorMessage,
        toastrTitle || this.getDefaultToastrTitle(controlName)
      );
    }
  }

  private getDefaultToastrTitle(controlName: string): string {
    const titleMap: { [key: string]: string } = {
      password: 'Password Requirements',
      email: 'Email Validation',
      number: 'Mobile Number Validation',
      id: 'Username Validation',
    };

    return titleMap[controlName] || 'Validation Error';
  }
}
