import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/services/contents.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ContentTypeService } from 'src/app/services/content-type.service';
import { ContentType } from 'src/app/models/content-type.model';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  @ViewChild('contentForm') contentForm!: NgForm;

  contentData: any = {
    title: '',
    description: '',
    author: '',

    date: '',

    selectedCategory: '',
    selectedContentType: { contentType: '' },
    content: '',
    image: '',
  };

  contentTypes: ContentType[] = [];

  categories: string[] = [];

  url: string | ArrayBuffer = '';

  constructor(
    private contentService: ContentService,
    private categoryService: CategoryService,
    private contentTypeService: ContentTypeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.loadContentTypes();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
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

  public onSubmit() {
    if (this.contentForm.invalid) {
      return;
    }

    const contentData: any = {
      title: this.contentData.title,
      description: this.contentData.description,
      author: this.contentData.author,
      date: this.contentData.date,

      selectedCategory: this.contentData.selectedCategory,
      selectedContentType: this.contentData.selectedContentType.contentType,
      content: this.contentData.content,
      image: this.contentData.image,
    };

    this.contentService.addContent(contentData).subscribe(() => {
      console.log('Content added successfully');
      this.contentForm.resetForm();
    });
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
}
