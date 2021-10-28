import { Component , OnInit } from '@angular/core';
import { FavState , getFavoriteCities } from './state/favorites-reducer';
import { Store } from '@ngrx/store';
import { Observable , Subscription } from 'rxjs';
import { FavoriteCity } from './classes/favorites.classes';
import * as WeatherInfoActions from '../weather-info-page/state/weather-info.actions';
import { getIsCelsius } from '../weather-info-page/state/weather-info.reducer';
import { getIsDarkMode } from '../../app-state/app-state.reducer';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteCitiesSub: Subscription = new Subscription();
  favoriteCities: FavoriteCity[];
  isCelsius$: Observable<boolean>;
  isDarkMode$: Observable<boolean>;

  constructor(private store: Store<FavState>) {}

  ngOnInit(): void {
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.isDarkMode$ = this.store.select(getIsDarkMode);
    this.favoriteCitiesSub = this.store.select(getFavoriteCities).subscribe(favoriteCities => {
      this.favoriteCities = favoriteCities;
    });
  }



  toggleIsCelsius(isCelsius: boolean): void {
    this.store.dispatch(WeatherInfoActions.toggleIsCelsius({isCelsius}));
  }

}
