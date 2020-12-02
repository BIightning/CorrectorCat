import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AdminLevelSettings } from 'src/app/classes/settings';
import { TutorialSequence } from 'src/app/classes/tutorialSequence';
import { SettingsService } from 'src/app/services/settings.service';
import { StatusService } from 'src/app/services/status.service';
import { TutorialSequenceService } from 'src/app/services/tutorial-sequence.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public tutorials: TutorialSequence[];

  public settings: AdminLevelSettings;
  public bLoaded: Boolean = false;
  public bForceLanguage: Boolean = true;
  public bRemoteLoginApiConnected: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private statusService: StatusService,
    private tutorialService: TutorialSequenceService
    ) { }

  ngOnInit(): void {
    this.updateView();
  }
  
  private updateView(): void {
    this.settingsService.getAdminLevelSettings().subscribe(res => {
      this.settings = res;
  
      this.tutorialService.getAllSequences().subscribe(res => {
        this.tutorials = res;
  
        this.statusService.getGameletServerStatus().subscribe(res => {
          this.bRemoteLoginApiConnected = res;
  
          this.bLoaded = true;
        });
  
      });
    });

  }

  public saveSettings(): void {
    this.bLoaded = false;
    this.settingsService.saveSettings(this.settings).subscribe(res => {
     
      this.updateView();
    });
  }
}
