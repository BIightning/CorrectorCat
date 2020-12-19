import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  
  constructor(private router : Router, private authService : AuthService){}

  canActivateChild(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean{

    if(this.authService.loggedIn()){
      return true
    }
    else{
      this.router.navigate(["/login"]);
      return false
    }
  }
  
}
