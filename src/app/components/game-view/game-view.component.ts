import { Observable, fromEvent } from 'rxjs';
import { GameState } from './stateMachine';
import { Component, OnInit, HostBinding, ViewChild, Input, ViewChildren, QueryList } from '@angular/core';
import * as jQuery from 'jquery';
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Book } from '../../../assets/classes/book';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "../../services/user.service";
import { User } from 'src/assets/classes/users';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css'],
})

export class GameViewComponent implements OnInit {

  @ViewChild("startModal")
  private startModalContent;

  @ViewChild("gameModal")
  private gameModalContent;

  @ViewChild("settingsModal")
  private settingsModalContent;

  @ViewChild("endModal")
  private endModalContent;

  @ViewChildren("chunkPool") chunkPool;

  user: User;
  audioplayer: HTMLAudioElement;
  progressDelay: number = 1;
  book: Book;

  modalDisplayText: string = 'Content is being loaded';
  earnedCoins: number = 0;
  coinsToAdd: number = 0;
  errorCount: number = 0;
  chunksMissed: number = 0;

  currentTextChunk: number = -1;
  public firstChunk;
  paused: boolean;
  gameStopped: boolean;
  skipChunkAfterFoundError: Boolean = true;
  hasAnswered: boolean;
  bookLoaded: boolean;
  showErrorMessage: boolean = false;
  answeredCorrect: boolean;
  wrongReadIndexes: boolean[];
  foundWrongIndexes: boolean[];

  mySubscription: any;
  skipImmediatly: boolean = true;
  audioEndedEvent: Observable<Event>;
  gameState: GameState = GameState.ChunkEnded;
  bAutoPlay: boolean;
  autoplayTimout: any; //property for holding a timout that can be cleared by user interaction


