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
    this.user = new User();
      this.userService.getCurrentUser().subscribe(data =>{
        this.user = data;
      })
  
  }

  logout(){
    localStorage.removeItem("user");
  }

}
