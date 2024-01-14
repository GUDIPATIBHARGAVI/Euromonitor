import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFilterPipe } from '../pipes/category-filter.pipe';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponent, CategoryFilterPipe],
      imports: [FormsModule, HttpClientModule],
      providers: [CategoryService],
    });

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
