import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Project } from "../models/project";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { EditProjectSummaryComponent } from "../edit-project-summary/edit-project-summary.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectsService } from "../logic/services/projects.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-project-summary",
  templateUrl: "./project-summary.component.html",
  styleUrls: ["./project-summary.component.css"],
})
export class ProjectSummaryComponent implements OnInit {
  @ViewChild("projectThumbnail", { static: true }) projectThumbnail: ElementRef;
  datePipe: any;
  faEdit = faEdit;
  // @Input() set projectInput(value: Project) {
  //   this.project = value;
  //   this.setThumbnailContent();
  // }
  @Input() public project: Project;

  constructor(
    private ngbModal: NgbModal,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {}

  get isThumbnailAttached() {
    var result =
      this.project != null &&
      this.project.thumbnail != null &&
      this.project.thumbnail.length > 0;
    return result;
  }

  getFileContent() {
    if (this.project != null)
      return "data:image/png;base64," + this.project.thumbnail;
  }

  setThumbnailContent() {
    this.projectThumbnail.nativeElement.src =
      "data:image/png;base64," + this.getFileContent();
  }

  formatDate(date: Date) {
    var result = date.toLocaleDateString("en-US");
    return result;
  }

  refreshProject() {
    this.projectsService.getProject(this.project.id).subscribe((proj) => {
      this.project = proj;
    });
  }

  editSummary() {
    //this.router.navigate(["/edit-project-summary", { id: this.project.id }]);
    var modal = this.ngbModal.open(EditProjectSummaryComponent);

    modal.componentInstance.project = this.project;

    modal.result.then((result) => {
      this.projectsService.updateProject(result).subscribe(() => {
        this.refreshProject();
      });
    });
  }
}
