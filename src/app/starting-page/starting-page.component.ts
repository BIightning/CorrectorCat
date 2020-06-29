import { Component, OnInit } from '@angular/core';
import { user } from 'dist/correctorcat/assets/classes/users';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.css']
})
export class StartingPageComponent implements OnInit {
  catFlying: boolean;
  superCatImage2: boolean;
  constructor(private router : Router, private authService : AuthService) { }

  private UrlName = "LbT";

  ngOnInit() {
    this.isUserKnow()
  }

  public isUserKnow(){
    let userId = localStorage.getItem("user");
    this.authService.loginOverId(userId).subscribe((data)=>{
      if(data.isFound){
        console.log("User Found");
        this.router.navigateByUrl(this.UrlName + "/" + userId);
      }
      else{
        console.log("User not Found");
      }
    });
  }

  async onSuperCatClick() {
    if (!this.catFlying) {
      this.catFlying = true;
      await new Promise(resolve => setTimeout(() => resolve(), 1600)).then(() => this.changeImage());
      await new Promise(resolve => setTimeout(() => resolve(), 1400)).then(() => this.catFlying = false);
    }

  }
  changeImage() {
    if (Math.floor((Math.random() * 4)) == 1) {
      this.superCatImage2 = !this.superCatImage2;
    }
    else {
      this.superCatImage2 = false;
    }
  }


}
