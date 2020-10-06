import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { ErrorComponent } from './routes/error/error.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { UserAccountComponent } from './routes/user-account/user-account.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
