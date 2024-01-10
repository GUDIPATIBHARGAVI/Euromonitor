import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(
    categories: any[],
    filterText: string,
    filterOption: string
  ): any[] {
    if (!categories || (!filterText && filterText !== '') || !filterOption) {
      return categories;
    }

    const filteredCategories = categories.filter((category) =>
      category.category.toLowerCase().includes(filterText.toLowerCase())
    );

    return this.sortCategories(filteredCategories, filterOption);
  }

  private sortCategories(categories: any[], filterOption: string): any[] {
    switch (filterOption) {
      case 'alphabet':
        return categories.sort((a, b) => a.category.localeCompare(b.category));
      case 'dateModified':
        // Assuming your category objects have a property like 'lastModified'
        return categories.sort((a, b) => a.lastModified - b.lastModified);
      default:
        return categories;
    }
  }
}
