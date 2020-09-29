import { AdminGuard } from './admin.guard';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
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
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { BookManagementComponent } from './components/admin/book-management/book-management.component';
import { TutorialManagementComponent } from './components/admin/tutorial-management/tutorial-management.component';
import { PageManagementComponent } from './components/admin/page-management/page-management.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { BookEditorComponent } from './components/admin/book-editor/book-editor.component';
import { TutorialEditorComponent } from './components/admin/tutorial-editor/tutorial-editor.component';
import { UserEditorComponent } from './components/admin/user-editor/user-editor.component';

const routes: Routes = [
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
    path: 'game',
    component: GamePageComponent,
    canActivateChild: [AuthGuard],
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
    path: 'admin',
    component: AdminPageComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'usermanagement',
        component: UserManagementComponent
      },
      {
        path: 'usereditor/:id',
        component: UserEditorComponent
      },
      {
        path: 'bookmanagement',
        component: BookManagementComponent
      },
      {
        path: 'bookeditor/:id',
        component: BookEditorComponent
      },
      {
        path: 'tutorialmanagement',
        component: TutorialManagementComponent
      },
      {
        path: 'tutorialeditor/:id',
        component: TutorialEditorComponent
      },
      {
        path: 'pagemanagement',
        component: PageManagementComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
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
