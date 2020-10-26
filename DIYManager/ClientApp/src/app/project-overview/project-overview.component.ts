import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { ProjectDetailsService } from "../logic/services/project-details.service";
import { ProjectsService } from "../logic/services/projects.service";
import { Project } from "../models/project";
import { ProjectDetails } from "../models/projectDetails";

@Component({
  selector: "app-project-overview",
  templateUrl: "./project-overview.component.html",
  styleUrls: ["./project-overview.component.css"],
})
export class ProjectOverviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private projectsService: ProjectsService
  ) {}

  public projectDetails: ProjectDetails;

  public project: Project;

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

    this.projectsService
      .getProject(projectId)
      .pipe(first())
      .subscribe(
        (project) => {
          this.project = project;
        },
        (error) => {
          console.log("error - get project data");
        }
      );
  }
}
