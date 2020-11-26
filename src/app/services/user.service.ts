import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../../assets/classes/users';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {CreateResponse} from "../../assets/classes/createResponse";
import {UpdateResponse} from "../../assets/classes/updateResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
  }
  public getUserbyId(userId: string) : Observable<User>{
    console.log(userId);
    return this.http.get<User>(this.url+"/api/users/" + String(userId));
  }

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url+"/api/users");
  }

  public getCurrentUser(): Observable<User>{
    let userId = localStorage.getItem("user");
    return this.http.get<User>(this.url+"/api/users/" + String(userId));
  }

  public getUserbyUsername(userName: string) : Observable<User>{
    return this.http.get<User>(this.url+"/api/userByUserName/" + userName);
  }

  public createUser(user : User): Observable<CreateResponse>{
    return this.http.post<CreateResponse>(this.url+"/api/users", user);
  }

  public updateUser(user :User): Observable<User>{
    return this.http.put<User>(this.url+"/api/users/" + user._id , user);
  }

  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "x-auth-token": localStorage.getItem('jwt')
    });
  }

}
