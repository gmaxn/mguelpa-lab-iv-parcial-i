import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { UserAccountComponent } from './routes/user-account/user-account.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { SignUpComponent } from './routes/sign-up/sign-up.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { ErrorComponent } from './routes/error/error.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';

import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AccountsComponent } from './routes/accounts/accounts.component';
import { BienvenidoComponent } from './routes/bienvenido/bienvenido.component';
import { PeliculaAltaComponent } from './routes/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './routes/pelicula-listado/pelicula-listado.component';
import { MovieGridComponent } from './shared/movie-grid/movie-grid.component';
import { MovieSearchComponent } from './routes/movie-search/movie-search.component';
import { MovieDetailsComponent } from './shared/movie-details/movie-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserAccountComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    ErrorComponent,
    TopNavComponent,
    AccountsComponent,
    BienvenidoComponent,
    PeliculaAltaComponent,
    PeliculaListadoComponent,
    MovieGridComponent,
    MovieSearchComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
