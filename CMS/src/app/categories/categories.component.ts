import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { CategoryFilterPipe } from 'src/app/pipes/category-filter.pipe';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory?: Category;
  filterText: string = '';
  selectedFilterOption: string = 'alphabet';
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  public onSubmit(categoryForm: NgForm) {
    const categoryData = {
      category: categoryForm.value.category,
    };
    this.filterText = '';
    this.categoryService.addCategory(categoryData).subscribe(() => {
      console.log('Category added successfully');

      categoryForm.reset();
      this.loadCategories();
    });
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories.map((category, index) => ({
        id: index + 1,
        category,
      }));
    });
  }

  public editCategory(category: Category, newCategory: string): void {
    this.categoryService
      .editCategory(category.id, newCategory)
      .subscribe(() => {
        console.log('Category updated successfully');
        this.loadCategories();
      });
  }

  public toggleEdit(category: Category): void {
    if (this.selectedCategory && this.selectedCategory.id === category.id) {
      this.editCategory(category, this.selectedCategory.category);
      this.selectedCategory = undefined;
    } else {
      this.selectedCategory = { ...category };
    }
  }

  public deleteCategory(category: Category): void {
    console.log('Deleting category:', category);

    const categoryId = this.categories.find(
      (c) => c.category === category.category
    )?.id;

    if (!categoryId) {
      console.error('Category ID not found for:', category);
      return;
    }

    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      console.log('Category deleted successfully');
      this.loadCategories();
    });
  }
  public onFilterOptionChange(option: string): void {
    this.selectedFilterOption = option;
  }
}
