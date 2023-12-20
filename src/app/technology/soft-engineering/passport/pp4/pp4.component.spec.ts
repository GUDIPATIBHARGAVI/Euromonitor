import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PP4Component } from './pp4.component';

describe('PP4Component', () => {
  let component: PP4Component;
  let fixture: ComponentFixture<PP4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PP4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PP4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
