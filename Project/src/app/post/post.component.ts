import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/contents.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  contentList: any[] = []; // Array to store content data
  editingContent: any = null;

  contentData: any = {
    title: '',
    description: '',
    author: '',
    // category: '',
    date: '',
    tags: '',
    selectedCategory: '',
    content: '',
  };
  imageFile: File | null = null;

  url: string | ArrayBuffer = '';
  // videoUrl: any = null; // Use 'any' type to store blob URL

  // videoFile: File | null = null;
  // Add this line to your component class
  content: any[] = [];
  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.loadContentData();
    // this.content = this.contentService.getUploadedMedia();
  }

  loadContentData() {
    this.contentService.getAllContent().subscribe(
      (contentList: any[]) => {
        this.contentList = contentList;
      },
      (error: any) => {
        console.error('Error fetching content data', error);
      }
    );
  }
  // editContent(content: any) {
  //   this.editingContent = { ...content };
  // }

  // cancelEdit() {
  //   this.editingContent = null;
  // }

  // saveContent() {
  //   if (!this.editingContent) {
  //     return;
  //   }

  //   this.contentService.updateContent(this.editingContent).subscribe(
  //     () => {
  //       console.log('Content updated successfully.');

  //       this.loadContentData();

  //       this.editingContent = null;
  //     },
  //     (error: any) => {
  //       console.error('Error updating content', error);
  //     }
  //   );
  // }

  deleteContent(contentId: number) {
    this.contentService.deleteContent(contentId).subscribe(
      () => {
        console.log(`Content with ID ${contentId} deleted successfully.`);

        this.loadContentData();
      },
      (error: any) => {
        console.error(`Error deleting content with ID ${contentId}`, error);
      }
    );
  }

  //   isImage(mediaUrl: string): boolean {
  //     return mediaUrl.startsWith('data:img');
  //   }

  //   isVideo(mediaUrl: string): boolean {
  //     return mediaUrl.startsWith('data:video');
  //   }
  // }
  // isImage(url: string): boolean {
  //   return (
  //     !!url &&
  //     (url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.jpg'))
  //   ); // Add more supported image formats as needed
  // }

  // isVideo(videoFile: string): boolean {
  //   return !!videoFile && videoFile.toLowerCase().endsWith('.mp4'); // Adjust based on supported video formats
  // }
}
