import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Book } from 'src/app/classes/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.baseUrl;
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
  public deleteBook(id: string): Observable<Book>{
    const headerOption = { headers: this.generateHeader() };
    return this.http.delete<Book>(`${this.url}/api/books/${id}`, headerOption);
  }

  private generateHeader(): HttpHeaders{
    return new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "x-auth-token": localStorage.getItem('jwt')
    });
  }
}
