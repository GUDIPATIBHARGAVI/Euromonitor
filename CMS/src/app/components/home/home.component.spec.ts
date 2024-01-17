import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HomeComponent } from './home.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ContentService } from '../services/contents.service';
import { ContentTypeService } from '../services/content-type.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, HttpClientModule, MatDialogModule],
      providers: [
        AuthService,
        Router,
        ContentService,
        ContentTypeService,
        MatDialog,
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
