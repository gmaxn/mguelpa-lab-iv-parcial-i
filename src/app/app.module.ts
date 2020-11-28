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
import { CountriesListComponent } from './routes/countries-list/countries-list.component';
import { CountriesGirdComponent } from './routes/countries-list/countries-gird/countries-gird.component';
import { HttpClientModule } from '@angular/common/http';
import { MultiselectorDropdownComponent } from './shared/multiselector-dropdown/multiselector-dropdown.component';
import { BetweenRangeComponent } from './shared/between-range/between-range/between-range.component';
import { AltaActorComponent } from './routes/alta-actor/alta-actor.component';
import { TablaPaisesComponent } from './shared/tabla-paises/tabla-paises.component';
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
    MovieDetailsComponent,
    CountriesListComponent,
    CountriesGirdComponent,
    MultiselectorDropdownComponent,
    BetweenRangeComponent,
    AltaActorComponent,
    TablaPaisesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
