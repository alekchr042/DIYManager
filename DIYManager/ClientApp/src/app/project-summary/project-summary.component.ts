import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Project } from "../models/project";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-project-summary",
  templateUrl: "./project-summary.component.html",
  styleUrls: ["./project-summary.component.css"],
})
export class ProjectSummaryComponent implements OnInit {
  @ViewChild("projectThumbnail", { static: true }) projectThumbnail: ElementRef;
  datePipe: any;
  faEdit = faEdit;
  @Input() set projectInput(value: Project) {
    this.project = value;
    this.setThumbnailContent();
  }

  public project: Project;

  constructor(private router: Router) {}

  ngOnInit() {}

  get isThumbnailAttached() {
    var result =
      this.project.thumbnail != null && this.project.thumbnail.length > 0;
    return result;
  }

  getFileContent() {
    return this.project.thumbnail;
  }

  setThumbnailContent() {
    this.projectThumbnail.nativeElement.src =
      "data:image/png;base64," + this.getFileContent();
  }

  formatDate(date: Date) {
    var result = date.toLocaleDateString("en-US");
    return result;
  }

  editSummary() {
    this.router.navigate(["/edit-project-summary", { id: this.project.id }]);
  }
}
