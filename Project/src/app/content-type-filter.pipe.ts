// content-type-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentTypeFilter',
})
export class ContentTypeFilterPipe implements PipeTransform {
  transform(
    contentTypes: any[],
    filterText: string,
    filterOption: string
  ): any[] {
    if (!contentTypes || (!filterText && filterText !== '') || !filterOption) {
      return contentTypes;
    }

    const filteredContentTypes = contentTypes.filter((contentType) =>
      contentType.contentType.toLowerCase().includes(filterText.toLowerCase())
    );

    return this.sortContentTypes(filteredContentTypes, filterOption);
  }

  private sortContentTypes(contentTypes: any[], filterOption: string): any[] {
    switch (filterOption) {
      case 'alphabet':
        return contentTypes.sort((a, b) =>
          a.contentType.localeCompare(b.contentType)
        );
      case 'dateModified':
        // Assuming your content type objects have a property like 'lastModified'
        return contentTypes.sort((a, b) => a.lastModified - b.lastModified);
      default:
        return contentTypes;
    }
  }
}
