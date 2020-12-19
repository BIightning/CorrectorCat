import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public email: string = "";
  public password: string ="";
  public activityId: number;

  constructor(
    private authService : AuthService, 
    private router : Router,  
    private route: ActivatedRoute
  ) 
  { }

  ngOnInit() {
    this.email="max@mustermann.de";
    this.password ="123456";
    this.route.queryParams.subscribe(params => {
      let id = params['activityid'];

      if(id)
        this.activityId = id;
    });
  }

  public checkUser(){
      this.authService.loginUser(this.email, this.password, this.activityId).subscribe(res => {
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
