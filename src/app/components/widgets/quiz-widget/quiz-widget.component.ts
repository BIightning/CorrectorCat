import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-widget',
  templateUrl: './quiz-widget.component.html',
  styleUrls: ['./quiz-widget.component.css']
})
export class QuizWidgetComponent implements OnInit {

  @Input('quiz') quiz: any;
  @Output('succede') succede = new EventEmitter();
  bAnswered: boolean = false;
  bAnsweredCorrect: boolean = false;
  audioplayer: HTMLAudioElement;
  answers: Array<boolean> = [true, false];

  baseUrl: string;
  constructor() { 
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
    console.log(`${this.baseUrl}${this.quiz.audioFile}`)
    if(this.quiz.audioFile)
      this.audioplayer = new Audio(`${this.baseUrl}${this.quiz.audioFile}`);
    else
      this.audioplayer = new Audio(`${this.baseUrl}5f56f3ccbe1da85cec4650e8/MeereswesenFehler11Semantikfehler.mp3`);

      this.audioplayer.load();

  }

  playAudio(): void {
    this.audioplayer.play();
  }

  tryAgain(): void {
    this.bAnswered = false;
  }

  answerQuestion(i): void {
    this.bAnswered = true;
    if(i === this.quiz.correctIndex){
      this.bAnsweredCorrect = true;
      this.succede.emit();
    }
  }

}
