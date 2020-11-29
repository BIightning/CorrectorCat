import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  numbers: any;
  

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.numbers = Array(4).fill(1).map((x,i)=>i+1); // [1,2,3,4]
    this.markActivePrompt();
  }

  async markActivePrompt(){
    await new Promise(resolve => setTimeout(()=> resolve(), 500)).then(()=> {
      document.getElementsByClassName("level-" +this.currLevel.toString())[0].classList.add("active-prompt");
    });
  }

  async navigateToTutorial(promptId: number) {

    if(this.currLevel < promptId || !this.currLevel) return;

    document.getElementById("scaling-bg-"+ promptId.toString()).classList.add("prompt-animation");
    document.getElementById("super-cat").classList.add("super-cat-fly");
    document.getElementById("prompt-text").classList.add("fade-out");

     await new Promise(resolve => setTimeout(()=> resolve(), 1300)).then(()=> {
       //this.router.navigate(["/LbT/" + this.user.id+ "/tutorial/" + promptId.toString()+"/"]);
       this.levelSelect.emit({selectedLevel: promptId, animationPlayed: true});
     });
   }

}
