import { TranslocoService } from '@ngneat/transloco';
import { TutorialSequenceService } from './../../services/tutorial-sequence.service';
import { TutorialSequence } from 'src/app/classes/tutorialSequence';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Settings } from 'src/app/classes/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  @Input("tutorial") inputTutorial: TutorialSequence;
  @Input("preview") bIsPreview: boolean;
  currLevel: number;
  currentSlide: number = 0;


  bCanContinue: Boolean = true;
  bIsLoaded: Boolean = false;
  sequence: TutorialSequence = new TutorialSequence();
  settings: Settings;

  currLanguage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tutorialSequenceService: TutorialSequenceService,
    private settingsService: SettingsService,
    private translocoService: TranslocoService
  ) 
  {
    this.currLanguage = this.translocoService.getActiveLang();
  }

  ngOnInit() {
    if (this.inputTutorial) {
      this.sequence = this.inputTutorial;
      return;
    }
    document.getElementById("scaling-bg").classList.add("paused");

    this.route.params.subscribe(param => {
      if (param.level) {
        this.currLevel = param.level;

        //Check if this tutorial was called after a game
        this.route.queryParamMap.subscribe(params => {
          if (params.has("bAfterGame")) {
            this.loadTutorialData(param.level);
            return;
          }

          //load one of the primary tutorials if not (level param will be a number between 1 and 4 in this case)
          document.getElementById("scaling-bg").classList.add("level-" + this.currLevel.toString());
          this.settingsService.getSettings().subscribe(res => {
            this.settings = res;
            this.loadTutorialData(this.settings.primaryTutorials[this.currLevel - 1]);
          })
        });
      }
    });
  }

  public getLocalizedText(): string {
    switch(this.currLanguage){
      case 'de-DE':
        return this.sequence.slides[this.currentSlide].slideText.german;

      case 'el-EL':
        return this.sequence.slides[this.currentSlide].slideText.greek;

      case 'pt-PT':
        return this.sequence.slides[this.currentSlide].slideText.portuguese;

      default: //english as last option and fallback
        return this.sequence.slides[this.currentSlide].slideText.english;
    }
  }

  private loadTutorialData(sequenceId: string): void {
    this.tutorialSequenceService.getSequenceById(sequenceId).subscribe(res => {
      document.getElementById("scaling-bg").classList.remove("paused");
      this.bIsLoaded = true;
      this.removeStartEffect();
      this.sequence = res;
      console.log(this.sequence.targetText);
    });
  }

  async removeStartEffect() {
    await new Promise(resolve => setTimeout(() => resolve({}), 1000)).then(async () => {
      document.getElementById("scaling-bg").classList.remove("intro-animation");

    });
  }

  clickBack() {
    this.currentSlide--;
  }

  allowContinue() {
    this.bCanContinue = true;
  }

  clickNext() {
    this.currentSlide++;
    if (this.sequence.slides[this.currentSlide].widgetID != -1 && !this.bIsPreview)
      this.bCanContinue = false;
  }
}
