import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { EditContentComponent } from './post/edit-content/edit-content.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { ContentTypesComponent } from './content-types/content-types.component';

import { ProfileComponent } from './profile/profile.component';
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
