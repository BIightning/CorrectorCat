import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-widgets',
  templateUrl: './tutorial-widgets.component.html',
  styleUrls: ['./tutorial-widgets.component.css']
})
export class TutorialWidgetsComponent implements OnInit {
  
  @Input("widgetID") widgetID: number;
  @Input("targetText") targetTextTitle: number;
  audioplayer: HTMLAudioElement;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.audioplayer = new Audio('./assets/sample.mp3');
  }

  goGameView(){
    console.log(this.widgetID);
    console.log(this.targetTextTitle);
    this.router.navigate(["/game/game-view/" +this.targetTextTitle +"/"]);
  }

  playAudio(){
    this.audioplayer.play();
  }

}
