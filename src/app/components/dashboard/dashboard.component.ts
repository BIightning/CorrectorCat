import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../services/user.service";
import { User } from 'src/assets/classes/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 public user : User;
 currLevel: number = 1;

  constructor( private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {  
    console.log("ngoninit");
    this.user = new User();
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.currLevel += this.user.completedLevels;
    });
  }

  onLevelSelected(eventArgs) {
    console.log(eventArgs);
    this.router.navigate(["/game/tutorial/" + eventArgs.selectedLevel.toString()+"/"]);
  }

}
