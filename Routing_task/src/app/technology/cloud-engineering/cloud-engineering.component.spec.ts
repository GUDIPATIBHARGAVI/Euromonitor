import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudEngineeringComponent } from './cloud-engineering.component';

describe('CloudEngineeringComponent', () => {
  let component: CloudEngineeringComponent;
  let fixture: ComponentFixture<CloudEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudEngineeringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
