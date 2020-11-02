import { Component, Input, OnInit } from "@angular/core";
import { ResourceService } from "../logic/services/resource.service";
import { Project } from "../models/project";
import { ResourceDTO } from "../models/resourceDTO";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddNewResourceComponent } from "../add-new-resource/add-new-resource.component";
import { map } from "rxjs/operators";
import { Resource } from "../models/resource";

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
    this.getAllResourcesForProject();
  }

  private _resourceTypes: any[];

  get resourceTypes() {
    return this._resourceTypes;
  }

  set resourceTypes(value: any[]) {
    this._resourceTypes = value;
  }

  public resources: ResourceDTO[];

  constructor(
    private resourceService: ResourceService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit() {
    this.resourceService
      .getResourceTypes()
      .pipe(
        map((resTypes) => {
          const result = [];
          resTypes.forEach((resType, index) => {
            result.push({
              id: index,
              value: resType,
            });
          });
          return result;
        })
      )
      .subscribe((result) => {
        this.resourceTypes = result;
      });
  }

  getAllResourcesForProject() {
    if (this.project != null) {
      this.resourceService
        .getAllForProject(this.project.id)
        .subscribe((result) => {
          this.resources = result;
        });
    }
  }

  refreshResources() {
    this.resourceService
      .getAllForProject(this.project.id)
      .subscribe((result) => {
        this.resources = result;
      });
  }

  addResource() {
    var modal = this.ngbModal.open(AddNewResourceComponent);
    modal.componentInstance.resourceTypes = this.resourceTypes;

    modal.result.then((result: Resource) => {
      result.projectId = this.project.id;
      this.resourceService.addNewResource(result).subscribe(() => {
        this.refreshResources();
      });
    });
  }

  editResource(resource: ResourceDTO) {
    var modal = this.ngbModal.open(AddNewResourceComponent);
    modal.componentInstance.resourceTypes = this.resourceTypes;
    modal.componentInstance.resource = resource;

    modal.result.then((result: Resource) => {
      result.projectId = this.project.id;
      this.resourceService.updateResource(result).subscribe(() => {
        this.refreshResources();
      });
    });
  }
}
