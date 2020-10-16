import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  mySubscription: any;
  imgPath: string = '';
  text: string = ''
  bMenuOpen: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.bMenuOpen = false;
      }
    });
  }

  ngOnInit() {
  }

  toggleMenu(){
    this.bMenuOpen = !this.bMenuOpen;
  }

  closeMenu(){
    this.bMenuOpen = false;
  }

  swapCat() {
    if (this.bMenuOpen) {
      switch (Math.floor((Math.random() * 15))) {
        case 0: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/023-kitty-shocked.svg';
          this.text = 'an astonished kitten';
          break;
        }
        case 1: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/020-kitty-wet.svg';
          this.text = 'a wet kitten';
          break;
        }
        case 2: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/014-kitty-showering.svg';
          this.text = 'a showering kitten';
          break;
        }
        case 3: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/034-kitty-cook.svg';
          this.text = 'a cooking kitten';
          break;
        }
        case 4: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/037-kitty-robot.svg';
          this.text = 'a robo-kitten. Beep bop';
          break;
        }
        case 5: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/028-kitty-astronaut.svg';
          this.text = 'an astronaut kitten';
          break;
        }
        case 6: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/011-kitty-pirate.svg';
          this.text = 'a pirate kitten. ARRRRR';
          break;
        }
        case 7: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/030-kitty-soapbubbles.svg';
          this.text = 'a soap bubbles blowing kitten';
          break;
        }
        case 8: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/033-kitty-sleeping.svg';
          this.text = 'a sleeping kitten';
          break;
        }
        case 9: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/029-kitty-spooking.svg';
          this.text = 'a spooking kitten';
          break;
        }
        case 10: {
          this.imgPath = 'assets/img/kitty-avatars/svg/016-kitty-laptop.svg';
          this.text = 'a web surfing kitten';
          break;
        }
        case 11: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/031-kitty-detective.svg';
          this.text = 'a detective kitten';
          break;
        }
        case 12: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/046-kitty-bearded.svg';
          this.text = 'a kitten with beard';
          break;
        }
        case 13: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/036-kitty-superhero.svg';
          this.text = 'a super kitten';
          break;
        }
        case 14: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/010-kitty-sleepy-with-coffee.svg';
          this.text = 'a grumpy kitten in the morning';
          break;
        }
        default: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/051-kitty-smiling.svg';
          this.text = 'a smiling';
          break;
        }
      }
    }
  }


}
