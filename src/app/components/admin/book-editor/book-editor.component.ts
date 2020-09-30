import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/assets/classes/book';
import { FeedbackMessage, MessageType } from 'src/assets/classes/feedbackMessage';

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
  public currentChunk: number = -1;

  public languages: string[] = ['de-DE', 'en-GB', 'pt-PT', 'el-EL'];
  public difficulties: string[] = ['Tutorial', 'Easy', "Medium", "Hard", "Very Hard"];

  feedbackMessage: FeedbackMessage = new FeedbackMessage();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    //Query parameter for redirect after successful save
    this.route.queryParams.subscribe(params => {
      let title = params['saved']
      if(title)
      this.showFeedback(`The book "${title}" was saved successfully.`, MessageType.Success, 3000);
    });

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
          this.showFeedback(`${err.error}`, MessageType.Error, 3000);
        });
    }

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

  onSaveClick(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.bookService.updateBook(this.book).subscribe(res => {
        this.router.navigate([`admin/bookeditor/${res._id}`], {queryParams: { saved: this.book.title}});
        },
        err => this.processError(err));
      return;
    }
    else
    this.bookService.createBook(this.book).subscribe(res =>{
      this.router.navigate([`admin/bookeditor/${res._id}`], {queryParams: { saved: this.book.title}});
    }, 
    err => this.processError(err))
  }
  processError(error: any): void {
    if(error.status < 500)
      this.showFeedback(`${error.error}`, MessageType.Warning, 3000);
    else
      this.showFeedback(`${error.error}`, MessageType.Error, 3000);
  }

  onDeleteClick(chunkIndex: number): void {
    this.bShowModal = true;
    this.currentChunk = chunkIndex;
  }

  onDeleteConfirm(): void {
    this.book.textChunks.splice(this.currentChunk, 1);
    this.showFeedback(`Chunk ${this.currentChunk +1 } deleted!`, MessageType.Info, 1000);
    this.currentChunk = -1;
    this.chunkExtended = new Array(this.book.textChunks.length).fill(false);
  }

  createEmptyBookTemplate(): void {
    this.book = new Book();
    this.book.title = "New Book";
    this.book.author = "";
    this.book.series = "";
    this.book.language = "en-EN";
    this.book.starting = false;
    this.book.cost = 0;
    this.book.difficulty = "Easy";
    this.book.imagePath = "";
    this.book.description = "";
  }

  trackByFn(index: any, item: any) {
    return index;
 }

  onNewChunkClick(): void {
    //create default values for points and fill in values of index 0 if they exist
    let fillPoints = 0;
    let fillAnswers = ['', '', '', ''];

    if (this.book.textChunks) {
      fillPoints = this.book.textChunks[0].points;
      fillAnswers = this.book.textChunks[0].question.answers;
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
    this.showFeedback(`Chunk ${this.book.textChunks.length} created!`,MessageType.Info, 1000);
  }

}
