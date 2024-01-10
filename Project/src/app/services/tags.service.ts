import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) {}

  addTags(tagData: { tag: string }): Observable<any> {
    return this.http.post(this.apiUrl, tagData);
  }

  getTags(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((tags) => tags.map((tag) => tag.tag)));
  }
}
