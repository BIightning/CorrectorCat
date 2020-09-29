import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/assets/classes/book';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {

  public book: Book;
  public bLoaded: Boolean = false;
  public bShowModal: Boolean = false;
  public chunkExtended: Boolean[];
  public currentChunk: number = 0;

  public languages: string[] = ['de-DE', 'en-EN', 'pt-PT', 'el-EL'];
  public difficulties: string[] = ['Easy', "Medium", "Hard", "Very Hard"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id == "new") {
      this.createEmptyBookTemplate();
      this.onNewChunkClick();
      this.bLoaded = true;
    }
    else {
      this.bookService.getBookById(id).subscribe(res => {
        this.book = res;
        this.bLoaded = true;
        this.chunkExtended = new Array(this.book.textChunks.length).fill(false);
      },
        err => {
          alert("a Problem occured. Please retry later!")
        });
    }

  }

  hideModal(): void {
    this.bShowModal = false;
  }

  onSaveClick(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.bookService.updateBook(this.book).subscribe(res => {
        this.router.navigate([`admin/bookeditor/${res._id}`]);
        },
        err => { 
          console.log(err);  
      });
      return;
    }
    else
    this.bookService.createBook(this.book).subscribe(res =>{
      this.router.navigate([`admin/bookeditor/${res._id}`])
    })

  }

  onDeleteClick(chunkIndex: number): void {
    this.bShowModal = true;
    this.currentChunk = chunkIndex;
  }

  onDeleteConfirm(): void {
    this.book.textChunks.splice(this.currentChunk, 1);
    this.currentChunk = 0;
    this.chunkExtended = new Array(this.book.textChunks.length).fill(false);
  }

  createEmptyBookTemplate(): void {
    this.book = new Book();
    this.book.title = "New Book";
    this.book.author = "";
    this.book.series = "";
    this.book.language = "de-DE";
  }

  onNewChunkClick(): void {
    //create default values for points and fill in values of index 0 if they exist
    let fillPoints = 0;
    let fillAnswers = ['', '', '', ''];

    if (this.book.textChunks) {
      fillPoints = this.book.textChunks[0].points;
      let fillAnswers = this.book.textChunks[0].question.answers;
    }

    let chunk = {
      text: '',
      audioCorrect: '',
      audioWrong: '',
      points: fillPoints,
      question: {
        answers: fillAnswers,
        correctIndex: 0,
        explanation: ''
      }
    }
    if (this.book.textChunks)
      this.book.textChunks.push(chunk);
    else
      this.book.textChunks = [chunk];

    this.chunkExtended = new Array(this.book.textChunks.length).fill(false);
  }

}
