import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/User';
import { Project } from '../../models/project';
import { newProjectDTO } from '../../models/newProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public user: Observable<User>;
  public projects: Project[];


  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    var userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));

    this.user = userSubject.asObservable();
  }

  getAllProjects() {
    return this.http.get<Project[]>(this.baseUrl + 'projects');
  }

  addNewProject(newProject: FormData) {
    return this.http.post(this.baseUrl + 'projects/AddNewProject', newProject);
  }
}
