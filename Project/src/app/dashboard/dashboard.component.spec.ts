import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three cards with correct routerLinks', () => {
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(3);

    const routerLinks = ['/categories', '/post', '/content-types'];

    cards.forEach((card: Element, index: number) => {
      const routerLink = card.getAttribute('ng-reflect-router-link');
      expect(routerLink).toBe(routerLinks[index]);
    });
  });

  it('should navigate to home', () => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl').and.stub();

    component.redirectToHome();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
