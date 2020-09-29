import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Book } from '../../assets/classes/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string = "http://localhost:8080";

  jsonHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };

  constructor(private http: HttpClient) { 
    this.url = "http://192.168.0.17:8080"; //for local debugging
  }

  public getBookById(bookId : string) : Observable<Book>{
    return this.http.get<Book>(this.url+ "/api/books/" +bookId);
  }

  public getBookByTitle(title: string): Observable<Book>{
    return this.http.get<Book>(this.url+ "/api/books/bytitle/" + title);
  }

  public getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url+ "/api/books");
  }

  public createBook(book: Book): Observable<Book>{
    const headerOption = { headers: this.generateHeader() };
    const body = JSON.stringify(book);
    
    return this.http.post<Book>(`${this.url}/api/books/`, body, headerOption);
  }

  public updateBook(book: Book): Observable<Book>{
    const headerOption = { headers: this.generateHeader() };
    const body = JSON.stringify(book);

    return this.http.put<Book>(this.url + "/api/books/" + book._id, body, headerOption);
  }

  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "x-auth-token": localStorage.getItem('jwt')
    });
  }
}
