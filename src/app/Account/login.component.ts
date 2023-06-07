import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../Shared/Models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  flag:boolean = false;
  constructor() { }

  invalidLogin:boolean = false;

  Login(form:NgForm){

  }
  loginData:Login = {
    email: "",
    password: ""
  }
}
