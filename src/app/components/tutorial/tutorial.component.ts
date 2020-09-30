import { TutorialSequenceService } from './../../services/tutorial-sequence.service';
import { TutorialSequence } from './../../../assets/classes/tutorialSequence';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  bCanContinue: boolean = true;
  sequence: TutorialSequence = new TutorialSequence();

  constructor(private router: Router, private route: ActivatedRoute, private tutorialSequenceService: TutorialSequenceService) {
  }

  ngOnInit() {
    if (this.inputTutorial) {
      this.sequence = this.inputTutorial;
      return;
    }
    document.getElementById("scaling-bg").classList.add("paused");
    this.route.params.subscribe(param => {
      if (param) {
        this.currLevel = param.level;
        document.getElementById("scaling-bg").classList.add("level-" + this.currLevel.toString());

        this.tutorialSequenceService.getSequence(this.currLevel).subscribe(res => {
          document.getElementById("scaling-bg").classList.remove("paused");
          this.removeStartEffect();
          this.sequence = res;
          console.log(this.sequence.targetTextTitle);
        });
      }

    });
  }

  async removeStartEffect() {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(async () => {
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
