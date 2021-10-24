import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { WeatherInfoPageComponent } from './pages/weather-info-page/weather-info-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Reducers
import {navbarReducer} from './components/nav-bar/state/nav-bar.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoPageComponent,
    FavoritesPageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({navbar: navbarReducer}, {}),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
