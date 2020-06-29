import { Injectable } from '@angular/core';
import {LoginResponse} from "../assets/classes/loginResponse";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public loginUser(userName, password): Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:8080/api/login", {username : userName, password: password});
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
    return this.http.get<LoginResponse>("http://localhost:8080/api/login/" + id);
  }



}
