import { TutorialSequenceService } from './services/tutorial-sequence.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookstoreComponent } from './components/bookstore/bookstore.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { UserService } from './services/user.service';
import { BookService } from './services/book.service';
import { StartingPageComponent } from './components/starting-page/starting-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { LevelViewComponent } from './components/level-view/level-view.component';
import { IntroCarouselComponent } from './components/intro-carousel/intro-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SignInComponent,
    SignUpComponent,
    StartingPageComponent,
    DashboardComponent,
    BookshelfComponent,
    BookstoreComponent,
    QuizComponent,
    WikiComponent,
    GameViewComponent,
    GamePageComponent,
    NotFoundComponent,
    TutorialComponent,
    LevelViewComponent,
    IntroCarouselComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, BookService, TutorialSequenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
