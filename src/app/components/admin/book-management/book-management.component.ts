import { BookService } from './../../../services/book.service';
import { Book } from './../../../../assets/classes/book';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {

  books: Book[];
  filteredBooks: Book[];
  currentBook: Book;
  loaded: boolean = false;
  bShowModal: boolean = false;

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.books = [];
    this.filteredBooks = [];
    this.bookService.getAllBooks().subscribe(res=> {
      this.books = res;
      this.copyOriginal();
      this.loaded = true;
    })

  }
  filterItem(value): void{
    if(!value){
        this.copyOriginal();
    }
    this.filteredBooks = Object.assign([], this.books).filter(
       item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }

 onDeleteClick(book: Book): void{
   this.bShowModal = true;
   this.currentBook = book
   console.log(`show delete modal for book: ${book._id}`);
 }

 onDeleteConfirm(): void {

 }

 hideModal(): void {
  this.bShowModal = false;
 }

  copyOriginal(): void {
    this.filteredBooks = Object.assign([], this.books);
  }
  

}
