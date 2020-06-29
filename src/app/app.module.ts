import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { QuizComponent } from './quiz/quiz.component';
import { WikiComponent } from './wiki/wiki.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GamePageComponent } from './game-page/game-page.component';
import { UserService } from './user.service';
import { BookService } from './book.service';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
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
    TutorialComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
