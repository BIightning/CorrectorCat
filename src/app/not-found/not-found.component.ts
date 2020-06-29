import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  imgPath: string = '';
  text: string = ''
  constructor() { }

  ngOnInit() {
    switch(Math.floor((Math.random() * 10))){
      case 0: {
        this.imgPath = '../../assets/img/kitty-avatars/svg/023-kitty-26.svg';
        this.text = 'an astonished kitten';
        break;
      }
      case 1: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/020-kitty-29.svg';
        this.text = 'a wet kitten';
        break;
      }
      case 2: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/014-kitty-35.svg';
        this.text = 'a showering kitten';
        break;
      }
      case 3: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/034-kitty-16.svg';
        this.text = 'a cooking kitten';
        break;
      }
      case 4: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/037-kitty-13.svg';
        this.text = 'a robo-kitten. Beep bop';
        break;
      }
      case 5: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/028-kitty-22.svg';
        this.text = 'an astronaut kitten';
        break;
      }
      case 6: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/011-kitty-38.svg';
        this.text = 'a pirate kitten. ARRRRR';
        break;
      }
      case 7: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/005-kitty-44.svg';
        this.text = 'a frightened kitten';
        break;
      }
      case 8: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/033-kitty-17.svg';
        this.text = 'a sleeping kitten';
        break;
      }
      case 9: {
        this.imgPath = '../../assets//img/kitty-avatars/svg/029-kitty-21.svg';
        this.text = 'a spooking kitten';
        break;
      }
    }
  }

}
