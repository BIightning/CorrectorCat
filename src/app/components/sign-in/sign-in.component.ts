import { TranslocoService } from '@ngneat/transloco';
import { Settings } from './../../classes/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public email: string = "";
  public password: string = "";
  private activityId: number;
  public bLoading: boolean = false;
  public settings: Settings;

  public serverMessage: string;

  constructor(
    private authService : AuthService,
    private settingsService: SettingsService, 
    private translocoService: TranslocoService,
    private router : Router,  
    private route: ActivatedRoute
  ) 
  { }

  ngOnInit() {
    this.email="max@mustermann.de";
    this.password ="123456";
    this.route.queryParams.subscribe(params => {
      let id = params['activityid'];

      if(id)
        this.activityId = id;
    });
    this.settingsService.getSettings().subscribe(res => {
      this.settings = res;
    });


  }

  /**
   * Handles a login attempt of a user
   */
  public checkUser(): void {
      this.bLoading = true;
      this.authService.loginUser(this.email, this.password, this.activityId).subscribe(res => {
        console.log(res.user);
        localStorage.setItem("jwt", String(res.jwt));
        localStorage.setItem("user", String(res.user._id));

        if(this.authService.getIsNativeUser()){
          if(!this.settings.bSystemBasedLanguage)
          {
            this.setLanguage(this.settings.forcedLanguage);
          }
          else {
            let userLang = navigator.language; 
            console.log(userLang)
            this.setLanguage(userLang);
          }
          this.router.navigate(["/game"]);
          return;
        }
        this.router.navigate(["/game"]);
      },
      err => {
        console.log(err.error)
        this.serverMessage = err.error;
        this.bLoading = false;
      });
  }
  
  /**
   * Attempts to set the app language to the passed in language
   * Defaults to british english if language isn't supported
   * @param language The language (iso format) we want to set
   */
  private setLanguage(language: string): void {
    for( let lang of this.translocoService.getAvailableLangs())
    {
      console.log(language + ' : ' + lang)
      if(language == lang){
        this.translocoService.setActiveLang(language);
        localStorage.setItem('currentLanguage', language);
        console.log(`language set to ${language}`);
        return;
      }
    }

    this.translocoService.setActiveLang('en-GB');
    console.warn(`language ${language} is not supported. Falling back to en-GB`);
    localStorage.setItem('currentLanguage', 'en-GB');
  }

}
