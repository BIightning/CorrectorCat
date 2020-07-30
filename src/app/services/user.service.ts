import { Injectable } from '@angular/core';
import { User } from '../../assets/classes/users';
import { HttpClient} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {CreateResponse} from "../../assets/classes/createResponse";
import {UpdateResponse} from "../../assets/classes/updateResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserbyId(userId: number) : Observable<User>{
    return this.http.get<User>("http://localhost:8080/api/userById/" + String(userId));
  }

  public getUserbyUsername(userName: string) : Observable<User>{
    return this.http.get<User>("http://localhost:8080/api/userByUserName/" + userName);
  }

  public createUser(user : User): Observable<CreateResponse>{
    return this.http.post<CreateResponse>("http://localhost:8080/api/user", user);
  }

  public updateUser(user :User): Observable<UpdateResponse>{
    return this.http.put<UpdateResponse>("http://localhost:8080/api/user/" + user.id , user);
  }

}
