import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { first } from "rxjs/operators";
import { ProjectsService } from "../logic/services/projects.service";
import { Project } from "../models/project";

@Component({
  selector: "app-edit-project-summary",
  templateUrl: "./edit-project-summary.component.html",
  styleUrls: ["./edit-project-summary.component.css"],
})
export class EditProjectSummaryComponent implements OnInit {
  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;
  // @Output() passEntry: EventEmitter<any> = new EventEmitter();

  _project: Project;
  get project(): Project {
    return this._project;
  }
  @Input() set project(value: Project) {
    this._project = value;
    this.setFormValues();
  }

  //@Input() public project: Project;
  public editProjectForm: FormGroup;

  private uploadedFile;

  constructor(
    public activeModal: NgbActiveModal,
    private projectsService: ProjectsService
  ) {
    this.editProjectForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      startDate: new FormControl(""),
      finishDate: new FormControl(""),
    });
  }

  private setFormValues() {
    this.editProjectForm.patchValue(this.project);
  }

  get name() {
    return this.editProjectForm.get("name");
  }

  get description() {
    return this.editProjectForm.get("description");
  }

  get startDate() {
    return this.editProjectForm.get("startDate");
  }

  get finishDate() {
    return this.editProjectForm.get("finishDate");
  }

  getFileContent() {
    if (this.project != null)
      return "data:image/png;base64," + this.project.thumbnail;
  }

  toggleFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(files: FileList) {
    this.uploadedFile = files.item(0);
  }

  get isThumbnailAttached() {
    var result =
      this.project != null &&
      this.project.thumbnail != null &&
      this.project.thumbnail.length > 0;
    return result;
  }

  onSubmit() {
    if (this.editProjectForm.valid) {
      var newProject = new FormData();

      if (this.uploadedFile != null) {
        newProject.append("File", this.uploadedFile);
      }

      newProject.append("Description", this.description.value);
      newProject.append("Name", this.name.value);
      newProject.append("Id", this.project.id);
      newProject.append("OwnerId", this.project.owner.id);
      newProject.append("StartDate", this.startDate.value);
      newProject.append("FinishDate", this.finishDate.value);
      newProject.append("Thumbnail", this.project.thumbnail);

      this.activeModal.close(newProject);
    }
  }
  ngOnInit() {
    if (this.project != null) {
      this.editProjectForm.patchValue(this.project);
    }
  }
}
