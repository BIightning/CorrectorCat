import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../user.service";
import { User } from 'src/assets/classes/users';
import { resolve } from 'url';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 public user : User;

  constructor( private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user ={
      email: "",
      password: "",
      name : "",
      gender: "",
      avatar: "",
      points: 0,
      pointsPerBook: [undefined],
      id : 0
    }
    let userId = Number(localStorage.getItem("user"));
    this.userService.getUserbyId(userId).subscribe((data) => {
      this.user = data;
    });
  }

}
