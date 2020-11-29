import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Book } from 'src/app/classes/book';
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/users';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent implements OnInit {

  public bookList: Book[] = [];
  public ownedBooks: string[] = [];
  public userId: string;
  public user: User;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("user");
    this.userService.getUserbyId(this.userId).subscribe((data) => {
      this.user = data;
    });

    //Get Books from Bookdatabase over Bookserviceo
    this.bookService.getAllBooks().subscribe(data => {
      this.ownedBooks = this.getArrayOfBookIds();

      for (let i = 0; i < data.length; i++) {
        if (this.isOwned(data[i]._id) || data[i].starting) {
          this.bookList.push(data[i]);
        }
      }
    });
  }

  public getArrayOfBookIds(): string[] {
    // Diese würden aus der NoSql Datenbank kommen.
    //Dieser Teil Code ist Komplet getrickst.
    let ownedBooks: string[] = [];
    let booksIds: string = localStorage.getItem("books");
    if (booksIds !== null) {
      let offset: number = 0;
      for (let i = 0; i < booksIds.length; i++) {
        if (booksIds[i] == ":") {
          ownedBooks.push(booksIds.substring(offset, i));
          offset = i + 1;
        }
      }
    }
    return ownedBooks;
  }

  public isOwned(index: string): boolean {
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
