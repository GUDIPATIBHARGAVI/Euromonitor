import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdatepopupComponent } from './updatepopup.component';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('UpdatepopupComponent', () => {
  let component: UpdatepopupComponent;
  let fixture: ComponentFixture<UpdatepopupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdatepopupComponent>>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'GetAllRole',
      'GetUserbyCode',
      'updateuser',
    ]);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'warning',
    ]);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [UpdatepopupComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { usercode: 'testUserCode' } },
      ],
    });

    fixture = TestBed.createComponent(UpdatepopupComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
