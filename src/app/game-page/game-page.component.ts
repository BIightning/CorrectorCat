import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
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

  constructor(private route: ActivatedRoute, private router: Router) {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        var $page = jQuery('.page');
        $page.removeClass('shazam');
      }
    });
  }

  ngOnInit() {
    var $page = jQuery('.page');

    jQuery('.menu_toggle').on('click', function () {
      $page.toggleClass('shazam');
    });
    jQuery('.content_inner').on('click', function () {
      $page.removeClass('shazam');
    });
  }

  swapCat() {
    let menuOpen = document.getElementById("gamePage");
    if (!menuOpen.classList.contains("shazam")) {
      switch (Math.floor((Math.random() * 16))) {
        case 0: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/023-kitty-26.svg';
          this.text = 'an astonished kitten';
          break;
        }
        case 1: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/020-kitty-29.svg';
          this.text = 'a wet kitten';
          break;
        }
        case 2: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/014-kitty-35.svg';
          this.text = 'a showering kitten';
          break;
        }
        case 3: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/034-kitty-16.svg';
          this.text = 'a cooking kitten';
          break;
        }
        case 4: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/037-kitty-13.svg';
          this.text = 'a robo-kitten. Beep bop';
          break;
        }
        case 5: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/028-kitty-22.svg';
          this.text = 'an astronaut kitten';
          break;
        }
        case 6: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/011-kitty-38.svg';
          this.text = 'a pirate kitten. ARRRRR';
          break;
        }
        case 7: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/030-kitty-20.svg';
          this.text = 'a soap bubbles blowing kitten';
          break;
        }
        case 8: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/033-kitty-17.svg';
          this.text = 'a sleeping kitten';
          break;
        }
        case 9: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/029-kitty-21.svg';
          this.text = 'a spooking kitten';
          break;
        }
        case 10: {
          this.imgPath = 'assets/img/kitty-avatars/svg/016-kitty-33.svg';
          this.text = 'a web surfing kitten';
          break;
        }
        case 11: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/031-kitty-19.svg';
          this.text = 'a detective kitten';
          break;
        }
        case 12: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/046-kitty-4.svg';
          this.text = 'a kitten with beard';
          break;
        }
        case 13: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/036-kitty-14.svg';
          this.text = 'a super kitten';
          break;
        }
        case 14: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/010-kitty-39.svg';
          this.text = 'a grumpy kitten in the morning';
          break;
        }
        case 15: {
          this.imgPath = '../../assets/img/kitty-avatars/svg/029-kitty-21.svg';
          this.text = 'a spooking kitten';
          break;
        }

      }
    }
  }


}
