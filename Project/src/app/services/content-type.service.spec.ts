import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContentTypeService } from './content-type.service';

describe('ContentTypeService', () => {
  let contentTypeService: ContentTypeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentTypeService],
    });

    contentTypeService = TestBed.inject(ContentTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(contentTypeService).toBeTruthy();
  });

  it('should add a content type', () => {
    const contentTypeData = { contentType: 'Test Content Type' };

    contentTypeService.addContentType(contentTypeData).subscribe();

    const req = httpTestingController.expectOne(contentTypeService.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(contentTypeData);

    req.flush({});
  });

  it('should get content types', () => {
    const mockContentTypes = [
      { contentType: 'Type 1' },
      { contentType: 'Type 2' },
    ];

    contentTypeService.getContentTypes().subscribe((contentTypes) => {
      expect(contentTypes).toEqual(['Type 1', 'Type 2']);
    });

    const req = httpTestingController.expectOne(contentTypeService.apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockContentTypes);
  });

  it('should set content types', () => {
    const mockContentTypes = ['Type 1', 'Type 2'];

    contentTypeService.setContentTypes(mockContentTypes);

    contentTypeService.contentTypes$.subscribe((contentTypes) => {
      expect(contentTypes).toEqual(mockContentTypes);
    });
  });

  it('should edit a content type', () => {
    const oldContentTypeId = 1;
    const newContentType = 'Updated Content Type';
    const url = `${contentTypeService.apiUrl}/${oldContentTypeId}`;

    contentTypeService
      .editContentType(oldContentTypeId, newContentType)
      .subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ contentType: newContentType });

    req.flush({});
  });

  it('should delete a content type', () => {
    const contentTypeId = 1;
    const url = `${contentTypeService.apiUrl}/${contentTypeId}`;

    contentTypeService.deleteContentType(contentTypeId).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});
