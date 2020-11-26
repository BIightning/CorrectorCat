import { environment } from './../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import {LoginResponse} from "../../assets/classes/loginResponse";
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

  public loginUser(email, password) {
    return this.http.post<any>(`${this.url}/api/auth`, {email : email, password: password});
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

  /*
  public loginOverId(id : string): Observable<LoginResponse>{
    return this.http.get<LoginResponse>(`${this.url}/api/login/${id}`);
  }
  */

  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "x-auth-token": localStorage.getItem('jwt')
    });
  }



}
