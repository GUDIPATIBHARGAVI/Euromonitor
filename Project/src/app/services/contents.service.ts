// content.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ContentModel } from '../models/content.model';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://localhost:3000/contents'; // Assuming json-server is running on this URL

  constructor(private http: HttpClient) {}
  // videoFile: File | null = null;
  // videoUrl: string | null = null;
  private uploadedMedia: any[] = [];

  addContent(contentData: any): Observable<any> {
    console.log('Sending data to server:', contentData); // Log the data being sent
    return this.http.post(this.apiUrl, contentData);
  }
  // getAllContent(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/contents`);
  // }
  getAllContent(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteContent(contentId: number): Observable<void> {
    const url = `${this.apiUrl}/${contentId}`; // Fix the URL
    return this.http.delete<void>(url);
  }
  getContentById(contentId: number): Observable<ContentModel> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.get<ContentModel>(url);
  }
  // updateContent(contentData: any): Observable<any> {
  //   console.log('Updating data on the server:', contentData);
  //   const url = `${this.apiUrl}/${contentData.id}`;
  //   return this.http.put(url, contentData);
  // }
  updateContent(contentData: ContentModel): Observable<ContentModel | null> {
    console.log('Updating data on the server:', contentData);
    const url = `${this.apiUrl}/${contentData.id}`;
    return this.http.put<ContentModel | null>(url, contentData);
  }

  // uploadVideo(videoFile: File): Observable<any> {
  //   if (!videoFile) {
  //     console.error('No video selected');
  //     return throwError('No video selected');
  //   }

  //   const formData = new FormData();
  //   formData.append('video', videoFile);

  //   if (this.videoUrl) {
  //     return this.http.post<any>(this.videoUrl, formData);
  //   } else {
  //     console.error('Video URL is null');
  //     return throwError('Video URL is null');
  //   }
  // }

  // previewVideo(videoFile: File): Observable<string> {
  //   return new Observable((observer) => {
  //     if (!videoFile) {
  //       observer.error('No video selected');
  //       observer.complete();
  //     }

  //     const reader = new FileReader();
  //     reader.readAsDataURL(videoFile);
  //     reader.onload = (event: any) => {
  //       const videoUrl = event.target.result;
  //       observer.next(videoUrl);
  //       observer.complete();
  //     };
  //   });
  // }
  // setUploadedMedia(media: any) {
  //   this.uploadedMedia.push(media);
  // }

  // getUploadedMedia() {
  //   return this.uploadedMedia;
  // }
  // uploadMedia(mediaFile: File): Observable<any> {
  //   if (!mediaFile) {
  //     console.error('No media file selected');
  //     return throwError('No media file selected');
  //   }

  //   const formData = new FormData();
  //   formData.append('media', mediaFile);

  //   return this.http.post<any>(this.apiUrl, formData);
  // }

  // previewMedia(mediaFile: File): Observable<string> {
  //   return new Observable((observer) => {
  //     if (!mediaFile) {
  //       observer.error('No media file selected');
  //       observer.complete();
  //     }

  //     const reader = new FileReader();
  //     reader.readAsDataURL(mediaFile);
  //     reader.onload = (event: any) => {
  //       const mediaUrl = event.target.result;
  //       observer.next(mediaUrl);
  //       observer.complete();
  //     };
  //   });
  // }
}
