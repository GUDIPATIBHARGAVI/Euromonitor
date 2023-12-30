import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResearchDeptComponent } from './research-dept/research-dept.component';
import { BusinessComponent } from './business/business.component';
import { TechnologyComponent } from './technology/technology.component';
import { CatalystComponent } from './research-dept/catalyst/catalyst.component';
import { OneResearchComponent } from './research-dept/one-research/one-research.component';
import { MarketingComponent } from './business/marketing/marketing.component';
import { SalesComponent } from './business/sales/sales.component';
import { AccountsComponent } from './business/accounts/accounts.component';
import { SoftEngineeringComponent } from './technology/soft-engineering/soft-engineering.component';
import { PublicationComponent } from './technology/publication/publication.component';
import { CloudEngineeringComponent } from './technology/cloud-engineering/cloud-engineering.component';

import { DataTransformComponent } from './technology/soft-engineering/data-transform/data-transform.component';
import { DT1Component } from './technology/soft-engineering/data-transform/dt1/dt1.component';
import { DT2Component } from './technology/soft-engineering/data-transform/dt2/dt2.component';
import { DT3Component } from './technology/soft-engineering/data-transform/dt3/dt3.component';
import { PassportComponent } from './technology/soft-engineering/passport/passport.component';
import { PP1Component } from './technology/soft-engineering/passport/pp1/pp1.component';
import { PP2Component } from './technology/soft-engineering/passport/pp2/pp2.component';
import { PP3Component } from './technology/soft-engineering/passport/pp3/pp3.component';
import { PP4Component } from './technology/soft-engineering/passport/pp4/pp4.component';
import { ISSACComponent } from './technology/soft-engineering/issac/issac.component';
import { EcomComponent } from './technology/soft-engineering/ecom/ecom.component';

@NgModule({
  declarations: [
    AppComponent,
    ResearchDeptComponent,
    BusinessComponent,
    TechnologyComponent,
    CatalystComponent,
    OneResearchComponent,
    MarketingComponent,
    SalesComponent,
    AccountsComponent,
    SoftEngineeringComponent,
    PublicationComponent,
    CloudEngineeringComponent,

    DataTransformComponent,
    DT1Component,
    DT2Component,
    DT3Component,
    PassportComponent,
    PP1Component,
    PP2Component,
    PP3Component,
    PP4Component,
    ISSACComponent,
    EcomComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
