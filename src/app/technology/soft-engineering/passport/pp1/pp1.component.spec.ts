import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PP1Component } from './pp1.component';

describe('PP1Component', () => {
  let component: PP1Component;
  let fixture: ComponentFixture<PP1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PP1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
