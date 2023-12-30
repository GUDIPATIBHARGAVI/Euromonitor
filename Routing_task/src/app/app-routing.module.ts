import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchDeptComponent } from './research-dept/research-dept.component';
import { BusinessComponent } from './business/business.component';
import { TechnologyComponent } from './technology/technology.component';
import { SoftEngineeringComponent } from './technology/soft-engineering/soft-engineering.component';
import { PublicationComponent } from './technology/publication/publication.component';
import { CloudEngineeringComponent } from './technology/cloud-engineering/cloud-engineering.component';
import { CatalystComponent } from './research-dept/catalyst/catalyst.component';
import { OneResearchComponent } from './research-dept/one-research/one-research.component';
import { MarketingComponent } from './business/marketing/marketing.component';
import { SalesComponent } from './business/sales/sales.component';
import { AccountsComponent } from './business/accounts/accounts.component';
import { DataTransformComponent } from './technology/soft-engineering/data-transform/data-transform.component';
import { PassportComponent } from './technology/soft-engineering/passport/passport.component';
import { ISSACComponent } from './technology/soft-engineering/issac/issac.component';
import { DT1Component } from './technology/soft-engineering/data-transform/dt1/dt1.component';
import { DT2Component } from './technology/soft-engineering/data-transform/dt2/dt2.component';
import { DT3Component } from './technology/soft-engineering/data-transform/dt3/dt3.component';
import { PP1Component } from './technology/soft-engineering/passport/pp1/pp1.component';
import { PP2Component } from './technology/soft-engineering/passport/pp2/pp2.component';
import { PP3Component } from './technology/soft-engineering/passport/pp3/pp3.component';
import { PP4Component } from './technology/soft-engineering/passport/pp4/pp4.component';
import { EcomComponent } from './technology/soft-engineering/ecom/ecom.component';

const routes: Routes = [
  {
    path: 'research-dept',
    component: ResearchDeptComponent,
    children: [
      { path: 'catalyst', component: CatalystComponent },
      { path: 'one-research', component: OneResearchComponent },
      // { path: '', redirectTo: 'research-dept', pathMatch: 'full' },
      //{ path: '', redirectTo: '/research', pathMatch: 'full' },
    ],
  },
  // { path: 'research', loadChildren: () => ResearchRoutingModule },
  // // Add other routes as needed
  // { path: '', redirectTo: '/research', pathMatch: 'full' },
  {
    path: 'business',
    component: BusinessComponent,
    children: [
      { path: 'marketing', component: MarketingComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'accounts', component: AccountsComponent },
    ],
  },
  {
    path: 'technology',
    component: TechnologyComponent,
    children: [
      {
        path: 'soft-engineering',
        component: SoftEngineeringComponent,
        children: [
          {
            path: 'data-transform',
            component: DataTransformComponent,
            children: [
              { path: 'dt1', component: DT1Component },
              { path: 'dt2', component: DT2Component },
              { path: 'dt3', component: DT3Component },
            ],
          },
          {
            path: 'passport',
            component: PassportComponent,
            children: [
              { path: 'pp1', component: PP1Component },
              { path: 'pp2', component: PP2Component },
              { path: 'pp3', component: PP3Component },
              { path: 'pp4', component: PP4Component },
            ],
          },
          { path: 'issac', component: ISSACComponent },
          { path: 'ecom', component: EcomComponent },
        ],
      },
      { path: 'publication', component: PublicationComponent },
      { path: 'cloud-engineering', component: CloudEngineeringComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
