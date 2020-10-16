import { environment } from './../../environments/environment';
import { FileMeta } from './../../assets/classes/fileMeta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url: string;

  jsonHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
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

    const options = {
      headers: this.generateUploadHeaders(ownerId),
      reportProgress: true,
      params: new HttpParams()
    }
    const req = new HttpRequest('POST', `${this.url}/api/files/`, formData, options);
    return this.http.request(req);
  }

  public uploadMultiple(files: File[], ownerId: string):Observable<any>{
    const formData = new FormData();
    let count = 0;
    for(let file of files){
      formData.append('files', file);
    }
    const options = {
      headers: this.generateUploadHeaders(ownerId),
      reportProgress: true,
      observe: 'events',
      params: new HttpParams()
    }
    const req = new HttpRequest('POST', `${this.url}/api/files/multiple`, formData, options);
    return this.http.request(req);
  }

  private generateUploadHeaders(ownerId: string): HttpHeaders{
      return new HttpHeaders({
        "x-auth-token": localStorage.getItem('jwt'),
        "x-upload-owner": ownerId
      });
  }
}
