import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
  }

  public getDatabaseStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.url+ '/api/status/db');
  }

  public getGameletServerStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.url+ '/api/status/remoteuser');
  }
}
