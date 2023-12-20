import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISSACComponent } from './issac.component';

describe('ISSACComponent', () => {
  let component: ISSACComponent;
  let fixture: ComponentFixture<ISSACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ISSACComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ISSACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
