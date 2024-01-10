import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentTypeService } from '../services/content-type.service';
import { ContentType } from '../models/content-type.model';
@Component({
  selector: 'app-content-types',
  templateUrl: './content-types.component.html',
  styleUrls: ['./content-types.component.css'],
})
export class ContentTypesComponent implements OnInit {
  contentTypes: ContentType[] = [];
  selectedContentType?: ContentType;
  filterText: string = '';
  selectedFilterOption: string = 'alphabet';

  constructor(private contentTypeService: ContentTypeService) {}

  ngOnInit(): void {
    this.loadContentTypes();
  }

  onSubmit(contentTypeForm: NgForm): void {
    const contentTypeData = {
      contentType: contentTypeForm.value.contentType,
    };
    this.filterText = '';
    this.contentTypeService.addContentType(contentTypeData).subscribe(() => {
      console.log('Content type added successfully');
      // Reset the form after submission
      contentTypeForm.reset();
      this.loadContentTypes(); // Reload content types after adding a new one
    });
  }

  loadContentTypes(): void {
    this.contentTypeService.getContentTypes().subscribe((contentTypes) => {
      // Map the content types to objects with an id property
      this.contentTypes = contentTypes.map((contentType, index) => ({
        id: index + 1,
        contentType,
      }));
    });
  }

  filterContentTypes(): ContentType[] {
    if (
      !this.contentTypes ||
      (!this.filterText && this.filterText !== '') ||
      !this.selectedFilterOption
    ) {
      return this.contentTypes;
    }

    const filteredContentTypes = this.contentTypes.filter((contentType) =>
      contentType.contentType
        .toLowerCase()
        .includes(this.filterText.toLowerCase())
    );

    return this.sortContentTypes(filteredContentTypes);
  }

  private sortContentTypes(contentTypes: ContentType[]): ContentType[] {
    switch (this.selectedFilterOption) {
      case 'alphabet':
        return contentTypes.sort((a, b) =>
          a.contentType.localeCompare(b.contentType)
        );
      // Add other sorting cases if needed
      default:
        return contentTypes;
    }
  }

  toggleEdit(contentType: ContentType): void {
    if (
      this.selectedContentType &&
      this.selectedContentType.id === contentType.id
    ) {
      // Save changes
      this.editContentType(contentType, this.selectedContentType.contentType);
      this.selectedContentType = undefined; // Clear selectedContentType after saving
    } else {
      // Start editing
      this.selectedContentType = { ...contentType }; // Create a copy to avoid two-way binding issues
    }
  }
  editContentType(contentType: ContentType, newContentType: string): void {
    this.contentTypeService
      .editContentType(contentType.id, newContentType)
      .subscribe(() => {
        console.log('Content type updated successfully');
        this.loadContentTypes(); // Reload content types after editing
      });
  }
  deleteContentType(contentType: ContentType): void {
    console.log('Deleting content type:', contentType);

    // Get the content type ID from the array
    const contentTypeId = this.contentTypes.find(
      (ct) => ct.contentType === contentType.contentType
    )?.id;

    if (!contentTypeId) {
      console.error('Content type ID not found for:', contentType);
      return;
    }

    this.contentTypeService.deleteContentType(contentTypeId).subscribe(() => {
      console.log('Content type deleted successfully');
      this.loadContentTypes(); // Reload content types after deleting
    });
  }
}
