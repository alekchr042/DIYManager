import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ProjectDetails } from "../../models/projectDetails";

@Injectable({
  providedIn: "root",
})
export class ProjectDetailsService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  public getProjectDetails(projectId: string) {
    return this.http.get<ProjectDetails>(
      this.baseUrl + "projectsDetails/getDetailsForProject/" + projectId
    );
  }

  public getProjectDetailsById(projectDetailsId: string) {
    return this.http.get<ProjectDetails>(
      this.baseUrl + "projectsDetails/getDetailsById/" + projectDetailsId
    );
  }

  public updateProjectDetails(projectDetails: ProjectDetails) {
    return this.http.post<ProjectDetails>(
      this.baseUrl + "projectsDetails/update",
      projectDetails
    );
  }
}
