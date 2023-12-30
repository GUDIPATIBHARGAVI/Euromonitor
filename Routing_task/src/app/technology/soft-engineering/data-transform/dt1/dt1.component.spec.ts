import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DT1Component } from './dt1.component';

describe('DT1Component', () => {
  let component: DT1Component;
  let fixture: ComponentFixture<DT1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DT1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DT1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
