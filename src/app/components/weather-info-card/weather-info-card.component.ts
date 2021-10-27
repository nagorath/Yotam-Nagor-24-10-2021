import { Component , OnDestroy , OnInit } from '@angular/core';
import { Observable , Subscription } from 'rxjs';
import { CurrentCityData , FutureForecast , iconsArray } from '../../pages/weather-info-page/classes/weather-info.classes';
import { Store } from '@ngrx/store';
import {
  getCurrentCityData,
  getCurrentCityName,
  getFutureForecast,
  getIsCelsius,
  WeatherState
} from '../../pages/weather-info-page/state/weather-info.reducer';
import * as WeatherInfoActions from '../../pages/weather-info-page/state/weather-info.actions';
import { FavoriteCity } from '../../pages/favorites-page/classes/favorites.classes';
import { FavState , getFavoriteCities } from '../../pages/favorites-page/state/favorites-reducer';
import { setNewFavoriteCity } from '../../pages/favorites-page/state/favorites-actions';
import { UtilsService } from '../../services/utils/utils.service';
import { setCurrentCityFutureForecast } from '../../pages/weather-info-page/state/weather-info.actions';
import { AppGlobalState , getIsDarkMode } from '../../app-state/app-state.reducer';

@Component({
  selector: 'app-weather-info-card',
  templateUrl: './weather-info-card.component.html',
  styleUrls: ['./weather-info-card.component.scss']
})
export class WeatherInfoCardComponent implements OnInit, OnDestroy {
  currentCityData: CurrentCityData;
  cityDataSub: Subscription = new Subscription();
  currentCityName$: Observable<string>;
  isCelsius$: Observable<boolean>;
  futureForecast$: Observable<FutureForecast[]>;
  futureForecastData: FutureForecast[];
  forecastSub: Subscription = new Subscription();
  currentWeatherIcon: string;
  favoriteCitiesSub: Subscription = new Subscription();
  isSetAsFavorite: boolean;
  isDarkMode$: Observable<boolean>;
  constructor(
    private store: Store<WeatherState>,
    private favStore: Store<FavState>,
    private utilsService: UtilsService,
    private globalStore: Store<AppGlobalState>
  ) {}

  ngOnInit(): void {
    this.isDarkMode$ = this.globalStore.select(getIsDarkMode);
    this.currentCityName$ = this.store.select(getCurrentCityName);
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.futureForecast$ = this.store.select(getFutureForecast);
    this.cityDataSub = this.store.select(getCurrentCityData).subscribe(data => {
      this.currentCityData = data;
      this.favoriteCitiesSub = this.favStore.select(getFavoriteCities).subscribe((favoriteCitiesArr: FavoriteCity[]) => {
        let isCityFound = false;
        favoriteCitiesArr.forEach(city => {
          if (this.currentCityData?.Key === city.id) {
            this.isSetAsFavorite = true;
            isCityFound = true;
          } else if (!isCityFound && this.currentCityData?.Key !== city.id) {
            this.isSetAsFavorite = false;
          }
        });
      });
      if (data && data.WeatherIcon) {
        this.getWeatherIcon(data.WeatherIcon);
      }
    });
    this.forecastSub = this.store.select(getFutureForecast).subscribe((data: any) => {
      if (data) {
        this.futureForecastData = data;
      }
    });
  }

  getWeatherIcon(iconNum): void {
    iconsArray.forEach(icon => {
      icon.iconNums.forEach(storedIconNum => {
        if (iconNum === storedIconNum) {
          return this.currentWeatherIcon = `assets/weather-icons/${icon.name}.svg`;
        }
      });
    });
  }

  toggleIsCelsius(isCelsius: boolean): void {
    this.store.dispatch(WeatherInfoActions.toggleIsCelsius({isCelsius}));
    this.onToggleIsCelsius(isCelsius);
  }

  onToggleIsCelsius(isCelsius: boolean): void {
    this.store.select(getFutureForecast).subscribe((futureForeCastArray: FutureForecast[]) => {
        this.futureForecastData = JSON.parse(JSON.stringify(futureForeCastArray));
    });
    this.futureForecastData.map(futureForecast => {
      const tempFutureForecast = {...futureForecast};
      if (isCelsius && tempFutureForecast.Temperature.Maximum.UnitType !== 17) {
        tempFutureForecast.Temperature.Maximum.Value = this.utilsService.parseFtoC(tempFutureForecast.Temperature.Maximum.Value);
        tempFutureForecast.Temperature.Minimum.Value = this.utilsService.parseFtoC(tempFutureForecast.Temperature.Minimum.Value);
        tempFutureForecast.Temperature.Maximum.UnitType = 17;
        tempFutureForecast.Temperature.Minimum.UnitType = 17;
        tempFutureForecast.Temperature.Minimum.Unit = 'C';
        tempFutureForecast.Temperature.Maximum.Unit = 'C';
        return tempFutureForecast;
      } else if (!isCelsius && tempFutureForecast.Temperature.Maximum.UnitType !== 18) {
        tempFutureForecast.Temperature.Maximum.Value = this.utilsService.parseCtoF(tempFutureForecast.Temperature.Maximum.Value);
        tempFutureForecast.Temperature.Minimum.Value = this.utilsService.parseCtoF(tempFutureForecast.Temperature.Minimum.Value);
        tempFutureForecast.Temperature.Maximum.UnitType = 18;
        tempFutureForecast.Temperature.Minimum.UnitType = 18;
        tempFutureForecast.Temperature.Minimum.Unit = 'F';
        tempFutureForecast.Temperature.Maximum.Unit = 'F';
        return tempFutureForecast;
      }
    });
    this.store.dispatch(setCurrentCityFutureForecast({futureForecast: this.futureForecastData}));
  }

  toggleCityAsFavorite(cityObj: CurrentCityData): void {
    const favoriteCityObj: FavoriteCity = {
      name: cityObj.LocalizedName,
      id: cityObj.Key,
      currentTemp: cityObj.Temperature.Metric.Value
    };
    let tempFavCitiesArray = [];
    this.favStore.select(getFavoriteCities).subscribe(favoriteCitiesArr => {
      return tempFavCitiesArray = [...favoriteCitiesArr];
    });
    if (this.isSetAsFavorite) {
      tempFavCitiesArray = tempFavCitiesArray.filter(city => city.id !== cityObj.Key);
      this.isSetAsFavorite = false;
    } else {
      tempFavCitiesArray.push(favoriteCityObj);
      this.isSetAsFavorite = true;
    }
    this.setFavoriteCitiesToLocalHost(tempFavCitiesArray);
    this.favStore.dispatch(setNewFavoriteCity({favoriteCity: tempFavCitiesArray}));
  }

  setFavoriteCitiesToLocalHost(favoriteCitiesArray): void {
    localStorage.setItem('favoriteCitiesArray', JSON.stringify(favoriteCitiesArray));
  }

  ngOnDestroy(): void {
    this.cityDataSub.unsubscribe();
    this.forecastSub.unsubscribe();
    this.favoriteCitiesSub.unsubscribe();
  }

}
