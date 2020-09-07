import { Injectable } from '@angular/core';
import {LoginResponse} from "../../assets/classes/loginResponse";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { 
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }

  public loginUser(email, password) {
    return this.http.post<any>(this.url+"/api/auth", {email : email, password: password});
  }

  public checkId(id : String) : boolean{
    if(id == String(localStorage.getItem("user"))){
      return true
    }
    else{
      return false
    }
  }
  loggedIn(){
    return !!localStorage.getItem("jwt");
  }

  public loginOverId(id : string): Observable<LoginResponse>{
    return this.http.get<LoginResponse>(this.url+"/api/login/" + id);
  }



}
