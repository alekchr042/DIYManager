import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Step } from "../models/step";

@Component({
  selector: "app-add-new-step",
  templateUrl: "./add-new-step.component.html",
  styleUrls: ["./add-new-step.component.css"],
})
export class AddNewStepComponent implements OnInit {
  public addStepForm: FormGroup;

  private _step: Step;

  get step(): Step {
    return this._step;
  }

  set step(value: Step) {
    this._step = value;
    this.setInitialValues();
  }

  get name() {
    return this.addStepForm.get("name");
  }

  get isReady() {
    return this.addStepForm.get("isReady");
  }

  constructor(public activeModal: NgbActiveModal) {
    this.addStepForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      isReady: new FormControl(""),
    });
  }

  onSubmit() {
    if (this.addStepForm.valid) {
      var newStep = this.addStepForm.getRawValue();
      if (this.step != null) {
        newStep.id = this.step.id;
      }
      this.activeModal.close(newStep);
    }
  }

  setInitialValues() {
    if (this.step == null) {
      this.isReady.setValue(false);
    } else {
      this.name.setValue(this.step.name);
      this.isReady.setValue(this.step.isReady);
    }
  }

  ngOnInit() {
    this.setInitialValues();
  }
}
