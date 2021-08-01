import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Settings, AdminLevelSettings } from 'src/app/classes/settings';
import { TranslocoService } from '@ngneat/transloco';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  url: string;

  constructor(
    private http: HttpClient, 
    translocoService: TranslocoService) { 
    this.url = environment.baseUrl;
  }

  public getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${this.url}/api/settings`);
  }

  public saveSettings(settings: AdminLevelSettings): Observable<AdminLevelSettings> {
    const headerOption = { headers: this.generateHeader(true) };
    const body = JSON.stringify(settings);

    return this.http.put<AdminLevelSettings>(`${this.url}/api/settings/admin`, body, headerOption);
  }
  
  public getAdminLevelSettings(): Observable<AdminLevelSettings> {
    const headerOption = { headers: this.generateHeader() };
    return this.http.get<AdminLevelSettings>(`${this.url}/api/settings/admin`, headerOption);
  }

  private generateHeader(bJsonHeader = false): HttpHeaders{
    if(bJsonHeader){
      return new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "x-auth-token": localStorage.getItem('jwt')
      });
    }

    return new HttpHeaders({
      "x-auth-token": localStorage.getItem('jwt')
    });
  }
}
