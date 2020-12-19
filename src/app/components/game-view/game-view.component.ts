import { environment } from './../../../environments/environment';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { GameState } from './stateMachine';
import { Component, OnInit, HostBinding, ViewChild, Input, ViewChildren, QueryList } from '@angular/core';
import * as jQuery from 'jquery';
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Book } from 'src/app/classes/book';
import { UserService } from "../../services/user.service";
import { User } from 'src/app/classes/users';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css'],
})

export class GameViewComponent implements OnInit {

  @ViewChildren("chunkPool") chunkPool;

  user: User;
  audioplayer: HTMLAudioElement;
  progressDelay: number = 1;
  book: Book;

  baseUrl: string;

  modalDisplayText: string = 'Content is being loaded';
  earnedCoins: number = 0;
  coinsToAdd: number = 0;
  errorCount: number = 0;
  chunksMissed: number = 0;

  currentTextChunk: number = -1;

  bShowGameModal: boolean = false;
  bShowStartModal: boolean = false;
  bShowSettingsModal: boolean = false;
  bShowEndModal: boolean = false;

  bFirstChunk: boolean = true;
  bHasAnswered: boolean;
  bBookLoaded: boolean;
  bAnsweredCorrect: boolean;
  bAutoPlay: boolean = true;
  wrongReadIndexes: boolean[];
  foundWrongIndexes: boolean[];

