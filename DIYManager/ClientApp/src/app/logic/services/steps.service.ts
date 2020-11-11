import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Step } from "src/app/models/step";

@Injectable({
  providedIn: "root",
})
export class StepsService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getAllForProject(projectId: string) {
    return this.http.get<Step[]>(
      this.baseUrl + "step/GetAllForProject/" + projectId
    );
  }

  addNewStep(step: Step) {
    return this.http.post(this.baseUrl + "step/AddNewStep", step);
  }

  updateStep(step: Step) {
    return this.http.post(this.baseUrl + "step/UpdateStep", step);
  }
}
