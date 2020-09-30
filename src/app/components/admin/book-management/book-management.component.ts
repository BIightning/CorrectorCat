import { FeedbackMessage, MessageType } from './../../../../assets/classes/feedbackMessage';
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

  feedbackMessage: FeedbackMessage = new FeedbackMessage();

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
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
   this.currentBook = book;
   console.log(`show delete modal for book: ${book._id}`);
 }

 onDeleteConfirm(): void {
  this.bookService.deleteBook(this.currentBook._id).subscribe(res => {
    console.log(`deleted book ${res._id}`);
    this.loaded = false;
    this.updateView();
    this.showFeedback(`Deleted book "${res.title}" successfully`, MessageType.Success);
  },
  err => {
    console.log(err);
    this.showFeedback(`${err.error}! Book wasn't deleted!`, MessageType.Error);
  })
 }

 hideModal(): void {
  this.bShowModal = false;
 }
 showFeedback(message: string, type: MessageType, duration?: number){
   this.feedbackMessage = new FeedbackMessage(message, type, duration, true);
 }

 resetFeedbackMessage(): void {
   this.feedbackMessage = new FeedbackMessage();
 }

  copyOriginal(): void {
    this.filteredBooks = Object.assign([], this.books);
  }
  

}
