import { Component, Input, OnInit } from "@angular/core";
import { ProjectDetails } from "../models/projectDetails";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectDetailsService } from "../logic/services/project-details.service";
import { EditProjectDetailsComponent } from "../edit-project-details/edit-project-details.component";
import { Project } from "../models/project";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails: ProjectDetails;
  @Input() project: Project;
  faEdit = faEdit;
  constructor(
    private ngbModal: NgbModal,
    private projectDetailsService: ProjectDetailsService
  ) {}

  ngOnInit() {}

  editSummary() {
    var modal = this.ngbModal.open(EditProjectDetailsComponent);

    modal.componentInstance.projectDetails = this.projectDetails;

    modal.result.then((result: ProjectDetails) => {
      if (this.project != null) {
        result.projectId = this.project.id;
        this.projectDetailsService
          .updateProjectDetails(result)
          .subscribe(() => {
            this.refreshProjectDetails();
          });
      }
    });
  }

  refreshProjectDetails() {
    if (this.projectDetails == null && this.project != null) {
      this.projectDetailsService
        .getProjectDetails(this.project.id)
        .subscribe((result) => {
          this.projectDetails = result;
        });
    } else {
      this.projectDetailsService
        .getProjectDetailsById(this.projectDetails.id)
        .subscribe((result) => {
          this.projectDetails = result;
        });
    }
  }
}
