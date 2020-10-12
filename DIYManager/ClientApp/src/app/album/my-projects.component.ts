import { Component, Inject } from "@angular/core";
import { UserService } from "../logic/UserService";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/User";
import { ProjectsService } from "../logic/services/projects.service";
import { Project } from "../models/project";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddProjectModalComponent } from "../add-project-modal/add-project-modal.component";
import { newProjectDTO } from "../models/newProjectDTO";

@Component({
  selector: 'app-album',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent {
  private userId: string;
  public projects: Project[];

  constructor(private projectsService: ProjectsService,
    private userService: UserService,
    private ngbModal: NgbModal,
    private router: Router) {
    this.userService.user.subscribe(user => {
      this.userId = user.id;
    });

    this.getProjects();
  }

  public getProjects() {
    this.projectsService.getAllProjects().subscribe(result => {
      this.projects = result;
    });
  }

  public addProject() {
    this.ngbModal.open(AddProjectModalComponent).result.then(result => {
      console.log(JSON.stringify(result));

      var newProject = new newProjectDTO;
      newProject.name = result.name;
      newProject.description = result.description;
      newProject.owner = this.userService.getCurrentUser;

      this.projectsService.addNewProject(newProject).subscribe(result => {
        if (result != null)
          this.getProjects();
      });
    });
  }
}
