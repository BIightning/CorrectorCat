import { CatImages } from '../../../../assets/classes/CatImages';
import { TutorialSequenceService } from './../../../services/tutorial-sequence.service';
import { TutorialSequence } from './../../../../assets/classes/tutorialSequence';
import { Component, OnInit } from '@angular/core';
import { FeedbackMessage, MessageType } from 'src/assets/classes/feedbackMessage';
import { ActivatedRoute, Router } from '@angular/router';

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

  bShowModal: boolean;
  currentSlide: number = -1;
  
  //static data
  catAnimations: string[] = ['none','cat-move', 'cat-super', 'cat-land'];
  catImages: string[] = CatImages;
  widgets: any[] = [{name: 'Start Button', id: 0}, {name: 'Image', id: 2},
                    {name: 'quiz', id: 3}, {name: 'audio player', id: 4},]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tutorialService: TutorialSequenceService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let title = params['saved']
      if(title)
      this.showFeedback(`The tutorial "${title}" was saved successfully.`, MessageType.Success, 3000);
    });

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
        console.log(res);
        this.slideExtended = new Array(this.tutorial.slides.length).fill(false);
        this.bLoaded = true;
      },
      err => {
        this.showFeedback(`${err.error}`, MessageType.Error, 3000);
      });
    }
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
        },
        err => this.processError(err));
      return;
    }
    else
    this.tutorialService.createSequence(this.tutorial).subscribe(res =>{
      this.router.navigate([`admin/tutorialeditor/${res._id}`], {queryParams: { saved: this.tutorial.tutorialTitle}});
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
