import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PP2Component } from './pp2.component';

describe('PP2Component', () => {
  let component: PP2Component;
  let fixture: ComponentFixture<PP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PP2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
