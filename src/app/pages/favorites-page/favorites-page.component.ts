import { Component, OnInit } from '@angular/core';
import {FavState, getFavoriteCities} from './state/favorites-reducer';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {FavoriteCity} from './classes/favorites.classes';
import {Router} from '@angular/router';
import * as WeatherInfoActions from '../weather-info-page/state/weather-info.actions';
import {getIsCelsius} from '../weather-info-page/state/weather-info.reducer';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteCitiesSub: Subscription = new Subscription();
  favoriteCities: FavoriteCity[];
  isCelsius$: Observable<boolean>;

  constructor(private store: Store<FavState>) { }

  ngOnInit(): void {
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.favoriteCitiesSub = this.store.select(getFavoriteCities).subscribe(favoriteCities => {
      this.favoriteCities = favoriteCities;
    });
  }

  toggleIsCelsius(isCelsius: boolean): void {
    this.store.dispatch(WeatherInfoActions.toggleIsCelsius({isCelsius}));
  }

}
