import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from "../../../assets/classes/book";
import * as jQuery from 'jquery';
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  book: Book;
  currentQuestion: any = {};
  earnedCoins: number = 0;
  currQ: number = 0;
  answerSelected: boolean = true;
  @ViewChild("endModal") private endModalContent;


  constructor(private bookService: BookService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.book = new Book();
    this.route.params.subscribe(param => {
      this.bookService.getBookByTitle(param.bookId).subscribe(data => {
        this.book = data;
        this.loadNextQuestion();
      });
    })
  }

  private loadNextQuestion() {
    if (this.currQ < this.book.quiz.length) {
      this.answerSelected = false;
      this.currentQuestion = this.book.quiz[this.currQ];
      this.currQ++;
    }
    else{
      this.modalService.open(this.endModalContent, { windowClass: "game-modal", centered: true, backdrop: 'static', keyboard: false });
    }
  }

  private async answerQuestion(aIndex: number) {
    if (!this.answerSelected) {
      this.answerSelected = true;
      document.getElementById("answer-0").classList.add("answer-button-not-selected");
      document.getElementById("answer-1").classList.add("answer-button-not-selected");
      document.getElementById("answer-2").classList.add("answer-button-not-selected");
      document.getElementById("answer-3").classList.add("answer-button-not-selected");
      document.getElementById("answer-" + aIndex).classList.remove("answer-button-not-selected");
      document.getElementById("answer-" + aIndex).classList.add("answer-button-selected");
      await new Promise(resolve => setTimeout(() => resolve(), 1200)).then(() => this.resolveAnswer(aIndex));
    }
  }

  private resolveAnswer(index: number) {
    document.getElementById("answer-" + this.currentQuestion.correctAnswer).classList.remove("answer-button-not-selected");
    document.getElementById("answer-" + this.currentQuestion.correctAnswer).classList.remove("answer-button-selected");
    document.getElementById("answer-" + this.currentQuestion.correctAnswer).classList.remove("answer-button");
    document.getElementById("answer-" + this.currentQuestion.correctAnswer).classList.add("answer-button-correct");
    if(index == this.currentQuestion.correctAnswer){
      this.coinAnimation(index);
    }
    this.resetGui();
  }

  private async resetGui() {
    await new Promise(resolve => setTimeout(() => resolve(), 2000)).then(() => {
      document.getElementById("answer-" + this.currentQuestion.correctAnswer).classList.add("answer-button");
      document.getElementById("answer-0").classList.remove("answer-button-not-selected");
      document.getElementById("answer-1").classList.remove("answer-button-not-selected");
      document.getElementById("answer-2").classList.remove("answer-button-not-selected");
      document.getElementById("answer-3").classList.remove("answer-button-not-selected");
      document.getElementById("answer-0").classList.remove("answer-button-selected");
      document.getElementById("answer-1").classList.remove("answer-button-selected");
      document.getElementById("answer-2").classList.remove("answer-button-selected");
      document.getElementById("answer-3").classList.remove("answer-button-selected");
      document.getElementById("answer-0").classList.remove("answer-button-correct");
      document.getElementById("answer-1").classList.remove("answer-button-correct");
      document.getElementById("answer-2").classList.remove("answer-button-correct");
      document.getElementById("answer-3").classList.remove("answer-button-correct");

      this.loadNextQuestion();
    });
  }

  async coinAnimation(index) {
    let randomModifier = 10;
    for (let i = 0; i < this.currentQuestion.points / 2; i++) {
      await new Promise(resolve => setTimeout(() => resolve(), (10 + Math.random() * randomModifier / 2))).then(() => {
        this.earnedCoins += 2;
      });
    }
  }


}
