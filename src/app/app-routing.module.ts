import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { BookstoreComponent } from './components/bookstore/bookstore.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { AuthGuard } from './auth.guard';
import { StartingPageComponent } from './components/starting-page/starting-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

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
      path: 'tutorial/:level',
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
