import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { PagesComponent } from './pages/pages.component';

import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './layout/categories/categories.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditContentComponent } from './post/edit-content/edit-content.component';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { HomeComponent } from './home/home.component';

import { CategoryFilterPipe } from './category-filter.pipe';

import { ContentTypeFilterPipe } from './content-type-filter.pipe';
import { ContentTypesComponent } from './content-types/content-types.component';
import { ModalComponent } from './modal/modal.component';
import { SortDatePipe } from './sort-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,

    PagesComponent,
    HomeComponent,

    TermsComponent,
    ContactComponent,
    AboutComponent,
    DashboardComponent,
    EditContentComponent,
    CategoriesComponent,
    PostComponent,
    NewPostComponent,

    RegisterComponent,
    LoginComponent,
    UserListingComponent,
    UpdatepopupComponent,

    CategoryFilterPipe,

    ContentTypeFilterPipe,
    ContentTypesComponent,
    ModalComponent,
    SortDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
