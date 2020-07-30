import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../services/user.service";
import { User } from 'src/assets/classes/users';
import { resolve } from 'url';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 public user : User;
 currLevel: number = 2;

  constructor( private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {  
    this.user = new User();
    let userId = Number(localStorage.getItem("user"));
    this.userService.getUserbyId(userId).subscribe((data) => {
      this.user = data;
    });
  }

  onLevelSelected(eventArgs) {
    console.log(eventArgs);
    this.router.navigate(["/LbT/" + this.user.id+ "/tutorial/" + eventArgs.selectedLevel.toString()+"/"]);
  }

}
