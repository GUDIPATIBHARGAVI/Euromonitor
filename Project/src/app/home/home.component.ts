import {
  Component,
  ElementRef,
  HostListener,
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  contentList: any[] = [];
  editingContent: any = null;
  searchText: string = '';
  contentTypes: string[] = [];
  isNavbarOpen: boolean = window.innerWidth >= 1200;
  selectedContentIndex: number | null = null;
  isAscending: boolean = true;
  selectedContentType: string = '';
  isDetailViewOpen: boolean = false;
  filteredContentList: any[] = [];
  selectedContent: any = null;
  @ViewChild('contentCard')
  contentCard!: ElementRef;
  // isNavbarOpen = false;

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
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  loadContentData(): void {
    this.contentService.getAllContent().subscribe(
      (contentList: any[]) => {
        this.contentList = contentList;
        this.filteredContentList = contentList;
      },
      (error: any) => {
        console.error('Error fetching content data', error);
      }
    );

    this.contentTypeService.getContentTypes().subscribe(
      (contentTypes) => {
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

  searchContent() {
    this.filteredContentList = this.contentList;

    if (this.searchText.trim() !== '') {
      this.filteredContentList = this.contentList.filter(
        (content) =>
          content.description
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          content.content.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if (this.filteredContentList.length > 0 && this.contentCard) {
        this.contentCard.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  openContentDetailModal(content: any): void {
    this.selectedContent = content;
    this.dialog.open(HomeComponent, {
      width: '80%',
      data: this.selectedContent,
    });
  }

  openFullscreen(index: number): void {
    this.isDetailViewOpen = true;
    this.selectedContentIndex =
      this.selectedContentIndex === index ? null : index;
  }

  toggleFullscreen(index: number): void {
    this.selectedContentIndex =
      this.selectedContentIndex === index ? null : index;

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
    this.filteredContentList = this.filteredContentList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.isAscending ? dateA - dateB : dateB - dateA;
    });

    this.isAscending = !this.isAscending;
  }
  content = {
    content: 'Your content goes here...',
    selectedContentType: 'Your content type',
  };
  getUserName() {
    return sessionStorage.getItem('username');
  }
  isUserAdmin(): boolean {
    const userrole = sessionStorage.getItem('userrole');
    const username = sessionStorage.getItem('username');

    return userrole === 'admin' && username === 'admin';
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isNavbarOpen = window.innerWidth >= 1200;
  }
}
