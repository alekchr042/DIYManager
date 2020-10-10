import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faCrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  faCrow = faCrow;
  //public user: User;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //http.get<User[]>(baseUrl + 'user/1').subscribe(result => {
    //  this.users = result;
    //}, error => console.error(error));
  }
}

//interface User {
//  name: string;
//  password: string
//  number: number;
//}
