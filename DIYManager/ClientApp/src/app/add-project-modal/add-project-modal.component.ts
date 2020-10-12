import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent {

  public addProjectForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
    this.addProjectForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(''),
    });
  }

  get name() {
    return this.addProjectForm.get("name");
  }
  get description() {
    return this.addProjectForm.get("description");
  }

  onSubmit() {
    if (this.addProjectForm.valid) {
      this.activeModal.close(this.addProjectForm.getRawValue());
    }
  }
}