  routerEvent: Subscription;
  audioEndedEvent: Observable<Event>;
  gameState: GameState = GameState.ChunkEnded;
  autoplayTimout: any; //property for holding a timout that can be cleared by user interaction


  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService, 
    private userService: UserService, 
    private router: Router) 
    {
      this.baseUrl = environment.baseUrl;
      //Stop playback when leaving page
      this.routerEvent = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.audioplayer.pause();
        }
      });
  }

  ngOnInit(): void {
    this.audioplayer = new Audio('../assets/sample.mp3');
    this.audioplayer.load();
    this.book = new Book();
    let userId = localStorage.getItem("user");
    this.userService.getUserbyId(userId).subscribe((data) => {
      this.user = data;
  
      //this.modalService.open(this.startModalContent, { centered: true, backdrop: 'static', keyboard: false });
    });
    this.route.params.subscribe(param => {
      this.bookService.getBookByTitle(param.bookId).subscribe(data => {
        this.book = data;
        this.bBookLoaded = true;
        this.bShowStartModal = true;
        this.prepareGame();
      });
    })
  }

  /*############################################################ Game Process ############################################################*/
  private prepareGame(): void {
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

  private finishGame(): void {
    this.highlightCurrentChunk(this.book.textChunks.length);
    console.log("[Game] Text finished...highlighting missed errors...returning");

    this.lookForMissedChunks();
    this.addCreditsToPlayerAccount();
    this.bShowEndModal = true;
  }

  public handleBookCompletion(): void {
    if(this.book.tutorialAfterCompletion)
    {
      this.router.navigate([`game/tutorial/${this.book.tutorialAfterCompletion}`], {queryParams: { bAfterGame: true }});
      return;
    }
    this.router.navigate([`game/dashboard`]);
  }

  private async autoPlay(): Promise<void> {
    await new Promise(resolve => this.autoplayTimout = setTimeout(() => resolve({}), (this.progressDelay * 1000))).then(() => {
      this.playNextChunk();
    });
  }

  playNextChunk(): void {
    this.gameState = GameState.Playing;
    this.currentTextChunk++;
    this.modalDisplayText = this.book.textChunks[this.currentTextChunk].text;
    this.highlightCurrentChunk(this.currentTextChunk);
    this.playChunkAudioAtRandom();
    this.bFirstChunk = false;
    this.RegisterAudioFinishedEvent();
  }

  private async playChunkAudioAtRandom(): Promise<void> {
    if (Math.floor((Math.random() * 100)) < 40) {
      console.log("[Game][Playback][RNG] Correct file is being played");
      this.audioplayer = new Audio(`${environment.baseUrl}${this.book.textChunks[this.currentTextChunk].audioCorrect}`);
    }
    else {
      console.log("[Game][Playback][RNG] Wrong file is being played");
      this.wrongReadIndexes[this.currentTextChunk] = true;
      this.audioplayer = new Audio(`${environment.baseUrl}${this.book.textChunks[this.currentTextChunk].audioWrong}`);
    }
    this.audioplayer.load();
    let dataLoaded = fromEvent(this.audioplayer, 'canplaythrough');
    dataLoaded.subscribe(() => this.audioplayer.play());

  }

  private lookForMissedChunks(): void {
    for (let index = 0; index < this.wrongReadIndexes.length; index++) {
      if (this.wrongReadIndexes[index] !== this.foundWrongIndexes[index]) {
        this.chunksMissed++;
      }
    }
  }

  private addCreditsToPlayerAccount(): void {
    this.user.credits += (this.earnedCoins);
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
  private highlightCurrentChunk(index): void {

    let chunks = this.chunkPool.toArray();

    if (!this.bFirstChunk) {
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

  private attachChunkAudioPlayer(chunkIndex): void {
    let audioPl = document.createElement('audio');
    audioPl.controls = true;
    audioPl.src =  `${environment.baseUrl}${this.book.textChunks[chunkIndex].audioWrong}`;

    let errorDescription = document.createElement('span');
    errorDescription.innerHTML = this.book.textChunks[chunkIndex].question.explanation;

    document.getElementById(('player-container-' + chunkIndex)).appendChild(audioPl);
    document.getElementById(('error-container-' + chunkIndex)).appendChild(errorDescription);
  }

  private scrollToActiveChunk(): void {
    let $snippetContainer = jQuery('.snippet-container')
    var $scrollTo = jQuery('#chunk-' + this.currentTextChunk);

    $snippetContainer.animate({
      scrollTop: $scrollTo.offset().top - $snippetContainer.offset().top + $snippetContainer.scrollTop()
    });
  }

  public displayMissedChunks(): void {
    for (let index = 0; index < this.wrongReadIndexes.length; index++) {
      if (this.wrongReadIndexes[index] !== this.foundWrongIndexes[index]) {
        let chunk = document.getElementById("chunk-" + index);
        chunk.classList.add("snippet-missed");
        this.attachChunkAudioPlayer(index);
      }
    }
  }

  private attachModalAudioPlayer_wrong(): void {
    let wrongAudioPl = document.createElement('audio');
    wrongAudioPl.controls = true;
    wrongAudioPl.src = `${environment.baseUrl}${this.book.textChunks[this.currentTextChunk].audioWrong}`;

    //document.getElementById('wrongAudioContainer').appendChild(wrongAudioPl);
  }


  /*############################################################ Button interactions ############################################################*/
  public onStopBtnClick(): void {
    if (this.wrongReadIndexes[this.currentTextChunk] && !this.foundWrongIndexes[this.currentTextChunk]) {
      if (this.bAutoPlay)
        clearTimeout(this.autoplayTimout);

      console.log("[Game][GUI] User found an error");
      this.audioplayer.pause();
      this.foundWrongIndexes[this.currentTextChunk] = true;
      document.getElementById('chunk-' + this.currentTextChunk).classList.add('snippet-found');

      this.bShowGameModal = true;
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

  replayAfterStop(): void {

    this.bHasAnswered = false;
    this.coinAnimation();
    this.audioplayer = new Audio(`${environment.baseUrl}${this.book.textChunks[this.currentTextChunk].audioCorrect}`);
    this.RegisterAudioFinishedEvent();
    this.audioplayer.load();
    let dataLoaded = fromEvent(this.audioplayer, 'canplaythrough');
    dataLoaded.subscribe(() => this.audioplayer.play());
  }

  public onNextBtnClick(): void {
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

  public onRepeatBtnClick(): void {
    if (this.bAutoPlay)
      clearTimeout(this.autoplayTimout);

    this.audioplayer.currentTime = 0;
    this.audioplayer.play();

  }

  public onGameBtnClick(index: number): void {
    this.bHasAnswered = true;
    if (index === this.book.textChunks[this.currentTextChunk].question.correctIndex) {
      this.coinsToAdd += this.book.textChunks[this.currentTextChunk].points / 2;
      this.bAnsweredCorrect = true;
    }
    else {
      this.bAnsweredCorrect = false;
    }
  }

  async coinAnimation(): Promise<void> {
    let $target = jQuery("#coin-pool");
    let randomModifier = 75;
    let $source = jQuery("#chunk-" + this.currentTextChunk);
    for (let i = 0; i < this.coinsToAdd; i++) {
      await new Promise(resolve => setTimeout(() => resolve({}), (20 + Math.random() * randomModifier / 2))).then(() => {
        this.addPoint();
        let $coin = jQuery('<img class="coin" src="../../assets/img/coin.svg">')
          .insertAfter($source)
          .css({
            "left": $source.offset().left + (Math.random() * randomModifier * 20 - Math.random() * randomModifier * 3),
            "top": $source.offset().top + (Math.random() * randomModifier - Math.random() * randomModifier)
          })
          .animate({
            "top": ($target.offset().top - 90),
            "left": $target.offset().left + 0 + (Math.random() * randomModifier / 3 - Math.random() * randomModifier / 3)
          }, 1000, function () {
            $coin.remove();
          });
      });
    }
    this.coinsToAdd = 0;
  }

  async looseCoinsAnimation(): Promise<void> {
    let $source = jQuery("#coin-pool");
    let $target = jQuery("#coin-pool");
    let randomModifier = 50;
    for (let i = 0; i < this.errorCount * 2; i++) {
      if (this.earnedCoins > 0) {
        jQuery($target).addClass("text-danger");
        jQuery($target).removeClass("text-light");
        await new Promise(resolve => setTimeout(() => resolve({}), (50 + Math.random() * randomModifier / 2))).then(() => {
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

  navigateToBookshelf(): void {
    this.router.navigate(["/LbT/" + this.user._id + "/bookshelf"]);
  }

  async addPoint(): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve({}), 1000)).then(() => { this.earnedCoins++ });
  }
} 
