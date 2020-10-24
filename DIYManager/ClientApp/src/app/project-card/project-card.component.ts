import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { Project } from "../models/project";
import { DatePipe } from "@angular/common";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.css"],
})
export class ProjectCardComponent implements OnInit {
  @ViewChild("projectThumbnail", { static: true }) projectThumbnail: ElementRef;

  @Input() project: Project;
  faCrow = faCrow;

  constructor(private datePipe: DatePipe, private router: Router) {}

  get lastModifiedDate() {
    var formatted = this.datePipe.transform(
      this.project.lastModified,
      "yyyy-MM-dd"
    );
    return formatted;
  }

  get isThumbnailAttached() {
    var result =
      this.project.thumbnail != null && this.project.thumbnail.length > 0;
    return result;
  }

  getFileContent() {
    return this.project.thumbnail;
  }

  ngOnInit() {
    this.projectThumbnail.nativeElement.src =
      "data:image/png;base64," + this.getFileContent();
  }

  formatDate(date: Date) {
    var result = date.toLocaleDateString("en-US");
    return result;
  }

  goToProjectDetails() {
    this.router.navigate(["/project-overview", { id: this.project.id }]);
  }
}
