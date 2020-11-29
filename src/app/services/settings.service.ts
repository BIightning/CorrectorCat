import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Settings, AdminLevelSettings } from 'src/app/classes/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
  }

  public getSettings(): Observable<Settings> {
    const headerOption = { headers: this.generateHeader() };
    return this.http.get<Settings>(`${this.url}/api/settings`);
  }

  public getAdminLevelSettings(): Observable<AdminLevelSettings> {
    const headerOption = { headers: this.generateHeader() };
    return this.http.get<AdminLevelSettings>(`${this.url}/api/settings/admin`, headerOption);
  }
  
  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "x-auth-token": localStorage.getItem('jwt')
    });
  }
}
