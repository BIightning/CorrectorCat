import { TranslocoService } from '@ngneat/transloco';
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
  @Input("targetText") targetText: string[];
  @Input("isPreview") bIsPreview: boolean;
  @Output("allowContinue") allowContinue = new EventEmitter();

  audioplayer: HTMLAudioElement;
  baseUrl: string;

  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) 
  { 
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

  /**
   * Navigates to the book assigned to the current language
   */
  goGameView(): void{
    if(!this.bIsPreview)
      switch(this.translocoService.getActiveLang()){
        case 'de-DE':
          this.router.navigate(["/game/game-view/" +this.targetText[1] +"/"]);
          break;
        case 'pt-PT':
          this.router.navigate(["/game/game-view/" +this.targetText[2] +"/"]);
          break;
        case 'el-EL':
          this.router.navigate(["/game/game-view/" +this.targetText[3] +"/"]);
          break;
        default: //english as last option and fallback
          this.router.navigate(["/game/game-view/" +this.targetText[0] +"/"]);
      }
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
