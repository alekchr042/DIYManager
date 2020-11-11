import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProjectDetails } from "../models/projectDetails";

@Component({
  selector: "app-edit-project-details",
  templateUrl: "./edit-project-details.component.html",
  styleUrls: ["./edit-project-details.component.css"],
})
export class EditProjectDetailsComponent implements OnInit {
  _projectDetails: ProjectDetails;
  get projectDetails(): ProjectDetails {
    return this._projectDetails;
  }
  @Input() set projectDetails(value: ProjectDetails) {
    this._projectDetails = value;
    this.setFormValues();
  }

  public editProjectDetailsForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.editProjectDetailsForm = new FormGroup({
      designAuthor: new FormControl(""),
      linkToThePatternShop: new FormControl(""),
    });
  }

  get designAuthor() {
    return this.editProjectDetailsForm.get("designAuthor");
  }

  get linkToThePatternShop() {
    return this.editProjectDetailsForm.get("linkToThePatternShop");
  }

  private setFormValues() {
    if (this.projectDetails != null) {
      this.editProjectDetailsForm.patchValue(this.projectDetails);
    }
  }

  onSubmit() {
    var project = this.editProjectDetailsForm.getRawValue();
    if (this.projectDetails != null) {
      project.id = this.projectDetails.id;
    }

    this.activeModal.close(project);
  }

  ngOnInit() {}
}
