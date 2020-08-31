import { Component, OnInit } from '@angular/core';
import {Book} from "../../../assets/classes/book";
import {BookService} from "../../services/book.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from 'src/assets/classes/users';
import { ViewChild } from '@angular/core';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css']
})
export class BookstoreComponent implements OnInit {

  @ViewChild("bookBuy") private bookBuyContent;
  @ViewChild("notAbleToBuy") private notAbleToBuyContent;
  public bookList : Book[];
  public ownedBooks : number[] = [];
  public userId : number
  public selectedBook : Book;
  public user :User;

  closeResult: string;

  constructor(private route : ActivatedRoute ,private bookService : BookService, private router :Router, private modalService: NgbModal, private userService :UserService) {  }

  ngOnInit() {
    //this.initBook();
    this.bookList = [];
    this.userId = Number(localStorage.getItem("user"));
    this.userService.getUserbyId(this.userId).subscribe((data)=>{
      this.user = data;
    });


    //Get Books from Bookdatabase over Bookservice
      this.bookService.getAllBooks().subscribe(data => {
        this.bookList = this.filterOutStartingBooks(data);
        this.ownedBooks = this.getArrayOfBookIds();
      });
  }

  //Filter for Starting Booksimport { UserService } from '../user.service';
  public filterOutStartingBooks(book :Book[]) : Book[]{
    let cutIndex : Book [] = [];
    for(let i = 0; i < book.length; i++){
      let currentBook = book[i];
      if(currentBook.starting){
        cutIndex.push(currentBook);
      }
    }
    for(let j = 0; j < cutIndex.length; j++){
      book.splice(book.indexOf(cutIndex[j]),1);
    }
    return book
  }

  public isowned(index : number): boolean{
    for(let i = 0; i < this.ownedBooks.length; i++){
      if(index == this.ownedBooks[i]){
        return true;
      }
    }
    return false;
  }

  public openModal(index: number, selectedBook : Book){
    this.selectedBook = selectedBook;
    if(this.selectedBook.cost <= this.user.points){
      this.modalService.open(this.bookBuyContent,{backdrop : "static"});
    }
    else{
      this.modalService.open(this.notAbleToBuyContent,{backdrop : "static" });
    }
  }

  public buyBook(){
    this.modalService.dismissAll();
    this.user.points  = this.user.points - this.selectedBook.cost; 
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data.msg);
      this.saveBook(this.selectedBook.id);
    }) 
  }

  public saveBook(index: number){ 
      //Looks if user has bought book already, extra security
      let isInside: boolean = false;
      for(let i = 0 ; i < this.ownedBooks.length; i++){  
        if(this.ownedBooks[i] == index){
          isInside = true;
        }
      }
      if(!isInside){
        // Adds book to localstorage
        let booksIds: string = localStorage.getItem("books");
        if(booksIds == null ){
          booksIds = String(index) + ":";
        }
        else{
          booksIds = booksIds + String(index) + ":";
        } 
        localStorage.setItem("books", booksIds);
        this.router.navigateByUrl("/LbT/" + String(this.userId) + "/bookshelf");
      }
      else{
        //An error occurred Model
        console.log("Book seems to be inside Database!");
      }

  }

  public getArrayOfBookIds(): number []{
    // Diese würden aus der NoSql Datenbank kommen.
    //Dieser Teil Code ist Komplet getrickst.
    let ownedBooks : number[] = [];
    let bookIds : string = localStorage.getItem("books");

    if(!bookIds)
      return ownedBooks;

    let offset : number = 0;
    for(let i = 0; i < bookIds.length; i++){
      if(bookIds[i] == ":"){
        ownedBooks.push(Number(bookIds.substring(offset,i)));
        offset = i +1;
      }
    }
    return ownedBooks;
  }
  /*############################################################ Modal logic  ############################################################*/

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  private open(content: any, config?: any) {
    this.modalService.open(content, {centered: true, size: "lg", keyboard: false, windowClass:'error-found-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}


