import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Resource } from "../models/resource";
import { ResourceDTO } from "../models/resourceDTO";

@Component({
  selector: "app-add-new-resource",
  templateUrl: "./add-new-resource.component.html",
  styleUrls: ["./add-new-resource.component.css"],
})
export class AddNewResourceComponent implements OnInit {
  public addResourceForm: FormGroup;

  private _resource: ResourceDTO;

  get resource(): ResourceDTO {
    return this._resource;
  }

  set resource(value: ResourceDTO) {
    this._resource = value;
    this.setInitialValues();
  }

  private _resourceTypes: any[];

  get resourceTypes(): any[] {
    return this._resourceTypes;
  }

  set resourceTypes(value: any[]) {
    this._resourceTypes = value;
  }

  get name() {
    return this.addResourceForm.get("name");
  }

  get manufacturer() {
    return this.addResourceForm.get("manufacturer");
  }

  get type() {
    return this.addResourceForm.get("type");
  }

  get isAvailable() {
    return this.addResourceForm.get("isAvailable");
  }

  get isSharedWithAnotherProject() {
    return this.addResourceForm.get("isSharedWithAnotherProject");
  }

  constructor(public activeModal: NgbActiveModal) {
    this.addResourceForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      manufacturer: new FormControl(""),
      type: new FormControl(""),
      isAvailable: new FormControl(""),
      isSharedWithAnotherProject: new FormControl(""),
    });
  }

  onSubmit() {
    if (this.addResourceForm.valid) {
      var newResource = this.addResourceForm.getRawValue();
      if (this.resource != null) {
        newResource.id = this.resource.id;
      }
      this.activeModal.close(newResource);
    }
  }

  setInitialValues() {
    if (this.resource == null) {
      this.isSharedWithAnotherProject.setValue(false);
      this.isAvailable.setValue(false);
    } else {
      this.name.setValue(this.resource.name);
      this.manufacturer.setValue(this.resource.manufacturer);
      this.type.setValue(this.resource.type);
      this.isSharedWithAnotherProject.setValue(
        this.resource.isSharedWithAnotherProject
      );
      this.isAvailable.setValue(this.resource.isAvailable);
    }
  }

  ngOnInit() {
    this.setInitialValues();
  }
}
