import { FileMeta } from 'src/app/classes/fileMeta';
import { FileService } from './../../../services/file.service';
import { CatImages } from 'src/app/classes/CatImages';
import { TutorialSequenceService } from './../../../services/tutorial-sequence.service';
import { TutorialSequence } from 'src/app/classes/tutorialSequence';
import { Component, OnInit } from '@angular/core';
import { FeedbackMessage, MessageType } from 'src/app/classes/feedbackMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tutorial-editor',
  templateUrl: './tutorial-editor.component.html',
  styleUrls: ['./tutorial-editor.component.css']
})
export class TutorialEditorComponent implements OnInit {

  tutorial: TutorialSequence;
  bLoaded: boolean = false;
  bIsNew: boolean = false;
  feedbackMessage: FeedbackMessage = new FeedbackMessage();
  slideExtended: boolean[];
  baseUrl: string;

  
  bShowModal: boolean;
  currentSlide: number = -1;
  
  possessedFiles: FileMeta[] = [];
  //Files for upload
  singleFile: File;
  multipleFiles: File[] = null;
  uploadProgress: number = -1;

  //static data
  catAnimations: string[] = ['none','cat-move', 'cat-super', 'cat-land'];
  catImages: string[] = CatImages;
  widgets: any[] = [{name: 'None', id: -1},{name: 'Start Button', id: 0}, 
                    {name: 'Image', id: 2}, {name: 'quiz', id: 3}, 
                    {name: 'audio player', id: 4}]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tutorialService: TutorialSequenceService,
    private fileService: FileService
  ) 
  {
    this.baseUrl = environment.baseUrl;
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let title = params['saved']
      if(title)
        this.showFeedback(`The tutorial "${title}" was saved successfully.`, MessageType.Success, 3000);
    });
    let delay = (Math.floor(Math.random() * 5) + 2) *  1000;
    setTimeout(()=> {this.loadTutorial()}, delay);
  }
  loadTutorial(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id === "new") {
      this.createEmptyTutorialTemplate();
      this.onNewSlideClick();
      this.slideExtended = new Array(this.tutorial.slides.length).fill(false);
      this.bLoaded = true;
      this.bIsNew = true;
    }
    else {
      this.tutorialService.getSequenceById(id).subscribe(res => {
        this.tutorial = res;
        this.slideExtended = new Array(this.tutorial.slides.length).fill(false);
        this.bIsNew = false;
        this.loadPossessedFileMeta();
      },
      err => {
        this.showFeedback(`${err.error}`, MessageType.Error, 3000);
      });
    }
  }
  loadPossessedFileMeta(): void {
    this.fileService
      .getPossessedFiles(this.tutorial._id)
      .subscribe(res => {
        this.possessedFiles = res;
        this.bLoaded = true;
        console.log(this.possessedFiles);
      },
      err => {
        err => this.processError(err);
      })
  }

  processError(error: any): void {
    if(error.status < 500)
      this.showFeedback(`${error.error}`, MessageType.Warning, 3000);
    else
      this.showFeedback(`${error.error}`, MessageType.Error, 3000);
  }

  createEmptyTutorialTemplate():void {
    this.tutorial = {
      tutorialTitle: 'New Tutorial',
      position: -1,
      slides: null,
      targetTextTitle: ''  
    }
  }

  selectSingleFileForUpload(event){
    if(event.target.files.length > 0)
      this.singleFile = event.target.files[0];
    else{
      this.singleFile = null;
    }
  }

  singleFileUpload(): void {
    if(!this.singleFile) {
      this.showFeedback('Please select a file to upload!', MessageType.Warning);
      return;
    }
    this.fileService
      .uploadSingle(this.singleFile, this.tutorial._id)
      .subscribe((event: HttpEvent<any>) => {
        switch(event.type){
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.uploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.loadPossessedFileMeta();
            setTimeout(() => {
              this.uploadProgress = -1;
              this.showFeedback('File is uploaded and is now available in the selection.', MessageType.Success);
            }, 1000);
            break;
        }
      },
      err => {
        err => this.processError(err);
      })
        this.singleFile = null;
  }
  getPossessedAudioMeta(): FileMeta[] {
    if(this.possessedFiles.length < 1)
      return [];
    console.log(this.possessedFiles.filter(file => file.fileType === 'audio'))
    return this.possessedFiles.filter(file => file.fileType === 'audio')
  }
  onNewSlideClick(): void {

    let slide = {
      slideTitle: '',
      sceneType: 0,
      catAnimation: 'none',
      catImage: '050-kitty.svg',
      slideText: {
        german: '',
        english: '',
        portuguese: '',
        greek: ''
      },
      widgetID: -1,
      widgetData: {},
    }
    if (this.tutorial.slides)
      this.tutorial.slides.push(slide);
    else
      this.tutorial.slides = [slide];

    this.slideExtended = new Array(this.tutorial.slides.length).fill(false);
    this.showFeedback(`Slide ${this.tutorial.slides.length} created!`,MessageType.Info, 1000);
  }

  onSaveClick(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != "new") {
      this.tutorialService.updateSequence(this.tutorial).subscribe(res => {
        this.router.navigate([`admin/tutorialeditor/${res._id}`], {queryParams: { saved: this.tutorial.tutorialTitle}});
        this.bIsNew = false;
      },
        err => this.processError(err));
      return;
    }
    else
    this.tutorialService.createSequence(this.tutorial).subscribe(res =>{
      this.router.navigate([`admin/tutorialeditor/${res._id}`], {queryParams: { saved: this.tutorial.tutorialTitle}});
      this.bIsNew = false;
    }, 
    err => this.processError(err))
  }

  onDeleteClick(slideIndex: number): void {
    this.bShowModal = true;
    this.currentSlide = slideIndex;
  }

  onDeleteConfirm(): void {
    this.tutorial.slides.splice(this.currentSlide, 1);
    this.showFeedback(`Chunk ${this.currentSlide +1 } deleted!`, MessageType.Info, 1000);
    this.currentSlide = -1;
    this.slideExtended = new Array(this.tutorial.slides.length).fill(false);
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

}
