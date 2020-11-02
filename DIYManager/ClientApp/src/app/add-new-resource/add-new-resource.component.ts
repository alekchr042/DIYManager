import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Resource } from "../models/resource";

@Component({
  selector: "app-add-new-resource",
  templateUrl: "./add-new-resource.component.html",
  styleUrls: ["./add-new-resource.component.css"],
})
export class AddNewResourceComponent implements OnInit {
  public addResourceForm: FormGroup;

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

  get isShared() {
    return this.addResourceForm.get("isShared");
  }

  constructor(public activeModal: NgbActiveModal) {
    this.addResourceForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      manufacturer: new FormControl(""),
      type: new FormControl(""),
      isAvailable: new FormControl(""),
      isShared: new FormControl(""),
    });
  }

  onSubmit() {
    if (this.addResourceForm.valid) {
      var newResource = this.addResourceForm.getRawValue();
      this.activeModal.close(newResource);
    }
  }

  setInitialValues() {
    this.isShared.setValue(false);
    this.isAvailable.setValue(false);
  }

  ngOnInit() {
    this.setInitialValues();
  }
}
