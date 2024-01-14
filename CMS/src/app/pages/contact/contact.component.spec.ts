import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [FormsModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ContactComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with proper fields', () => {
    const formElement: HTMLFormElement =
      fixture.nativeElement.querySelector('form');
    const nameInput: HTMLInputElement | null =
      formElement.querySelector('#name');
    const emailInput: HTMLInputElement | null =
      formElement.querySelector('#email');
    const subjectInput: HTMLInputElement | null =
      formElement.querySelector('#subject');
    const messageTextarea: HTMLTextAreaElement | null =
      formElement.querySelector('#message');
    const submitButton: HTMLButtonElement | null =
      formElement.querySelector('button');

    expect(formElement).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(subjectInput).toBeTruthy();
    expect(messageTextarea).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should have a "Back to Home" button', () => {
    const backButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('.btn-theme');

    expect(backButton).toBeTruthy();
    expect(backButton.textContent).toContain('Submit');
  });

  it('should call submitForm on form submission', () => {
    spyOn(component, 'submitForm');
    const formElement: HTMLFormElement =
      fixture.nativeElement.querySelector('form');

    formElement.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });
});
