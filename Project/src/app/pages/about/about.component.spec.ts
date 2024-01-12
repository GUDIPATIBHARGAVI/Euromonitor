// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AboutComponent } from './about.component';

// describe('AboutComponent', () => {
//   let component: AboutComponent;
//   let fixture: ComponentFixture<AboutComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AboutComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AboutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
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

  it('should contain key content', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('About Us');
    expect(compiled.querySelector('.text-theme-primary').textContent).toContain(
      'Welcome to our Content Management System'
    );
  });

  it('should display staff members', () => {
    const compiled = fixture.nativeElement;

    const staffMembers = compiled.querySelectorAll('.card-title');
    expect(staffMembers.length).toBe(3);
  });

  it('should navigate to home on button click', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl').and.stub(); // Add and.stub()

    component.navigateToHome();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
  // it('should navigate to contact page on "Contact Us" link click', () => {
  //   const navigateSpy = spyOn((<any>component).router, 'navigateByUrl');

  //   const contactLink = fixture.nativeElement.querySelector(
  //     '[routerLink="/contact"]'
  //   );
  //   contactLink.click();

  //   expect(navigateSpy).toHaveBeenCalledWith('/contact');
  // });
});
