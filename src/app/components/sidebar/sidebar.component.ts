import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route: ActivatedRoute ,private router : Router) { }

  ngOnInit() {
  }

  goDashboard(){
    this.router.navigate(["dashboard"], {relativeTo: this.route})
  }

  goBookShelf(){
    this.router.navigate(["bookshelf"], {relativeTo: this.route})
  }

  goBookStore(){
    this.router.navigate(["bookstore"], {relativeTo: this.route})
  }

  goQuiz(){
    this.router.navigate(["quiz", 1], {relativeTo: this.route})
  }

  goWiki(){
    this.router.navigate(["wiki"], {relativeTo: this.route})
  }

  goGameView(){
    this.router.navigate(["game-view", 0], {relativeTo: this.route})
  }
}
