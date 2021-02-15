import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/users';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {UpdateResponse} from 'src/app/classes/updateResponse';

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
    const header = this.generateHeader();
    return this.http.get<User[]>(this.url+"/api/users", {headers: header } );
  }

  public getCurrentUser(): Observable<User>{
    let userId = localStorage.getItem("user");
    return this.http.get<User>(this.url+"/api/users/" + String(userId));
  }

  public getUserbyUsername(userName: string) : Observable<User>{
    return this.http.get<User>(this.url+"/api/userByUserName/" + userName);
  }

  public createUser(user : User): Observable<User>{
    return this.http.post<User>(this.url+"/api/users", user);
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
