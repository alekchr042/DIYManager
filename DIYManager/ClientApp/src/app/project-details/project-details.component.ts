import { Component, Input, OnInit } from "@angular/core";
import { ProjectDetails } from "../models/projectDetails";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectDetailsService } from "../logic/services/project-details.service";
import { EditProjectDetailsComponent } from "../edit-project-details/edit-project-details.component";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails: ProjectDetails;
  faEdit = faEdit;
  constructor(
    private ngbModal: NgbModal,
    private projectDetailsService: ProjectDetailsService
  ) {}

  ngOnInit() {}

  editSummary() {
    var modal = this.ngbModal.open(EditProjectDetailsComponent);

    modal.componentInstance.projectDetails = this.projectDetails;

    modal.result.then((result) => {
      this.projectDetailsService.updateProjectDetails(result).subscribe(() => {
        this.refreshProjectDetails();
      });
    });
  }

  refreshProjectDetails() {
    this.projectDetailsService
      .getProjectDetailsById(this.projectDetails.id)
      .subscribe((result) => {
        this.projectDetails = result;
      });
  }
}
