import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { CategoryFilterPipe } from 'src/app/category-filter.pipe';
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

  onSubmit(categoryForm: NgForm) {
    const categoryData = {
      category: categoryForm.value.category,
    };
    this.filterText = '';
    this.categoryService.addCategory(categoryData).subscribe(() => {
      console.log('Category added successfully');
      // Reset the form after submission
      categoryForm.reset();
      this.loadCategories(); // Reload categories after adding a new one
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      // Map the categories to objects with an id property
      this.categories = categories.map((category, index) => ({
        id: index + 1,
        category,
      }));
    });
  }

  // categories.component.ts
  editCategory(category: Category, newCategory: string): void {
    this.categoryService
      .editCategory(category.id, newCategory)
      .subscribe(() => {
        console.log('Category updated successfully');
        this.loadCategories(); // Reload categories after editing
      });
  }
  // categories.component.ts
  toggleEdit(category: Category): void {
    if (this.selectedCategory && this.selectedCategory.id === category.id) {
      // Save changes
      this.editCategory(category, this.selectedCategory.category);
      this.selectedCategory = undefined; // Clear selectedCategory after saving
    } else {
      // Start editing
      this.selectedCategory = { ...category }; // Create a copy to avoid two-way binding issues
    }
  }

  deleteCategory(category: Category): void {
    console.log('Deleting category:', category);

    // Get the category ID from the array
    const categoryId = this.categories.find(
      (c) => c.category === category.category
    )?.id;

    if (!categoryId) {
      console.error('Category ID not found for:', category);
      return;
    }

    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      console.log('Category deleted successfully');
      this.loadCategories(); // Reload categories after deleting
    });
  }
  onFilterOptionChange(option: string): void {
    this.selectedFilterOption = option;
  }
}
