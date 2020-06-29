import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Book } from "../../assets/classes/book";
import { BookService } from "../book.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from 'src/assets/classes/users';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  public bookList: Book[] = [];
  public ownedBooks: number[] = [];
  public userId: number
  public user: User;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit() {
    this.userId = Number(localStorage.getItem("user"));
    this.userService.getUserbyId(this.userId).subscribe((data) => {
      this.user = data;
    });

    //Get Books from Bookdatabase over Bookserviceo
    this.bookService.getAllBooks().subscribe(data => {
      this.ownedBooks = this.getArrayOfBookIds();

      for (let i = 0; i < data.length; i++) {
        if (this.isOwned(data[i].id) || data[i].starting) {
          this.bookList.push(data[i]);
        }
      }
    });
  }

  public getArrayOfBookIds(): number[] {
    // Diese würden aus der NoSql Datenbank kommen.
    //Dieser Teil Code ist Komplet getrickst.
    let ownedBooks: number[] = [];
    let booksIds: string = localStorage.getItem("books");
    if (booksIds !== null) {
      let offset: number = 0;
      for (let i = 0; i < booksIds.length; i++) {
        if (booksIds[i] == ":") {
          ownedBooks.push(Number(booksIds.substring(offset, i)));
          offset = i + 1;
        }
      }
    }
    return ownedBooks;
  }

  public isOwned(index: number): boolean {
    for (let i = 0; i < this.ownedBooks.length; i++) {
      if (index == this.ownedBooks[i]) {
        return true;
      }
    }
    return false;
  }

  navigate(bookId: number) {
    console.log(bookId);
    this.router.navigate(["/LbT/" + this.userId + "/game-view", bookId]);
  }

}
