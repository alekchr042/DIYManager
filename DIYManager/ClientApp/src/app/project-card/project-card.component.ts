import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Project } from "../models/project";
import { DatePipe } from "@angular/common";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmDeleteModalComponent } from "../confirm-delete-modal/confirm-delete-modal.component";
import { ProjectsService } from "../logic/services/projects.service";
import { first } from "rxjs/operators";
import { emit } from "process";

@Component({
  selector: "app-project-card",
  templateUrl: "./project-card.component.html",
  styleUrls: ["./project-card.component.css"],
})
export class ProjectCardComponent implements OnInit {
  @ViewChild("projectThumbnail", { static: true }) projectThumbnail: ElementRef;
  @Input() project: Project;
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();
  faCrow = faCrow;

  constructor(
    private router: Router,
    private ngbModal: NgbModal,
    private projectsService: ProjectsService
  ) {}

  get isThumbnailAttached() {
    var result =
      this.project.thumbnail != null && this.project.thumbnail.length > 0;
    return result;
  }

  getFileContent() {
    return this.project.thumbnail;
  }

  ngOnInit() {
    this.projectThumbnail.nativeElement.src =
      "data:image/png;base64," + this.getFileContent();
  }

  formatDate(date: Date) {
    var result = date.toLocaleDateString("en-US");
    return result;
  }

  goToProjectDetails() {
    this.router.navigate(["/project-overview", { id: this.project.id }]);
  }

  deleteProject() {
    this.ngbModal
      .open(ConfirmDeleteModalComponent)
      .result.then((result: Boolean) => {
        if (result) {
          this.projectsService
            .deleteProject(this.project.id)
            .pipe(first())
            .subscribe(() => {
              this.notifyDelete.emit();
            });
        }
      });
  }
}
