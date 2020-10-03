import { FileMeta } from './../../assets/classes/fileMeta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url: string = "http://localhost:8080";

  jsonHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private http: HttpClient) { 
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }
  /**
   * Get all Files regardless of owner or File type
   */
  public getCompleteFileCatalog():Observable<FileMeta[]>{
    return this.http.get<FileMeta[]>(`${this.url}/api/files`);
  }

  /**
   * Get all Files of an owner regardless of File type
   * @param ownerId The id of the owner
   */
  public getPossessedFiles(ownerId):Observable<FileMeta[]>{
    return this.http.get<FileMeta[]>(`${this.url}/api/files/${ownerId}`);
  }

  public uploadSingle(file: File, ownerId: string):Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('ownerId', ownerId);

    const options = {
      headers: this.generateHeaders(false),
      reportProgress: true,
      params: new HttpParams()
    }
    const req = new HttpRequest('POST', `${this.url}/api/files/`, formData, options);
    return this.http.request(req);
  }

  public uploadMultiple(files: File[], ownerId: string):Observable<any>{
    const formData = new FormData();
    for(let file of files){
      formData.append('file', file);
    }
    formData.append('ownerId', ownerId);

    const options = {
      headers: this.generateHeaders(),
      reportProgress: true,
      observe: 'events',
      params: new HttpParams()
    }
    const req = new HttpRequest('POST', `${this.url}/api/files/`, formData, options);
    return this.http.request(req);
  }

  private generateHeaders(bJsonHeader: boolean = true): HttpHeaders{
    if(bJsonHeader)
      return new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "x-auth-token": localStorage.getItem('jwt')
      });
    else
      return new HttpHeaders({
        "x-auth-token": localStorage.getItem('jwt')
      });
  }
}
