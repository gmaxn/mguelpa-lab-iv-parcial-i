import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { AltaActorComponent } from './routes/alta-actor/alta-actor.component';
import { CountriesListComponent } from './routes/countries-list/countries-list.component';
import { ErrorComponent } from './routes/error/error.component';
import { HomeComponent } from './routes/home/home.component';
import { MovieSearchComponent } from './routes/movie-search/movie-search.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { PeliculaAltaComponent } from './routes/pelicula-alta/pelicula-alta.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { UserAccountComponent } from './routes/user-account/user-account.component';

const routes: Routes = [

  { path: '', component: AltaActorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'pelicula/alta', component: PeliculaAltaComponent },
  { path: 'actor/alta', component: AltaActorComponent },
  { path: 'busqueda', component: MovieSearchComponent },
  { path: 'countries', component: CountriesListComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
