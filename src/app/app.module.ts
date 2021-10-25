import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';



// Components
import { WeatherInfoPageComponent } from './pages/weather-info-page/weather-info-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';





// Reducers
import {navbarReducer} from './components/nav-bar/state/nav-bar.reducer';
import {weatherInfoReducer} from './pages/weather-info-page/state/weather-info.reducer';
import { WeatherInfoCardComponent } from './components/weather-info-card/weather-info-card.component';
import { FutureForecastCardComponent } from './components/future-forecast-card/future-forecast-card.component';
import { FavoriteCityCardComponent } from './components/favorite-city-card/favorite-city-card.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoPageComponent,
    FavoritesPageComponent,
    NavBarComponent,
    WeatherInfoCardComponent,
    FutureForecastCardComponent,
    FavoriteCityCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({navbar: navbarReducer, weatherInfo: weatherInfoReducer}, {}),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument(
      {
        name: 'weather-app',
        maxAge: 25,
        logOnly: environment.production }
    ),
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
