import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ProjectDetailsService } from "../logic/services/project-details.service";
import { ProjectDetails } from "../models/projectDetails";

@Component({
  selector: "app-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"],
})
export class ProjectOverviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService
  ) {}

  public projectDetails: ProjectDetails;

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get("id");

    this.projectDetailsService
      .getProjectDetails(projectId)
      .pipe(first())
      .subscribe(
        (details) => {
          this.projectDetails = details;
        },
        (error) => {
          console.log("error - get project details");
        }
      );
  }
  // this.userService.login(this.userToAuthenticate.username, this.userToAuthenticate.password).pipe(first())
  // .subscribe(
  //   data => {
  //     this.router.navigate(['/counter']);
  //   },
  //   error => {
  //     console.log('error sign in');
  //   });
}
