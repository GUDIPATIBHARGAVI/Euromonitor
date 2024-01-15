import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TermsComponent } from './terms.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain terms and conditions text', () => {
    const termsAndConditionsText =
      'The use of our Content Management System (CMS) is subject to the following terms and conditions.';
    const paragraphElement = fixture.debugElement.query(
      By.css('.bg-secondary-theme p')
    ).nativeElement;

    expect(paragraphElement.textContent).toContain(termsAndConditionsText);
  });

  it('should navigate to home on button click', fakeAsync(() => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl');
    const buttonElement = fixture.debugElement.query(
      By.css('.btn-theme')
    ).nativeElement;

    buttonElement.click();
    tick();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  }));
});
