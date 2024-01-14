import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  public addCategory(categoryData: { category: string }): Observable<any> {
    return this.http.post(this.apiUrl, categoryData);
  }

  public getCategories(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((categories) => categories.map((category) => category.category))
      );
  }

  public editCategory(
    oldCategoryId: number,
    newCategory: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${oldCategoryId}`;
    const updatedCategory = { category: newCategory };

    return this.http.put(url, updatedCategory);
  }

  public deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete(url).pipe(
      tap((response: any) => console.log('Delete Respoqsxqnse:', response)),
      catchError((error) => {
        console.error('Delete Error:', error);
        throw error;
      })
    );
  }
}
