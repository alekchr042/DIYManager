import { Component, Input, OnInit } from "@angular/core";
import { ProjectDetails } from "../models/projectDetails";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() projectDetails: ProjectDetails;

  constructor() {}

  ngOnInit() {}
}
