import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Resource } from "src/app/models/resource";
import { ResourceDTO } from "src/app/models/resourceDTO";

@Injectable({
  providedIn: "root",
})
export class ResourceService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getAllForProject(projectId: string) {
    return this.http.get<ResourceDTO[]>(
      this.baseUrl + "resource/GetAllForProject/" + projectId
    );
  }

  getResourceTypes() {
    return this.http.get<string[]>(this.baseUrl + "resource/GetResourceTypes");
  }

  addNewResource(resourceDTO: Resource) {
    return this.http.post(
      this.baseUrl + "resource/AddNewResource",
      resourceDTO
    );
  }

  updateResource(resourceDTO: Resource) {
    return this.http.post(
      this.baseUrl + "resource/UpdateResource",
      resourceDTO
    );
  }
}
