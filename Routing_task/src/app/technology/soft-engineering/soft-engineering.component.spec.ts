import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftEngineeringComponent } from './soft-engineering.component';

describe('SoftEngineeringComponent', () => {
  let component: SoftEngineeringComponent;
  let fixture: ComponentFixture<SoftEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoftEngineeringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
