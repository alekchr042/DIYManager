import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { JwtInterceptor } from "./logic/jwt-token-interceptor";
import { MyProjectsComponent } from "./album/my-projects.component";
import { AuthGuard } from "./logic/AuthGuard";
import { ProjectCardComponent } from "./project-card/project-card.component";
import { AddProjectModalComponent } from "./add-project-modal/add-project-modal.component";
import { DatePipe } from "@angular/common";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectSummaryComponent } from "./project-summary/project-summary.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { EditProjectSummaryComponent } from "./edit-project-summary/edit-project-summary.component";
import { EditProjectDetailsComponent } from "./edit-project-details/edit-project-details.component";
import { ResourceListComponent } from "./resource-list/resource-list.component";
import { ResourceItemComponent } from "./resource-item/resource-item.component";
import { AddNewResourceComponent } from "./add-new-resource/add-new-resource.component";
import { StepsListComponent } from "./steps-list/steps-list.component";
import { StepsItemComponent } from "./steps-item/steps-item.component";
import { AddNewStepComponent } from "./add-new-step/add-new-step.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SignInComponent,
    SignUpComponent,
    MyProjectsComponent,
    ProjectCardComponent,
    AddProjectModalComponent,
    ProjectOverviewComponent,
    ProjectSummaryComponent,
    ProjectDetailsComponent,
    EditProjectSummaryComponent,
    EditProjectDetailsComponent,
    ResourceListComponent,
    ResourceItemComponent,
    AddNewResourceComponent,
    StepsListComponent,
    StepsItemComponent,
    AddNewStepComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      {
        path: "fetch-data",
        component: FetchDataComponent,
        canActivate: [AuthGuard],
      },
      { path: "sign-in", component: SignInComponent },
      { path: "sign-up", component: SignUpComponent },
      {
        path: "my-projects",
        component: MyProjectsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "project-overview",
        component: ProjectOverviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "edit-project-summary",
        component: EditProjectSummaryComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  entryComponents: [
    AddProjectModalComponent,
    EditProjectSummaryComponent,
    EditProjectDetailsComponent,
    AddNewResourceComponent,
    AddNewStepComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
