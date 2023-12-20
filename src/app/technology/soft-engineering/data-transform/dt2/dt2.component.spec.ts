import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DT2Component } from './dt2.component';

describe('DT2Component', () => {
  let component: DT2Component;
  let fixture: ComponentFixture<DT2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DT2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DT2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
