import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditContentComponent } from './components/post/edit-content/edit-content.component';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Toast, ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UpdatepopupComponent } from './components/updatepopup/updatepopup.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';

import { ContentTypeFilterPipe } from './pipes/content-type-filter.pipe';
import { ContentTypesComponent } from './components/content-types/content-types.component';

import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,

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
    ProfileComponent,
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
