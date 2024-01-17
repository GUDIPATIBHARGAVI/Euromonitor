import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from './about.component';
import { Router } from '@angular/router';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the AboutComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display staff members', () => {
    const compiled = fixture.nativeElement;

    const staffMembers = compiled.querySelectorAll('.card-title');
    expect(staffMembers.length).toBe(3);
  });

  it('should navigate to home on button click', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.navigateToHome();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
