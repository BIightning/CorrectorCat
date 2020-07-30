import { Injectable } from '@angular/core';
import { TutorialSequence } from 'src/assets/classes/tutorialSequence';

@Injectable({
  providedIn: 'root'
})
export class TutorialSequenceService {
  seq: TutorialSequence;

  constructor() {
    this.seq = new TutorialSequence( [{
      slideTitle: 'Welcome to Corrector Cat!',
      catPosition: 0,
      catImage: 'derp.jpg',
      slideText: ' My name is Corrector Cat and I am happy that you’re joining me on my adventure. <br>Let’s sink in into the world of stories. We will read and listen to different stories. <br>But the reader makes many mistakes. <br><br>Help me to correct him,'
        + ' so he can become a purrrfect reader as well.'
    },{
      slideTitle: 'yay',
      catPosition: 0,
      catImage: 'derp.jpg',
      slideText: ' We need to show him what kind of mistake he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
    }]);
   }

  public getSequence(level: number): TutorialSequence {
    return this.seq;
  }
}
