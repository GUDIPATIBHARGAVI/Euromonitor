import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgModel, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentTypesComponent } from './content-types.component';
import { ContentTypeService } from '../services/content-type.service';
import { delay, of } from 'rxjs';
import { ContentType } from '../models/content-type.model';
import { HttpClientModule } from '@angular/common/http';
import { ContentTypeFilterPipe } from '../pipes/content-type-filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContentTypeComponent', () => {
  let component: ContentTypesComponent;
  let fixture: ComponentFixture<ContentTypesComponent>;
  let contentTypeService: ContentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentTypesComponent, ContentTypeFilterPipe],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ContentTypeService],
    });

    fixture = TestBed.createComponent(ContentTypesComponent);
    component = fixture.componentInstance;
    contentTypeService = TestBed.inject(ContentTypeService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values set', () => {
    expect(component.selectedFilterOption).toEqual('alphabet');
    expect(component.filterText).toEqual('');
  });

  it('should update selectedFilterOption on filter option change', () => {
    const newFilterOption = 'alphabet';
    component.filterContentTypes();
    expect(component.selectedFilterOption).toEqual(newFilterOption);
  });
});
