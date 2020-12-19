import { environment } from './../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import {LoginResponse} from 'src/app/classes/loginResponse';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
  }

  public loginUser(email: string, password: string , activityId? : number) {
    return this.http.post<any>(`${this.url}/api/auth`, {email : email, password: password, activityId: activityId});
  }

  // public checkId(id : String) : boolean{
  //   if(id == String(localStorage.getItem("user"))){
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }
  loggedIn(){
    return !!localStorage.getItem("jwt");
  }

  getIsAdmin(){
    let jwtHelper = new JwtHelperService();
    let decoded = jwtHelper.decodeToken(localStorage.getItem("jwt"));

    if(!decoded)
      return false;

    return decoded.isAdmin;
  }


  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "x-auth-token": localStorage.getItem('jwt')
    });
  }



}
