import { Component, OnInit } from '@angular/core';
import { AdminLevelSettings } from 'src/app/classes/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: AdminLevelSettings;
  public bLoaded: Boolean = false;
  public bGeneralSettings: boolean = true;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getAdminLevelSettings().subscribe(res => {
      this.settings = res;
      this.bLoaded = true;
    })
  }

}
