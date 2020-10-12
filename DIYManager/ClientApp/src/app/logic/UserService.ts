import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/User";
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username, password) {
    return this.http.post<User>(this.baseUrl + 'user/AuthenticateUser', { username, password })
      .pipe(map((user: any) => {
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

  isLoggedIn() {
    const user = this.getCurrentUser;

    if (user === null || user === undefined)
      return false;

    var isExpired = this.jwtHelper.isTokenExpired(user.token);

    return !isExpired;
  }

  public get getCurrentUser(): User {
    return this.userSubject.value;
  }
}

