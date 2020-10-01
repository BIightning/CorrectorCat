import { TutorialSequenceService } from './../../../services/tutorial-sequence.service';
import { TutorialSequence } from './../../../../assets/classes/tutorialSequence';
import { Component, OnInit } from '@angular/core';
import { FeedbackMessage, MessageType } from 'src/assets/classes/feedbackMessage';

@Component({
  selector: 'app-tutorial-management',
  templateUrl: './tutorial-management.component.html',
  styleUrls: ['./tutorial-management.component.css']
})
export class TutorialManagementComponent implements OnInit {

  tutorials: TutorialSequence[];
  filteredTutorials: TutorialSequence[];
  currentTutorial: TutorialSequence;
  loaded: boolean = false;
  bShowModal: boolean = false;
  feedbackMessage: FeedbackMessage = new FeedbackMessage();

  constructor(private tutorialService: TutorialSequenceService) { }

  ngOnInit(): void {
    this.tutorials = [];
    this.filteredTutorials = [];
    this.updateView();
  }

  updateView(): void {
    this.tutorialService.getAllSequences().subscribe(res => {
      this.tutorials = res;
      this.copyOriginal();
      this.loaded = true;
    });
  }

  filterItem(value) {
    if (!value) {
      this.copyOriginal();
    }
    this.filteredTutorials = Object.assign([], this.tutorials).filter(
      item => item.tutorialTitle.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
  copyOriginal() {
    this.filteredTutorials = Object.assign([], this.tutorials);
  }

  onDeleteClick(tutorial: TutorialSequence): void{
    this.bShowModal = true;
    this.currentTutorial = tutorial;
    console.log(`show delete modal for book: ${tutorial._id}`);
  }
 
  onDeleteConfirm(): void {
    this.tutorialService.deleteSequence(this.currentTutorial._id).subscribe(
      res => { 
        this.showFeedback(`Deleted tutorial "${res.tutorialTitle}"`, MessageType.Success);
        this.updateView();
      },
      err => { this.showFeedback(err.error, MessageType.Error)}
    )
  }
 
  hideModal(): void {
   this.bShowModal = false;
  }

  showFeedback(message: string, type: MessageType, duration?: number){
    this.feedbackMessage = new FeedbackMessage(message, type, duration, true);
  }
 
  resetFeedbackMessage(): void {
    this.feedbackMessage = new FeedbackMessage();
  }

}
