import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public email: String;
  public password: String;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
    this.email="max@mustermann.de";
    this.password ="123456";
  }

  public checkUser(){
      this.authService.loginUser(this.email, this.password).subscribe(res => {
        console.log(res.user);
        localStorage.setItem("jwt", String(res.jwt));
        localStorage.setItem("user", String(res.user._id));
        //this.router.navigate(["/LbT", res.user._id]);
        this.router.navigate(["/game"]);
      },
      err => {
        alert(err.error);
        console.log(err.error)
      });
  }
  

}
