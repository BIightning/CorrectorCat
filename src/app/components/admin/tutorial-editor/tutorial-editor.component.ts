import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-editor',
  templateUrl: './tutorial-editor.component.html',
  styleUrls: ['./tutorial-editor.component.css']
})
export class TutorialEditorComponent implements OnInit {

  loaded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
