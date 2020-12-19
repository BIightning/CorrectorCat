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
import { TutorialWidgetsComponent } from './components/tutorial-widgets/tutorial-widgets.component';
import { QuizWidgetComponent } from './components/widgets/quiz-widget/quiz-widget.component';
import { WorldCanvasComponent } from './components/widgets/world-canvas/world-canvas.component';
import { NgVarDirective } from './directives/ng-var.directive';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { BookManagementComponent } from './components/admin/book-management/book-management.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { TutorialManagementComponent } from './components/admin/tutorial-management/tutorial-management.component';
import { PageManagementComponent } from './components/admin/page-management/page-management.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { BookEditorComponent } from './components/admin/book-editor/book-editor.component';
import { TutorialEditorComponent } from './components/admin/tutorial-editor/tutorial-editor.component';
import { UserEditorComponent } from './components/admin/user-editor/user-editor.component';
import { LoadingAnimationComponent } from './components/admin/loading-animation/loading-animation.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { CountryFromIsoPipe } from './pipes/country-from-iso.pipe';
import { FeedbackMessageComponent } from './components/admin/feedback-message/feedback-message.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';
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
    TutorialWidgetsComponent,
    QuizWidgetComponent,
    WorldCanvasComponent,
    NgVarDirective,
    AdminPageComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    BookManagementComponent,
    UserManagementComponent,
    TutorialManagementComponent,
    PageManagementComponent,
    SettingsComponent,
    BookEditorComponent,
    TutorialEditorComponent,
    UserEditorComponent,
    LoadingAnimationComponent,
    SummaryPipe,
    CountryFromIsoPipe,
    FeedbackMessageComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    TranslocoRootModule
  ],
  providers: [UserService, BookService, TutorialSequenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
