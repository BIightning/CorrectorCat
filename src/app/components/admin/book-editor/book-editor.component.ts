import { TutorialSequenceService } from './../../../services/tutorial-sequence.service';
import { PlaceholderFiles } from 'src/app/classes/PlaceholderFiles';
import { environment } from './../../../../environments/environment';
import { FileService } from './../../../services/file.service';
import { BookService } from 'src/app/services/book.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/classes/book';
import { FeedbackMessage, MessageType } from 'src/app/classes/feedbackMessage';
import { FileMeta } from 'src/app/classes/fileMeta';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TutorialSequence } from 'src/app/classes/tutorialSequence';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {

  public book: Book;
  public tutorials: TutorialSequence[];

  //Booleans for manipulating view
  public bLoaded: Boolean = false;
  public bIsNew: Boolean = false;
  public bShowModal: Boolean = false;
  public bIsDragging: Boolean = false;
  public bAudioUpload: Boolean = false;
  public bShowFileDrop: Boolean = false;
  public bFileSelected: Boolean = false;
  public chunkExtended: Boolean[]; //array of booleans for extending chunks
  public currentChunk: number = -1;
  public baseUrl: string;

  public bTutorialAfterBook: Boolean;

  possessedFiles: FileMeta[] = [];

  //Upload Related
  selectedFileMeta: FileMeta = null;
  singleFile: File;
  multipleFiles: File[] = [];
  uploadProgress: number = -1;
  audioplayer: HTMLAudioElement;

  //Static data 
  public languages: string[] = ['de-DE', 'en-GB', 'pt-PT', 'el-EL'];
  public difficulties: string[] = ['Tutorial', 'Easy', "Medium", "Hard", "Very Hard"];

  feedbackMessage: FeedbackMessage = new FeedbackMessage();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private tutorialService: TutorialSequenceService,
    private fileService: FileService
  ) {
    this.baseUrl = environment.baseUrl;
   }

  ngOnInit(): void {
    //Query parameter for redirect after successful save
    this.route.queryParams.subscribe(params => {
      let title = params['saved']
      if (title)
        this.showFeedback(`The book "${title}" was saved successfully.`, MessageType.Success, 3000);
    });

    let id = this.route.snapshot.paramMap.get("id");
    if (id == "new") {
      this.createEmptyBookTemplate();
      this.onNewChunkClick();
      this.possessedFiles = PlaceholderFiles;
      this.bIsNew = true;
      this.bLoaded = true;
    }
    else {
      this.bookService.getBookById(id).subscribe(res => {
        this.book = res;
        this.chunkExtended = new Array(this.book.textChunks.length).fill(false);
        this.loadPossessedFileMeta();
      },
        err => {
          this.showFeedback(`${err.error}`, MessageType.Error, 3000);
        });
    }
    this.tutorialService.getAllSequences().subscribe(res => {
      this.tutorials = res;
    });
  }
  loadPossessedFileMeta(): void {
    this.fileService
      .getPossessedFiles(this.book._id)
      .subscribe(res => {
        this.possessedFiles = PlaceholderFiles; //add placeholder audio to files
        console.log(this.possessedFiles);
        this.possessedFiles = [...this.possessedFiles, ...res]; //add actual possessed files to files
        this.bLoaded = true;
        console.log(this.possessedFiles);
        this.getAudioFileCount();
      },
        err => {
          err => this.processError(err);
        })
  }

  getAudioFileCount(): number{
    let count = this.possessedFiles.filter(file => file.fileType === 'audio').length;
    return count;
  }
  filterOutAudioPlaceholders(): FileMeta[] {
    return this.possessedFiles.filter(file => file.ownerId === this.book._id && file.fileType === 'audio');
  }
  getAudioFiles(): FileMeta[] {
    return this.possessedFiles.filter(file => file.fileType === 'audio');
  }

  getImageFiles(): FileMeta[] {
    return this.possessedFiles.filter(file => file.fileType === 'image');
  }

  hideModal(): void {
    this.bShowModal = false;
  }

  showFeedback(message: string, type: MessageType, duration?: number) {
    this.feedbackMessage = new FeedbackMessage(message, type, duration, true);
  }

  resetFeedbackMessage(): void {
    this.feedbackMessage = new FeedbackMessage();
  }

  onSaveClick(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.bookService.updateBook(this.book).subscribe(res => {
        this.router.navigate([`admin/bookeditor/${res._id}`], { queryParams: { saved: this.book.title } });
      },
        err => this.processError(err));
      return;
    }
    else
      this.bookService.createBook(this.book).subscribe(res => {
        this.router.navigate([`admin/bookeditor/${res._id}`], { queryParams: { saved: this.book.title } });
      },
        err => this.processError(err))
  }
  processError(error: any): void {
    if (error.status < 500)
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
    this.showFeedback(`Chunk ${this.currentChunk + 1} deleted!`, MessageType.Info, 1000);
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
    this.book.imagePath = "/assets/placeholder_image.jpg";
    this.book.description = "";
  }

  trackByFn(index: any, item: any): any {
    return index;
  }


  selectSingleFileForUpload(event) {
    if (event.target.files.length > 0)
      this.singleFile = event.target.files[0];
    else {
      this.singleFile = null;
    }
  }

  selectMultipleFilesForUpload(event) {
    if (event.target.files.length > 0)
      this.multipleFiles = [...this.multipleFiles, ...event.target.files];

    console.log(this.multipleFiles);

  }

  singleFileUpload(): void {
    if (!this.singleFile) {
      this.showFeedback('Please select a file to upload!', MessageType.Warning);
      return;
    }
    this.fileService
      .uploadSingle(this.singleFile, this.book._id)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded: ${this.uploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.loadPossessedFileMeta();
            setTimeout(() => {
              this.uploadProgress = -1;
              this.showFeedback('File is uploaded and now available in the selection.', MessageType.Success);
              this.singleFile = null;
            }, 1500);
            break;
        }
      },
        err => {
          err => this.processError(err);
          this.singleFile = null;
        })
  }

  multiFileUpload(): void {
    if (!this.multipleFiles) {
      this.showFeedback('Please select the files to upload!', MessageType.Warning);
      return;
    }
    this.bAudioUpload = true;
    this.fileService
      .uploadMultiple(this.multipleFiles, this.book._id)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded: ${this.uploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.loadPossessedFileMeta();
            setTimeout(() => {
              this.bAudioUpload = false;
              this.uploadProgress = -1;
              this.showFeedback('Files are uploaded and are now available in the selection.', MessageType.Success);
            }, 1500);
            break;
        }
      },
        err => {
          this.bAudioUpload = false;
          this.uploadProgress = -1;
          this.processError(err);
        })
    this.multipleFiles = [];
  }

  onFileSelect(): void {
    this.bFileSelected = true;

  }
  onAudioClick(audioUrl?: string): void {
    console.log('clicked: ' +audioUrl)
    if((!this.audioplayer || this.audioplayer.ended || this.audioplayer.paused) && audioUrl){
      this.audioplayer = new Audio(`${this.baseUrl}${audioUrl}`);
      this.audioplayer.autoplay = true;
      this.audioplayer.load();
    }
    else{
      this.audioplayer.pause();
    }
  }

  onDragover(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.bIsDragging = true;
  }

  onDragLeave(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.bIsDragging = false;
  }

  onInvalidDrop(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.bIsDragging = false;
    this.showFeedback('Invalid drag & drop operation!', MessageType.Warning);
  }

  onDrop(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.bIsDragging = false;
    if (event.dataTransfer.files.length > 0) {
      for (let file of event.dataTransfer.files) {
        if (file.type != 'audio/mp3' && file.type != 'audio/mpeg') {
          this.showFeedback(
            'Only .mp3 files are supported!', 
            MessageType.Error
          );
          return;
        }
        for (let trackedFile of this.multipleFiles)
          if (trackedFile.name === file.name) {
            this.showFeedback(
              'A file with the same name was already added for upload!', 
              MessageType.Error, 
              2000
            );
            return;
          }
      }
      this.multipleFiles = [...this.multipleFiles, ...event.dataTransfer.files];
    }
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
      audioCorrect: '/assets/placeholder_correct.mp3',
      audioWrong: '/assets/placeholder_incorrect.mp3',
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
    this.showFeedback(`Chunk ${this.book.textChunks.length} created!`, MessageType.Info, 1000);
  }

}
