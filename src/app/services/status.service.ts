import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  url: string = "http://localhost:8080";
  constructor(private http: HttpClient) {
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }

  public getDatabaseStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.url+ '/api/status/db');
  }

  public getGameletServerStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.url+ '/api/status/remoteuser');
  }
}
