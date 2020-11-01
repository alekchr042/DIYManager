import { Component, Input, OnInit } from "@angular/core";
import { ResourceService } from "../logic/services/resource.service";
import { Project } from "../models/project";
import { ResourceDTO } from "../models/resourceDTO";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-resource-list",
  templateUrl: "./resource-list.component.html",
  styleUrls: ["./resource-list.component.css"],
})
export class ResourceListComponent implements OnInit {
  private _project: Project;
  faPlusSquare = faPlusSquare;

  get project() {
    return this._project;
  }

  @Input() set project(value: Project) {
    this._project = value;
    this.getProject();
  }
  public resources: ResourceDTO[];

  constructor(private resourceService: ResourceService) {}

  ngOnInit() {}

  getProject() {
    this.resourceService
      .getAllForProject(this.project.id)
      .subscribe((result) => {
        this.resources = result;
      });
  }
}
