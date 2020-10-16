import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-widgets',
  templateUrl: './tutorial-widgets.component.html',
  styleUrls: ['./tutorial-widgets.component.css']
})
export class TutorialWidgetsComponent implements OnInit {
  
  @Input("widgetID") widgetID: number;
  @Input("widgetData") widgetData: any;
  @Input("targetText") targetTextTitle: number;
  @Input("isPreview") bIsPreview: boolean;
  @Output("allowContinue") allowContinue = new EventEmitter();

  audioplayer: HTMLAudioElement;
  baseUrl: string;

  constructor(private router: Router) { 
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    this.audioplayer = new Audio('/assets/sample.mp3');
    this.audioplayer.load();
    if (!this.widgetData)
      this.widgetData = {};
    if(this.widgetID != 3 && this.widgetID != 5)
      this.emitAllowContinue();
  }

  goGameView(){
    console.log(this.widgetID);
    console.log(this.targetTextTitle);
    if(!this.bIsPreview)
      this.router.navigate(["/game/game-view/" +this.targetTextTitle +"/"]);
  }

  emitAllowContinue() {
    this.allowContinue.emit();
  }

  onQuizSuccede(){
    this.emitAllowContinue();
  }

  playAudio(){
    this.audioplayer.play();
  }

}
