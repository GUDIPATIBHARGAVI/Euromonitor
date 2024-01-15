import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on button click', () => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl');
    const buttonDebugElement = fixture.debugElement.query(
      By.css('.custom-button')
    );

    if (buttonDebugElement) {
      buttonDebugElement.triggerEventHandler('click', null);

      expect(navigateSpy).toHaveBeenCalledWith('/home');
    } else {
      fail(
        'Button element with class "custom-button" not found in the template'
      );
    }
  });

  it('should retrieve user email from sessionStorage', () => {
    const userEmail = 'test@example.com';
    spyOn(sessionStorage, 'getItem').and.returnValue(userEmail);

    const result = component.getUserEmail();

    expect(result).toBe(userEmail);
  });

  it('should retrieve user number from sessionStorage', () => {
    const userNumber = '1234567890';
    spyOn(sessionStorage, 'getItem').and.returnValue(userNumber);

    const result = component.getUserNumber();

    expect(result).toBe(userNumber);
  });

  it('should retrieve username from sessionStorage', () => {
    const username = 'testuser';
    spyOn(sessionStorage, 'getItem').and.returnValue(username);

    const result = component.getUserName();

    expect(result).toBe(username);
  });

  it('should retrieve user role from sessionStorage', () => {
    const userRole = 'admin';
    spyOn(sessionStorage, 'getItem').and.returnValue(userRole);

    const result = component.getUserRole();

    expect(result).toBe(userRole);
  });
});
