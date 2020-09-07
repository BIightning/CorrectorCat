import { BookService } from './../../../services/book.service';
import { Book } from './../../../../assets/classes/book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {

  books: Book[];
  filteredBooks: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = [];
    this.filteredBooks = [];
    this.bookService.getAllBooks().subscribe(res=> {
      this.books = res;
      console.log(res);
      this.copyOriginal();
    })

  }
  filterItem(value){
    if(!value){
        this.copyOriginal();
    }
    this.filteredBooks = Object.assign([], this.books).filter(
       item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }

  copyOriginal(){
    this.filteredBooks = Object.assign([], this.books);
  }
  

}
