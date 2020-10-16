import { environment } from './../../environments/environment';
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

  public loginOverId(id : string): Observable<LoginResponse>{
    return this.http.get<LoginResponse>(`${this.url}/api/login/${id}`);
  }



}
