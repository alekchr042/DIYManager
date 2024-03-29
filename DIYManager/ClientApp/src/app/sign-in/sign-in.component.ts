import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/User";
import { UserService } from "../logic/UserService";
import { first } from "rxjs/operators";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent {
  faCrow = faCrow;
  private signInForm: FormGroup;
  private userSubject: BehaviorSubject<User>;
  public signInFailed: boolean;
  public user: Observable<User>;

  public userToAuthenticate: AuthenticateUserDTO = {
    username: "",
    password: "",
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.signInForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });

    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );
    this.user = this.userSubject.asObservable();
    this.signInFailed = false;
  }

  get username() {
    return this.signInForm.get("username");
  }

  get password() {
    return this.signInForm.get("password");
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.userToAuthenticate = this.signInForm.getRawValue();
      this.userService
        .login(
          this.userToAuthenticate.username,
          this.userToAuthenticate.password
        )
        .pipe(first())
        .subscribe(
          (data) => {
            this.signInFailed = false;
            this.router.navigate(["/my-projects"]);
          },
          (error) => {
            this.signInFailed = true;
            console.log("error sign in");
          }
        );
    } else console.log("invalid sign in");
  }
}

interface AuthenticateUserDTO {
  username: string;
  password: string;
}
