import {Component, Input, OnInit} from '@angular/core';
import {FavoriteCity} from '../../pages/favorites-page/classes/favorites.classes';
import {FavState} from '../../pages/favorites-page/state/favorites-reducer';
import {Store} from '@ngrx/store';
import {getAccuWeatherApiKey, getCurrentCityData, getIsCelsius, State} from '../../pages/weather-info-page/state/weather-info.reducer';
import {DataService} from '../../services/data/data.service';
import {Observable, Subscription} from 'rxjs';
import {City, CurrentCityData, FutureForecast, iconsArray} from '../../pages/weather-info-page/classes/weather-info.classes';
import {UtilsService} from '../../services/utils/utils.service';
import {Router} from '@angular/router';
import * as WeatherInfoActions from '../../pages/weather-info-page/state/weather-info.actions';

@Component({
  selector: 'app-favorite-city-card',
  templateUrl: './favorite-city-card.component.html',
  styleUrls: ['./favorite-city-card.component.scss']
})
export class FavoriteCityCardComponent implements OnInit {
  @Input() cityId: string;
  @Input() cityName: string;
  imgSrc: string;
  isCelsius$: Observable<boolean>;
  apiKey$: Observable<string>;
  cardData: CurrentCityData;

  constructor(
    private store: Store<State>,
    private dataService: DataService,
    private utilsService: UtilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.apiKey$ = this.store.select(getAccuWeatherApiKey);
    this.getCityData();
  }

  getCityData(): Subscription {
    let apiKey = '';
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    return this.dataService.getCurrentCityCondition(apiKey, this.cityId).subscribe(res => {
      const parsedRes = {
        ...res[0],
        Key: this.cityId,
        LocalizedName: this.cityName,
        isFavorite: true
      };
      this.cardData = parsedRes;
      this.getWeatherIcon(res[0].WeatherIcon);
    }, error => {
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
    });
  }
    getWeatherIcon(iconNum): void {
    iconsArray.forEach(icon => {
      icon.iconNums.forEach(storedIconNum => {
        if (iconNum === storedIconNum) {
          return this.imgSrc = `assets/weather-icons/${icon.name}.svg`;
        }
      });
    });
  }

  onCardClick(): void {
    this.router.navigate(['/weather']);
    let apiKey = '';
    let isCelsius: boolean;
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    this.isCelsius$.subscribe(bol => {
      isCelsius = bol;
    });
    this.dataService.getCurrentCityCondition(apiKey, this.cityId).subscribe((res: CurrentCityData) => {
      const parsedRes = {
        ...res[0],
        Key: this.cityId,
        LocalizedName: this.cityName,
        isFavorite: null
      };
      this.store.dispatch(WeatherInfoActions.setCurrentCityData({currentCityData: parsedRes}));
      console.log(parsedRes);
      this.store.dispatch(WeatherInfoActions.setCurrentCityName({currentCityName: this.cityName}));
    }, err => {
      console.log(err);
    });
    this.dataService.getFutureForecast(apiKey, this.cityId, isCelsius).subscribe((res: FutureForecast[]) => {
      console.log(res);
      this.store.dispatch(WeatherInfoActions.setCurrentCityFutureForecast({futureForecast: res['DailyForecasts']}));
    }, error => {
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
    });
  }
}
