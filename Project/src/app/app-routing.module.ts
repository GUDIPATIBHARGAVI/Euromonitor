import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './layout/categories/categories.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { EditContentComponent } from './post/edit-content/edit-content.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';

import { ContentTypesComponent } from './content-types/content-types.component';
const routes: Routes = [
  //{ path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: 'category', component: SingleCategoryComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: NewPostComponent },
  { path: 'edit-content/:id', component: EditContentComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'content-types', component: ContentTypesComponent },

  {
    path: 'user-listing',
    component: UserListingComponent,
  },

  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
