import {
  Component,
  ElementRef,
  Input,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ContentService } from '../services/contents.service';
import { ContentTypeService } from '../services/content-type.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  contentList: any[] = []; // Array to store content data
  editingContent: any = null;
  searchText: string = '';
  contentTypes: string[] = [];

  selectedContentIndex: number | null = null;
  isAscending: boolean = true;
  selectedContentType: string = ''; // Property to store the selected content type
  isDetailViewOpen: boolean = false;
  filteredContentList: any[] = []; // Property to store the filtered content
  selectedContent: any = null;
  @ViewChild('contentCard')
  contentCard!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private contentService: ContentService,
    private contentTypeService: ContentTypeService,
    public dialog: MatDialog
  ) {}

  public async logout() {
    try {
      await lastValueFrom(this.authService.logout());
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  ngOnInit(): void {
    this.loadContentData();
  }

  loadContentData(): void {
    this.contentService.getAllContent().subscribe(
      (contentList: any[]) => {
        this.contentList = contentList;
        this.filteredContentList = contentList; // Initialize filtered content list
      },
      (error: any) => {
        console.error('Error fetching content data', error);
      }
    );

    this.contentTypeService.getContentTypes().subscribe(
      (contentTypes) => {
        // Fetch content types from the server
        // and then set them in the shared service
        this.contentTypeService.setContentTypes(contentTypes);
        this.contentTypes = contentTypes;
      },
      (error) => {
        console.error('Error fetching content types', error);
      }
    );
  }

  loadContentTypes(): void {
    this.contentTypeService.getContentTypes().subscribe(
      (contentTypes) => {
        // Fetch content types from the server
        // and then set them in the shared service
        this.contentTypeService.setContentTypes(contentTypes);
        this.contentTypes = contentTypes;
      },
      (error) => {
        console.error('Error fetching content types', error);
      }
    );
  }
  public filterContentByType(): void {
    console.log('Selected Content Type:', this.selectedContentType);

    if (this.selectedContentType) {
      this.filteredContentList = this.contentList.filter(
        (content) => content.selectedContentType === this.selectedContentType
      );
    } else {
      this.filteredContentList = this.contentList;
    }

    console.log('Content List:', this.contentList);
    console.log('Filtered Content List:', this.filteredContentList);
  }

  // searchContent() {
  //   // Implement your search logic here
  //   // For example, filter contentList based on searchText
  //   this.contentList = this.contentList.filter((content) =>
  //     content.description.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }
  searchContent() {
    // Reset filtered content list to the original content list
    this.filteredContentList = this.contentList;

    if (this.searchText.trim() !== '') {
      // If search text is not empty, filter the content list
      this.filteredContentList = this.contentList.filter(
        (content) =>
          content.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          content.content.toLowerCase().includes(this.searchText.toLowerCase())
      );

      // Focus on the first matching content card
      if (this.filteredContentList.length > 0 && this.contentCard) {
        this.contentCard.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  openContentDetailModal(content: any): void {
    this.selectedContent = content; // Set the selected content
    this.dialog.open(HomeComponent, {
      width: '80%', // Adjust the width as needed
      data: this.selectedContent,
    });
  }

  openFullscreen(index: number): void {
    this.isDetailViewOpen = true;
    this.selectedContentIndex =
      this.selectedContentIndex === index ? null : index;
  }

  toggleFullscreen(index: number): void {
    // Toggle the selectedContentIndex
    this.selectedContentIndex =
      this.selectedContentIndex === index ? null : index;

    // Set the selectedContent based on the index
    this.selectedContent =
      this.selectedContentIndex !== null
        ? this.filteredContentList[this.selectedContentIndex]
        : null;
  }

  closeFullscreen(): void {
    this.isDetailViewOpen = false;
    this.selectedContentIndex = null;
  }
  showFullContent = false;

  toggleReadMore() {
    this.showFullContent = !this.showFullContent;
  }
  sortByDate(): void {
    // Toggle the sorting order
    this.filteredContentList = this.filteredContentList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.isAscending ? dateA - dateB : dateB - dateA;
    });

    // Toggle the sorting order for the next click
    this.isAscending = !this.isAscending;
  }
  content = {
    content: 'Your content goes here...',
    selectedContentType: 'Your content type',
  };
  getEmail() {
    return sessionStorage.getItem('email');
  }
}
