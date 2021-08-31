import { Component, Inject } from "@angular/core";
import { faCrow } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../logic/UserService";
import { first } from "rxjs/operators";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent {
  faCrow = faCrow;
  registerForm: FormGroup;
  router: Router;
  errorMessage: string;

  public user: RegisterUserDTO = {
    username: "",
    password: "",
    name: "",
  };

  constructor(private userService: UserService, router: Router) {
    this.router = router;

    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
    });
  }

  get username() {
    return this.registerForm.get("username");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get name() {
    return this.registerForm.get("name");
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.getRawValue();

      this.userService
        .register(this.user.username, this.user.password, this.user.name)
        .pipe(first())
        .subscribe(
          (data) => {
            this.errorMessage = null;
            this.router.navigate(["/fetch-data"]);
          },
          (error) => {
            this.errorMessage = error.error;
          }
        );
    }
  }
}

interface RegisterUserDTO {
  name: string;
  username: string;
  password: string;
}
