import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  
  constructor(private router : Router, private authService : AuthService){}

  canActivateChild(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean{

    let url = state.url;
    let userId = this.findUserId(url);
    if(this.authService.checkId(userId)){
      return true
    }
    else{
      this.router.navigate(["/login"]);
      return false
    }
  }

  findUserId(url: String): Number{
    let number : string = "";
    for(let i = 0; i < url.length; i++){
      if(isNaN(Number(url[i])) == false){
        number = number + url[i];
        let j = 1;
        while(isNaN(Number(url[i+j])) == false){
          number = number + url[i+j];
          j = j + 1;
        }
        return Number(number)
      }
    }
  }
  
}
