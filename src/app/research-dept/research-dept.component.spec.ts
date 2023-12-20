import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchDeptComponent } from './research-dept.component';

describe('ResearchDeptComponent', () => {
  let component: ResearchDeptComponent;
  let fixture: ComponentFixture<ResearchDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchDeptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
