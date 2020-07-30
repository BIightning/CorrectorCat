import { TutorialSequenceService } from './../../services/tutorial-sequence.service';
import { TutorialSequence } from './../../../assets/classes/tutorialSequence';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  currLevel: number;
  currentSlide: number = 0;
  slideCount: number = 10;
  sequence: TutorialSequence = new TutorialSequence();

  constructor(private route: ActivatedRoute, private tutorialSequenceService: TutorialSequenceService) {
  }

  ngOnInit() { 
    this.route.params.subscribe(param => { 
      this.currLevel = param.level;
    });
    document.getElementById("scaling-bg").classList.add("level-" + this.currLevel.toString());
    this.removeStartEffect();
    this.sequence = this.tutorialSequenceService.getSequence(this.currLevel);
    console.log(this.sequence);
    

  }

  async removeStartEffect() {
    await new Promise(resolve => setTimeout(()=> resolve(), 1000)).then(async () => {
      document.getElementById("scaling-bg").classList.remove("intro-animation");
      document.getElementById("welcome-cat").classList.remove("cat-land");
      document.getElementById("welcome-cat").classList.add("cat-move");
    });
  }

  async clickBack() {
    if(this.currentSlide > 0){
      document.getElementById("slide-"+this.currentSlide).classList.remove("fade-in");
      document.getElementById("slide-"+this.currentSlide).classList.add("fade-out");
      this.currentSlide--;
      await new Promise(resolve => setTimeout(()=> resolve(), 400)).then(async () => {
        document.getElementById("slide-"+this.currentSlide).classList.remove("d-none")
        document.getElementById("slide-"+this.currentSlide).classList.add("fade-in");
        await new Promise(resolve => setTimeout(()=> resolve(), 100)).then(() => {
          document.getElementById("slide-"+(this.currentSlide+1)).classList.remove("fade-out");
          document.getElementById("slide-"+(this.currentSlide+1)).classList.add("d-none")
        });
      });
    }
  }

  async clickNext() {
    if(this.currentSlide < this.slideCount -1){
      document.getElementById("slide-"+this.currentSlide).classList.remove("fade-in");
      document.getElementById("slide-"+this.currentSlide).classList.add("fade-out");
      this.currentSlide++;
      await new Promise(resolve => setTimeout(()=> resolve(), 400)).then(async () => {
        document.getElementById("slide-"+this.currentSlide).classList.remove("d-none")
        document.getElementById("slide-"+this.currentSlide).classList.add("fade-in");
        await new Promise(resolve => setTimeout(()=> resolve(), 100)).then(() => {
          document.getElementById("slide-"+(this.currentSlide-1)).classList.remove("fade-out");
          document.getElementById("slide-"+(this.currentSlide-1)).classList.add("d-none")
        });
      });
    }
  }



}
