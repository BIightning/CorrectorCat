import { FeedbackMessage } from 'src/app/classes/feedbackMessage';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-feedback-message',
  templateUrl: './feedback-message.component.html',
  styleUrls: ['./feedback-message.component.css']
})
export class FeedbackMessageComponent implements OnInit, OnChanges {

  @Input("feedbackMessage") feedbackMessage: FeedbackMessage;
  @Output("durationReached") durationReached = new EventEmitter();

  durationTimeout:any;
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.feedbackMessage.bShow)
      this.notifyAfterDuration();
  }

  notifyAfterDuration(): void {
    clearTimeout(this.durationTimeout);
    this.durationTimeout = setTimeout(()=> { this.durationReached.emit();},(this.feedbackMessage.duration));
  }

}
