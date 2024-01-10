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
    // category: '',
    date: '',
    tags: '',
    selectedCategory: '',
    selectedContentType: { contentType: '' },
    content: '',
    image: '',
  };
  // imageFile: File | null = null;
  // mediaFile: File | null = null;
  // videoFile: File | null = null;
  //videoUrl: string | null = null;
  contentTypes: ContentType[] = [];

  categories: string[] = [];
  // url = './assets/images/img1.jpg';
  //url: string | ArrayBuffer = ''; // For image
  // videoUrl: string = ''; // For video
  //  isImageSelected: boolean = false;
  // isVideoSelected: boolean = false;
  url: string | ArrayBuffer = '';
  // videoUrl: any = null; // Use 'any' type to store blob URL
  // isImageSelected: boolean = false;
  // isVideoSelected: boolean = false;
  // videoFile!: File;
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

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  loadContentTypes() {
    // Assuming you have a method to get content types from a service
    // Replace getContentTypeList with the actual method in your service
    this.contentTypeService.getContentTypes().subscribe(
      (contentTypes) => {
        this.contentTypes = contentTypes.map((contentType, index) => ({
          id: index + 1, // replace this with the actual id from your server
          contentType: contentType,
        }));
      },
      (error) => {
        console.error('Error fetching content types', error);
      }
    );
  }

  // onFileSelected(e: Event): void {
  //   const inputElement = e.target as HTMLInputElement;

  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(inputElement.files[0]);
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;

  //       // Update the image property in contentData
  //       this.contentData.image = this.url;
  //     };
  //   }
  // }
  // onFileSelected(e: Event): void {
  //   const inputElement = e.target as HTMLInputElement;

  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const selectedFile = inputElement.files[0];
  //     this.videoFile = inputElement.files[0];
  //     this.previewVideo();
  //     if (selectedFile) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onload = (event: any) => {
  //         this.url = event.target.result;
  //       };
  //     } else {
  //       console.error('No file selected');
  //     }
  //   }
  // }
  // private previewVideo() {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.videoFile!);
  //   reader.onload = (e: any) => {
  //     this.videoUrl = e.target.result;
  //   };
  // }
  onSubmit() {
    if (this.contentForm.invalid) {
      return;
    }

    const contentData: any = {
      title: this.contentData.title,
      description: this.contentData.description,
      author: this.contentData.author,
      date: this.contentData.date,
      tags: this.contentData.tags,
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

  onFileSelected(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(inputElement.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;

        // Update the image property in contentData
        this.contentData.image = this.url;
      };
    }
  }
}
