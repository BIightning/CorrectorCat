import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Book } from '../../assets/classes/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { 
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }

  public getBookbyId(bookId : number) : Observable<Book>{
    alert(this.url+ "/api/books/" + String(bookId))
    return this.http.get<Book>(this.url+ "/api/bookByID/" + String(bookId));
  }

  public getAllBooks(){
    return this.http.get<Book[]>(this.url+ "/api/books");
  }
}
