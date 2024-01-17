import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsComponent } from './components/pages/terms/terms.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AboutComponent } from './components/pages/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { EditContentComponent } from './components/post/edit-content/edit-content.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ContentTypesComponent } from './components/content-types/content-types.component';

import { ProfileComponent } from './components/profile/profile.component';
import { homedir } from 'os';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-content/:id',
    component: EditContentComponent,
    canActivate: [AuthGuard],
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'content-types',
    component: ContentTypesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'user-listing',
    component: UserListingComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: '* *', component: HomeComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
