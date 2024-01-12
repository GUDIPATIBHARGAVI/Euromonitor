import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/contents.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  contentList: any[] = [];
  editingContent: any = null;

  contentData: any = {
    title: '',
    description: '',
    author: '',

    date: '',
    tags: '',
    selectedCategory: '',
    content: '',
  };
  imageFile: File | null = null;

  url: string | ArrayBuffer = '';

  content: any[] = [];
  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.loadContentData();
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
}
