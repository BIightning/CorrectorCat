import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorialSequence } from 'src/assets/classes/tutorialSequence';

@Injectable({
  providedIn: 'root'
})
export class TutorialSequenceService {
  seq: TutorialSequence;

  url: string = "http://localhost:8080";
  constructor(private http: HttpClient) {
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }

  public getSequence(position: number): Observable<TutorialSequence> {
    return this.http.get<TutorialSequence>(this.url+'/api/tutorials/byposition/' + position);
  }

  public getAllSequences(): Observable<TutorialSequence[]> {
    return this.http.get<TutorialSequence[]>(this.url+'/api/tutorials/');
  }

  public deleteSequence(id: string): Observable<TutorialSequence> {
    return this.http.delete<TutorialSequence>(`${this.url}/api/tutorials/${id}`)
  }
}
