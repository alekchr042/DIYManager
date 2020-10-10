import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  faCrow = faCrow;
  registerForm: FormGroup;
  http: HttpClient;
  baseUrl: string;
  router: Router;

  public user: RegisterUserDTO = {
    username: '',
    password: '',
    name: '',
  };

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, router: Router) {
    //http.get<User[]>(baseUrl + 'user/1').subscribe(result => {
    //  this.users = result;
    //}, error => console.error(error));
    this.http = http;
    this.baseUrl = baseUrl;
    this.router = router;

    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
    });

    //this.username.valueChanges.subscribe(value => {
    //  this.user.username = value;
    //});

    //this.password.valueChanges.subscribe(value => {
    //  this.user.password = value;
    //});

    //this.name.valueChanges.subscribe(value => {
    //  this.user.name = value;
    //});
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

      console.log(JSON.stringify(this.registerForm.value));
      this.user = this.registerForm.getRawValue();

      this.http.post(this.baseUrl + "user/CreateNewUser", this.user).subscribe((res : any) => {
        if (res.status = 200) {
          this.router.navigate(['/fetch-data']);
        }
      });
    }
    else console.log("invalid");

    console.log(this.user.username);
  }
}

interface RegisterUserDTO {
  name: string;
  username: string
  password: string;
}
