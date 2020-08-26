import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-widget',
  templateUrl: './quiz-widget.component.html',
  styleUrls: ['./quiz-widget.component.css']
})
export class QuizWidgetComponent implements OnInit {

  audioplayer: HTMLAudioElement;
  constructor() { }

  ngOnInit(): void {
    this.audioplayer = new Audio('./assets/books/0/wrong/MeereswesenFehler11Semantikfehler.mp3');
  }

  playAudio(){
    this.audioplayer.play();
  }

}
