import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../logic/UserService';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  faCrow = faCrow;
  //http: HttpClient;
  //baseUrl: string;
  //router: Router;
  private signInForm: FormGroup;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  public userToAuthenticate: AuthenticateUserDTO = {
    username: '',
    password: '',
  };

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    private userService: UserService) {
    //http.get<User[]>(baseUrl + 'user/1').subscribe(result => {
    //  this.users = result;
    //}, error => console.error(error));
    //this.http = http;
    //this.baseUrl = baseUrl;
    //this.router = router;

    this.signInForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
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
      this.userService.login(this.userToAuthenticate.username, this.userToAuthenticate.password).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/counter']);
          },
          error => {
            console.log('error sign in');
          });
    }
    //  this.http.post(this.baseUrl + 'user/AuthenticateUser', this.userToAuthenticate).subscribe((res: any) => {
    //    if (res.status = 200) {
    //      localStorage.setItem('user', JSON.stringify(res.value));
    //      this.userSubject.next(res.value);
    //      this.router.navigate(['/counter']);
    //      return res.value;
    //    }
    //  })
    //}
    else console.log("invalid sign in");
  }
}

interface AuthenticateUserDTO {
  username: string;
  password: string
}
