import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/services/contents.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ContentTypeService } from 'src/app/services/content-type.service';
import { ContentType } from 'src/app/models/content-type.model';
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css'],
})
export class EditContentComponent implements OnInit {
  contentData: any;
  url: string = '';
  categories: string[] = [];
  // @ViewChild('contentForm')
  contentForm!: NgForm;
  contentTypes: ContentType[] = [];

  constructor(
    private contentService: ContentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private contentTypeService: ContentTypeService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
    const contentId = this.route.snapshot.paramMap.get('id');

    if (contentId !== null) {
      this.contentService.getContentById(Number(contentId)).subscribe(
        (content) => {
          if (!content) {
            console.error('Content not found');
            this.router.navigate(['/post']);
          } else {
            this.contentData = content;
            this.url = content.image as string;
          }
        },
        (error) => {
          console.error('Error fetching content:', error);
          this.router.navigate(['/post']);
        }
      );
    } else {
      console.error('Invalid content ID');
      this.router.navigate(['/post']);
    }
    this.loadContentTypes();
  }

  public onSave() {
    if (this.contentForm && this.contentForm.invalid) {
      return;
    }

    const updatedContent = {
      id: this.contentData.id,
      title: this.contentData.title,
      description: this.contentData.description,
      author: this.contentData.author,
      category: this.contentData.category,
      date: this.contentData.date,

      selectedContentType:
        typeof this.contentData.selectedContentType === 'string'
          ? { contentType: this.contentData.selectedContentType }
          : this.contentData.selectedContentType,

      selectedCategory: this.contentData.selectedCategory,
      content: this.contentData.content,
      image: this.contentData.image,
    };
    if (
      typeof this.contentData.selectedContentType === 'object' &&
      this.contentData.selectedContentType.contentType
    ) {
      updatedContent.selectedContentType = this.contentData.selectedContentType;
    }

    console.log('Updated Content:', updatedContent);
    this.contentService.updateContent(updatedContent).subscribe(() => {
      console.log('Content updated successfully');
      this.router.navigate(['/post']);
    });
  }

  public onUpdate() {
    this.contentService.updateContent(this.contentData);
    //this.router.navigate(['/post']);
  }

  public cancelEdit() {
    this.router.navigate(['/post']);
  }

  public onFileSelected(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(inputElement.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.contentData.image = this.url;
      };
    }
  }
  private loadContentTypes() {
    this.contentTypeService.getContentTypes().subscribe(
      (contentTypes) => {
        this.contentTypes = contentTypes.map((contentType, index) => ({
          id: index + 1,
          contentType: contentType,
        }));
      },
      (error) => {
        console.error('Error fetching content types', error);
      }
    );
  }

  public loadCategories() {
    console.log('Loading categories...');
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
}
