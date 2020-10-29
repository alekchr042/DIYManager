import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../models/User";
import { Project } from "../../models/project";
import { newProjectDTO } from "../../models/newProjectDTO";
import { UserService } from "../UserService";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private userService: UserService
  ) {}

  getAllProjects() {
    var user = this.userService.getCurrentUser;
    return this.http.get<Project[]>(this.baseUrl + "projects/" + user.id);
  }

  addNewProject(newProject: FormData) {
    return this.http.post(this.baseUrl + "projects/AddNewProject", newProject);
  }

  getProject(projectId: string) {
    return this.http.get<Project>(this.baseUrl + "projects/get/" + projectId);
  }

  updateProject(projectToUpdate: FormData) {
    return this.http.post(
      this.baseUrl + "projects/UpdateProject",
      projectToUpdate
    );
  }
}
