import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContentService } from './contents.service';
import { ContentModel } from '../models/content.model';

describe('ContentService', () => {
  let contentService: ContentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentService],
    });

    contentService = TestBed.inject(ContentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(contentService).toBeTruthy();
  });

  it('should add content', () => {
    const mockContentData = {
      id: 1,
      category: 'MockCategory',
      title: 'MockTitle',
      description: 'MockDescription',
    };

    contentService.addContent(mockContentData).subscribe();

    const req = httpTestingController.expectOne(contentService.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockContentData);

    req.flush({});
  });

  it('should get all content', () => {
    const mockContent = [{}];

    contentService.getAllContent().subscribe((content) => {
      expect(content).toEqual(mockContent);
    });

    const req = httpTestingController.expectOne(contentService.apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockContent);
  });

  it('should delete content by ID', () => {
    const contentId = 1;
    const url = `${contentService.apiUrl}/${contentId}`;

    contentService.deleteContent(contentId).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should get content by ID', () => {
    const contentId = 1;
    const mockContent: ContentModel = {
      id: contentId,
      category: '',
      title: '',
      description: '',
      author: '',
      date: '',

      selectedCategory: '',
      content: '',
      image: '',
    };
    const url = `${contentService.apiUrl}/${contentId}`;

    contentService.getContentById(contentId).subscribe((content) => {
      expect(content).toEqual(mockContent);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    req.flush(mockContent);
  });

  it('should update content', () => {
    const mockContentData: ContentModel = {
      id: 1,
      category: 'MockCategory',
      title: 'MockTitle',
      description: 'MockDescription',
      author: '',
      date: '',

      selectedCategory: '',
      content: '',
      image: '',
    };

    contentService.updateContent(mockContentData).subscribe();

    const url = `${contentService.apiUrl}/${mockContentData.id}`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockContentData);

    req.flush({});
  });
});
