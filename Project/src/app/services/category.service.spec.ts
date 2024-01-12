import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    categoryService = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  it('should add a category', () => {
    const categoryData = { category: 'Test Category' };

    categoryService.addCategory(categoryData).subscribe();

    const req = httpTestingController.expectOne(categoryService.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(categoryData);

    req.flush({});
  });

  it('should get categories', () => {
    const mockCategories = [
      { category: 'Category 1' },
      { category: 'Category 2' },
    ];

    categoryService.getCategories().subscribe((categories) => {
      expect(categories).toEqual(['Category 1', 'Category 2']);
    });

    const req = httpTestingController.expectOne(categoryService.apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockCategories);
  });

  it('should edit a category', () => {
    const oldCategoryId = 1;
    const newCategory = 'Updated Category';
    const url = `${categoryService.apiUrl}/${oldCategoryId}`;

    categoryService.editCategory(oldCategoryId, newCategory).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ category: newCategory });

    req.flush({});
  });

  it('should delete a category', () => {
    const categoryId = 1;
    const url = `${categoryService.apiUrl}/${categoryId}`;

    categoryService.deleteCategory(categoryId).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});