  constructor(private route: ActivatedRoute, private bookService: BookService, private userService: UserService, private modalService: NgbModal, private router: Router) {

    //Stop playback when leaving page
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.audioplayer.pause();
        modalService.dismissAll('navigation');
      }
    });
  }

  ngOnInit() {
    this.audioplayer = new Audio('../assets/sample.mp3');
    this.audioplayer.load();
    this.firstChunk = true;
    this.book = new Book();
    let userId = Number(localStorage.getItem("user"));
    this.userService.getUserbyId(userId).subscribe((data) => {
      this.user = data;
      this.modalService.open(this.startModalContent, { centered: true, backdrop: 'static', keyboard: false });
    });
    this.route.params.subscribe(param => {
      this.bookService.getBookbyId(param.bookId).subscribe(data => {
        this.book = data;
        this.bookLoaded = true;
        this.prepareGame();
      });
    })
  }

  /*############################################################ Game Process ############################################################*/
  private prepareGame() {
    console.log("[Game][Preparation] Preparing game logic");

    //Create two arrays to store the wrong played indexes and the ones the player actually found during the game
    this.wrongReadIndexes = new Array();
    for (let i = 0; i < this.book.textChunks.length; i++) {
      this.wrongReadIndexes.push(false);
    }
    this.foundWrongIndexes = Object.assign([], this.wrongReadIndexes);
  }

  //Register event that sets gamestate to ended after player finishes current chunk
  private RegisterAudioFinishedEvent() {
    this.audioEndedEvent = fromEvent(this.audioplayer, 'ended');
    this.audioEndedEvent.subscribe(() => {
      
      this.gameState = GameState.ChunkEnded;
      if (this.currentTextChunk == this.book.textChunks.length - 1) {
        this.finishGame();
        return;
      }
      if (this.bAutoPlay) {
        this.autoPlay();
      }
    });
  }

  private finishGame() {
    this.highlightCurrentChunk(this.book.textChunks.length);
    console.log("[Game] Text finished...highlighting missed errors...returning");

    this.lookForMissedChunks();
    this.addCreditsToPlayerAccount();
    this.modalService.open(this.endModalContent, { windowClass: "game-modal", centered: true, backdrop: 'static', keyboard: false });
  }

  private async autoPlay() {
    await new Promise(resolve => this.autoplayTimout = setTimeout(() => resolve(), (this.progressDelay * 1000))).then(() => {
      this.playNextChunk();
    });
  }

  playNextChunk() {
    this.gameState = GameState.Playing;
    this.currentTextChunk++;
    this.modalDisplayText = this.book.textChunks[this.currentTextChunk].text;
    this.highlightCurrentChunk(this.currentTextChunk);
    this.playChunkAudioAtRandom();
    this.firstChunk = false;
    this.skipImmediatly = false;
    this.RegisterAudioFinishedEvent();
  }

  private async playChunkAudioAtRandom() {
    if (Math.floor((Math.random() * 100)) > 45) {
      console.log("[Game][Playback][RNG] Correct file is being played");
      this.audioplayer = new Audio('./assets/books/' + this.book.id + '/correct/' + this.book.textChunks[this.currentTextChunk].audioCorrect);
    }
    else {
      console.log("[Game][Playback][RNG] Wrong file is being played");
      this.wrongReadIndexes[this.currentTextChunk] = true;
      this.audioplayer = new Audio('./assets/books/' + this.book.id + '/wrong/' + this.book.textChunks[this.currentTextChunk].audioWrong);
    }
    this.audioplayer.load();
    let dataLoaded = fromEvent(this.audioplayer, 'canplaythrough');
    dataLoaded.subscribe(() => this.audioplayer.play());
    //await new Promise(resolve => setTimeout(() => resolve(), 150)).then(() => this.audioplayer.play());
  }

  private lookForMissedChunks() {
    for (let index = 0; index < this.wrongReadIndexes.length; index++) {
      if (this.wrongReadIndexes[index] !== this.foundWrongIndexes[index]) {
        this.chunksMissed++;
      }
    }
  }

  private addCreditsToPlayerAccount() {
    this.user.points += (this.earnedCoins);
    this.userService.updateUser(this.user).subscribe(
      res => {
        console.log('success');
      },
      err => {
        console.log('error');
      }
    );
  }

  /*############################################################ DOM Manipulation ############################################################*/
  private highlightCurrentChunk(index) {

    let chunks = this.chunkPool.toArray();

    if (!this.firstChunk) {
      chunks[index - 1].nativeElement.classList.remove('snippet-active');

      if (!chunks[index - 1].nativeElement.classList.contains('bg-success')) {
        chunks[index - 1].nativeElement.classList.add('snippet');
      }
    }
    if (index < this.book.textChunks.length) {
      console.log("[Game][GUI] Active Chunk is being highlighted");
      chunks[index].nativeElement.classList.remove('snippet');
      chunks[index].nativeElement.classList.add('snippet-active');
      this.scrollToActiveChunk();
    }
  }

  private attachChunkAudioPlayer(chunkIndex) {
    let audioPl = document.createElement('audio');
    audioPl.controls = true;
    audioPl.src = './assets/books/' + this.book.id + '/wrong/' + this.book.textChunks[chunkIndex].audioWrong;

    let errorDescription = document.createElement('span');
    errorDescription.innerHTML = this.getTranslatedErrorType(chunkIndex) + ': ' + this.book.textChunks[chunkIndex].error[1];

    document.getElementById(('player-container-' + chunkIndex)).appendChild(audioPl);
    document.getElementById(('error-container-' + chunkIndex)).appendChild(errorDescription);
  }

  private scrollToActiveChunk() {
    let $snippetContainer = jQuery('.snippet-container')
    var $scrollTo = jQuery('#chunk-' + this.currentTextChunk);

    $snippetContainer.animate({
      scrollTop: $scrollTo.offset().top - $snippetContainer.offset().top + $snippetContainer.scrollTop()
    });
  }

  private displayMissedChunks() {
    for (let index = 0; index < this.wrongReadIndexes.length; index++) {
      if (this.wrongReadIndexes[index] !== this.foundWrongIndexes[index]) {
        let chunk = document.getElementById("chunk-" + index);
        chunk.classList.add("snippet-missed");
        this.attachChunkAudioPlayer(index);
      }
    }
  }

  private attachModalAudioPlayer_wrong() {
    let wrongAudioPl = document.createElement('audio');
    wrongAudioPl.controls = true;
    wrongAudioPl.src = './assets/books/' + this.book.id + '/wrong/' + this.book.textChunks[this.currentTextChunk].audioWrong;

    document.getElementById('wrongAudioContainer').appendChild(wrongAudioPl);
  }

  private async attachModalAudioPlayer_correct() {
    await new Promise(resolve => setTimeout(() => resolve(), (75))).then(() => {
      let correctAudioPl = document.createElement('audio');
      correctAudioPl.controls = true;
      correctAudioPl.src = './assets/books/' + this.book.id + '/correct/' + this.book.textChunks[this.currentTextChunk].audioCorrect;
      document.getElementById('correctAudio').appendChild(correctAudioPl);
    });
  }

  private getTranslatedErrorType(index): string {
    let errorType = this.book.textChunks[index].error[0];
    if (this.book.language !== "en-EN") {
      switch (errorType) {
        case "Semantic": {
          errorType = "Semantikfehler";
          break;
        }
        case "Syntactic": {
          errorType = "Syntaxfehler";
          break;
        }
        case "Smoothness": {
          errorType = "Flüssigkeitsfehler";
          break;
        }
        case "Context": {
          errorType = "Kontextfehler";
          break;
        }
        case "Phrasing": {
          errorType = "Betonungsfehler";
          break;
        }
        case "Tense": {
          errorType = "Tempusfehler";
          break;
        }
      }
    }
    else {
      errorType += " error";
    }

    return errorType;
  }

  /*############################################################ Button interactions ############################################################*/
  public onStopBtnClick() {
    if (this.wrongReadIndexes[this.currentTextChunk] && !this.foundWrongIndexes[this.currentTextChunk]) {
      if (this.bAutoPlay)
        clearTimeout(this.autoplayTimout);

      console.log("[Game][GUI] User found an error");
      this.audioplayer.pause();
      this.paused = true;
      this.foundWrongIndexes[this.currentTextChunk] = true;
      document.getElementById('chunk-' + this.currentTextChunk).classList.add('snippet-found');

      this.modalService.open(this.gameModalContent, { windowClass: "game-modal", centered: true, size: "lg", backdrop: 'static', keyboard: false });
      this.coinsToAdd = this.book.textChunks[this.currentTextChunk].points / 2;
      this.attachModalAudioPlayer_wrong();
    }
    else {
      //TODO: User error handling
      console.log("[Game][GUI] User made an error");
      this.errorCount++;
      this.looseCoinsAnimation();
    }
  }

  private replayAfterStop() {

    this.paused = false;
    this.hasAnswered = false;
    this.coinAnimation();
    this.audioplayer = new Audio('./assets/books/' + this.book.id + '/correct/' + this.book.textChunks[this.currentTextChunk].audioCorrect);
    this.RegisterAudioFinishedEvent();
    this.audioplayer.load();
    let dataLoaded = fromEvent(this.audioplayer, 'canplaythrough');
    dataLoaded.subscribe(() => this.audioplayer.play());
  }

  //regular pause
  public onNextBtnClick() {
    //Check if current playback has ended. Jump to next Chunk if it has
    if (this.gameState == GameState.ChunkEnded) {
      if (this.bAutoPlay)
        clearTimeout(this.autoplayTimout);

      this.playNextChunk();
      return;
    }
    //Otherwise pause/unpause playback
    if (this.gameState == GameState.Playing) {
      this.audioplayer.pause();
      this.gameState = GameState.Paused;
      return;
    }
    this.audioplayer.play();
    this.gameState = GameState.Playing;
  }

  public onRepeatBtnClick() {
    if (this.bAutoPlay)
      clearTimeout(this.autoplayTimout);

    this.audioplayer.currentTime = 0;
    this.audioplayer.play();

  }

  public onGameBtnClick(type: string) {
    this.hasAnswered = true;
    if (type == this.book.textChunks[this.currentTextChunk].error[0]) {
      this.coinsToAdd += this.book.textChunks[this.currentTextChunk].points / 2;
      this.answeredCorrect = true;
    }
    else {
      this.answeredCorrect = false;
    }
    this.attachModalAudioPlayer_correct();
  }

  private progessDelay() {
    console.log('Delay set to ' + this.progressDelay + ' seconds.');
  }

  async coinAnimation() {
    let $target = jQuery("#coin-pool");
    let randomModifier = 100;
    let $source = jQuery("#chunk-" + this.currentTextChunk);
    for (let i = 0; i < this.coinsToAdd; i++) {
      await new Promise(resolve => setTimeout(() => resolve(), (20 + Math.random() * randomModifier / 2))).then(() => {
        this.addPoint();
        let $coin = jQuery('<img class="coin" src="../../assets/img/coin.svg">')
          .insertAfter($source)
          .css({
            "left": $source.offset().left + (Math.random() * randomModifier * 20 - Math.random() * randomModifier * 3),
            "top": $source.offset().top + (Math.random() * randomModifier - Math.random() * randomModifier)
          })
          .animate({
            "top": ($target.offset().top - 90),
            "left": $target.offset().left + 50 + (Math.random() * randomModifier / 3 - Math.random() * randomModifier / 3)
          }, 1000, function () {
            $coin.remove();
          });
      });
    }
    this.coinsToAdd = 0;
  }

  async looseCoinsAnimation() {
    let $source = jQuery("#coin-pool");
    let $target = jQuery("#coin-pool");
    let randomModifier = 50;
    for (let i = 0; i < this.errorCount * 2; i++) {
      if (this.earnedCoins > 0) {
        jQuery($target).addClass("text-danger");
        jQuery($target).removeClass("text-light");
        await new Promise(resolve => setTimeout(() => resolve(), (50 + Math.random() * randomModifier / 2))).then(() => {
          this.earnedCoins--;
          jQuery($target).removeClass("text-danger");
          jQuery($target).addClass("text-light");
        });
      }
      else {
        break;
      }

    }

  }

  navigateToBookshelf() {
    this.router.navigate(["/LbT/" + this.user.id + "/bookshelf"]);
  }
  async addPoint() {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => { this.earnedCoins++ });
  }

  openSettingsModal() {
    this.modalService.open(this.settingsModalContent, { centered: true })
  }

  debugOpenGameModal() {
    this.modalService.open(this.gameModalContent, { windowClass: "game-modal", centered: true, size: "lg", backdrop: 'static', keyboard: false });
  }

} 
