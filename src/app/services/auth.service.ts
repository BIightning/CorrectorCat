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

  public loginUser(userName, password): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url+"/api/login", {username : userName, password: password});
  }

  public checkId(id : Number) : boolean{
    if(id == Number(localStorage.getItem("user"))){
      return true
    }
    else{
      return false
    }
  }

  public loginOverId(id : string): Observable<LoginResponse>{
    return this.http.get<LoginResponse>(this.url+"/api/login/" + id);
  }



}
