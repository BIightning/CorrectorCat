import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/assets/classes/users';
import {UserService} from "../user.service";

@Component({
  selector: 'app-level-view',
  templateUrl: './level-view.component.html',
  styleUrls: ['./level-view.component.css']
})
export class LevelViewComponent implements OnInit {

  currLevel: number;
  user : User;
  

  constructor( private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //todo: get this from service
    this.currLevel = 3;

    document.getElementById("prompt-" +this.currLevel.toString()).classList.add("active-prompt");

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

  async navigateToTutorial(event, promptId: number) {
    if(this.currLevel < promptId) return;

    document.getElementById("scaling-bg-"+ promptId.toString()).classList.add("prompt-animation");
    document.getElementById("super-cat").classList.add("super-cat-fly");
    document.getElementById("prompt-text").classList.add("fade-out");
     await new Promise(resolve => setTimeout(()=> resolve(), 1000)).then(()=> {
       this.router.navigate(["/LbT/" + this.user.id+ "/tutorial"]);
     });
   }

}
