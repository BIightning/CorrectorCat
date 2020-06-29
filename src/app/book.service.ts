import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Book } from '../assets/classes/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public getBookbyId(bookId : number) : Observable<Book>{
    return this.http.get<Book>("http://localhost:8080/api/bookById/" + String(bookId))
  }

  public getAllBooks(){
    return this.http.get<Book[]>("http://localhost:8080/api/books")
  }
}
