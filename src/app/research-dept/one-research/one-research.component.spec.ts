import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneResearchComponent } from './one-research.component';

describe('OneResearchComponent', () => {
  let component: OneResearchComponent;
  let fixture: ComponentFixture<OneResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneResearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
