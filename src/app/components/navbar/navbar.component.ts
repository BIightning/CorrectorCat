import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../services/user.service";
import { User } from 'src/assets/classes/users';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user : User;
 
  constructor(private route: ActivatedRoute, private userService :UserService) {
   }

  ngOnInit() {
    this.user ={
      email: "",
      password: "",
      name : "",
      gender: "",
      avatar: "",
      points: 0,
      pointsPerBook: undefined,
      id : 0
    }
    this.route.params.subscribe(params => {
      this.userService.getUserbyId(params.userId).subscribe(data =>{
        this.user = data;
      })
    })
  }

  logout(){
    localStorage.removeItem("user");
  }

}
