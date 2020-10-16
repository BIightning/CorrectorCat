import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-carousel',
  templateUrl: './intro-carousel.component.html',
  styleUrls: ['./intro-carousel.component.css']
})
export class IntroCarouselComponent implements OnInit {

  baseUrl: string;
  constructor() { 
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit(): void {
  }

}
