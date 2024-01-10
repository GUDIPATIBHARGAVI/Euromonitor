import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentTypeService {
  private apiUrl = 'http://localhost:3000/content-types'; // Update the URL accordingly
  private contentTypesSubject = new BehaviorSubject<string[]>([]);
  contentTypes$ = this.contentTypesSubject.asObservable();

  constructor(private http: HttpClient) {}

  addContentType(contentTypeData: { contentType: string }): Observable<any> {
    return this.http.post(this.apiUrl, contentTypeData);
  }

  getContentTypes(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((contentTypes) =>
          contentTypes.map((contentType) => contentType.contentType)
        )
      );
  }
  setContentTypes(contentTypes: string[]): void {
    this.contentTypesSubject.next(contentTypes);
  }
  editContentType(
    oldContentTypeId: number,
    newContentType: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${oldContentTypeId}`;
    const updatedContentType = { contentType: newContentType };

    return this.http.put(url, updatedContentType);
  }

  deleteContentType(contentTypeId: number): Observable<any> {
    const url = `${this.apiUrl}/${contentTypeId}`;
    return this.http.delete(url).pipe(
      tap((response: any) => console.log('Delete Response:', response)),
      catchError((error) => {
        console.error('Delete Error:', error);
        throw error;
      })
    );
  }
}
