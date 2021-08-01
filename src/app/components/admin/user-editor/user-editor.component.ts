import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackMessage, MessageType } from 'src/app/classes/feedbackMessage';
import { User } from 'src/app/classes/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

public user: User;
public bLoaded: boolean;
public bIsNew: boolean;
public bPasswordDialogue: boolean;
public feedbackMessage: FeedbackMessage;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { 
    this.feedbackMessage = new FeedbackMessage();
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let title = params['saved']
      if(title)
        this.showFeedback(`The user "${title}" was saved successfully.`, MessageType.Success, 3000);
    });
    this.loadUser();
  }

  private async loadUser(): Promise<void>{
    let id = this.route.snapshot.paramMap.get("id");
    if(id === "new")
    {
      this.bIsNew = true;
      //TODO handle creation
      return;
    }
    this.user = await this.userService.getUserbyId(id).toPromise();
    this.bLoaded = true;
  }

  public onSaveClick(): void {

  }

  
  private showFeedback(message: string, type: MessageType, duration?: number): void {
    this.feedbackMessage = new FeedbackMessage(message, type, duration, true);
  }

  public resetFeedbackMessage(): void {
    this.feedbackMessage = new FeedbackMessage();
  }

}
