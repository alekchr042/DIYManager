import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/User";
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username, password) {
    return this.http.post<User>(this.baseUrl + 'user/AuthenticateUser', { username, password }).pipe(map((user:any) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/sign-in']);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
}

