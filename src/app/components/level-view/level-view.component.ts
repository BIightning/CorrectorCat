import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Settings } from 'src/app/classes/settings';
import { User } from 'src/app/classes/users';

@Component({
  selector: 'app-level-view',
  templateUrl: './level-view.component.html',
  styleUrls: ['./level-view.component.css']
})
export class LevelViewComponent implements OnInit {
  @Input('currentLevel') currLevel: number;
  @Output('levelSelect') levelSelect = new EventEmitter();
  user : User;
  settings: Settings;
  numbers: number[];
  bShowActivePrompt: boolean = false;
  

  constructor() {}

  ngOnInit(): void {
    this.numbers = Array(4).fill(1).map((x,i)=>i+1); // [1,2,3,4]
      this.markActivePrompt();
  }

  async markActivePrompt(){
    setTimeout(()=> {
      this.bShowActivePrompt = true;
    });
  }

  navigateToTutorial(promptId: number) {

    if(this.currLevel < promptId || !this.currLevel) 
      return;

    document.getElementById("scaling-bg-"+ promptId.toString()).classList.add("prompt-animation");
    document.getElementById("super-cat").classList.add("super-cat-fly");
    document.getElementById("prompt-text").classList.add("fade-out");

    setTimeout(
      ()=> this.levelSelect.emit({selectedLevel: promptId, animationPlayed: true}), 
      1300
    );
 
   }

}
