import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  currentSlide: number = 0;
  slideCount: number = 9;
  constructor() { }

  ngOnInit() {
    this.removeStartEffect();
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
