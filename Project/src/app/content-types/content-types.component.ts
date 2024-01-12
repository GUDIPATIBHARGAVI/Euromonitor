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

      contentTypeForm.reset();
      this.loadContentTypes();
    });
  }

  loadContentTypes(): void {
    this.contentTypeService.getContentTypes().subscribe((contentTypes) => {
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

      default:
        return contentTypes;
    }
  }

  toggleEdit(contentType: ContentType): void {
    if (
      this.selectedContentType &&
      this.selectedContentType.id === contentType.id
    ) {
      this.editContentType(contentType, this.selectedContentType.contentType);
      this.selectedContentType = undefined;
    } else {
      this.selectedContentType = { ...contentType };
    }
  }
  editContentType(contentType: ContentType, newContentType: string): void {
    this.contentTypeService
      .editContentType(contentType.id, newContentType)
      .subscribe(() => {
        console.log('Content type updated successfully');
        this.loadContentTypes();
      });
  }
  deleteContentType(contentType: ContentType): void {
    console.log('Deleting content type:', contentType);

    if (contentType.id === undefined) {
      console.error('Content type ID not found for:', contentType);
      return;
    }

    this.contentTypeService.deleteContentType(contentType.id).subscribe(() => {
      console.log('Content type deleted successfully');
      this.loadContentTypes();
    });
  }
}
