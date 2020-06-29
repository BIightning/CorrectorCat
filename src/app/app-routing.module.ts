import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { QuizComponent } from './quiz/quiz.component';
import { WikiComponent } from './wiki/wiki.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AuthGuard } from './auth.guard';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { NotFoundComponent} from './not-found/not-found.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes : Routes = [
  {
    path: '',
    component: StartingPageComponent,
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'registrieren',
    component: SignUpComponent,
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: 'LbT/:userId',
    component: GamePageComponent,
    canActivateChild : [AuthGuard],
    children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'bookshelf',
      component: BookshelfComponent,
    },
    {
      path: 'game-view/:bookId',
      component: GameViewComponent,
    },
    {
      path: 'bookstore',
      component: BookstoreComponent,
    },
    {
      path: 'quiz/:bookId',
      component: QuizComponent,
    },
    {
      path: 'wiki',
      component: WikiComponent,
    },
    {
      path: 'tutorial',
      component: TutorialComponent,
    },
  ]
  },
  {
    path: '**',
    redirectTo: 'notfound',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
