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
  constructor() { }

  ngOnInit(): void {
    if(this.quiz.audioFile)
      this.audioplayer = new Audio(this.quiz.audioFile);
    else
      this.audioplayer = new Audio('./assets/books/0/wrong/MeereswesenFehler11Semantikfehler.mp3');
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
