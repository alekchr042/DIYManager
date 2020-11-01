import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
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
}
