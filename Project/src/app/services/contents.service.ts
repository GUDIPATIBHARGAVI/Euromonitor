import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ContentModel } from '../models/content.model';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  public apiUrl = 'http://localhost:3000/contents';

  constructor(private http: HttpClient) {}

  private uploadedMedia: any[] = [];

  addContent(contentData: any): Observable<any> {
    console.log('Sending data to server:', contentData);
    return this.http.post(this.apiUrl, contentData);
  }

  getAllContent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteContent(contentId: number): Observable<void> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.delete<void>(url);
  }
  getContentById(contentId: number): Observable<ContentModel> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.get<ContentModel>(url);
  }

  updateContent(contentData: ContentModel): Observable<ContentModel | null> {
    console.log('Updating data on the server:', contentData);
    const url = `${this.apiUrl}/${contentData.id}`;
    return this.http.put<ContentModel | null>(url, contentData);
  }
  // updateContent(
  //   contentId: number,
  //   contentData: ContentModel
  // ): Observable<ContentModel | null> {
  //   console.log('Updating data on the server:', contentData);
  //   const url = `${this.apiUrl}/${contentId}`;
  //   return this.http.put<ContentModel | null>(url, contentData);
  // }
}
