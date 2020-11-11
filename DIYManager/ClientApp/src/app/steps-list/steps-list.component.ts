import { Component, Input, OnInit } from "@angular/core";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddNewStepComponent } from "../add-new-step/add-new-step.component";
import { StepsService } from "../logic/services/steps.service";
import { Project } from "../models/project";
import { Step } from "../models/step";

@Component({
  selector: "app-steps-list",
  templateUrl: "./steps-list.component.html",
  styleUrls: ["./steps-list.component.css"],
})
export class StepsListComponent implements OnInit {
  private _project: Project;
  faPlusSquare = faPlusSquare;

  get project() {
    return this._project;
  }

  @Input() set project(value: Project) {
    this._project = value;
    this.getAllStepsForProject();
  }

  public steps: Step[];

  constructor(private stepsService: StepsService, private ngbModal: NgbModal) {}

  getAllStepsForProject() {
    if (this.project != null) {
      this.stepsService
        .getAllForProject(this.project.id)
        .subscribe((result) => {
          this.steps = result;
        });
    }
  }

  editStep(step: Step) {
    var modal = this.ngbModal.open(AddNewStepComponent);
    modal.componentInstance.step = step;
    modal.result.then((result: Step) => {
      result.projectId = this.project.id;
      this.stepsService.updateStep(result).subscribe(() => {
        this.getAllStepsForProject();
      });
    });
  }

  addStep() {
    var modal = this.ngbModal.open(AddNewStepComponent);
    modal.result.then((result: Step) => {
      result.projectId = this.project.id;
      this.stepsService.addNewStep(result).subscribe(() => {
        this.getAllStepsForProject();
      });
    });
  }

  ngOnInit() {}
}
