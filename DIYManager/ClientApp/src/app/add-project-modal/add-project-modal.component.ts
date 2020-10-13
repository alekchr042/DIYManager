import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent {

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  public addProjectForm: FormGroup;

  private uploadedFile: any;

  constructor(public activeModal: NgbActiveModal) {
    this.addProjectForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl(''),
      file: new FormControl(''),
    });
  }

  get name() {
    return this.addProjectForm.get("name");
  }

  get description() {
    return this.addProjectForm.get("description");
  }

  toggleFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(files: FileList) {
    this.uploadedFile = files.item(0);
  }

  onSubmit() {
    if (this.addProjectForm.valid) {
      var newProject = new FormData();

      if (this.uploadedFile != null) {
        newProject.append('File', this.uploadedFile);
      }

      newProject.append('Description', this.description.value);
      newProject.append('Name', this.name.value);

      this.activeModal.close(newProject);
    }
  }
}
