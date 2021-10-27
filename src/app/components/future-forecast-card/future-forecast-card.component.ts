import { Component , Input , OnDestroy , OnInit } from '@angular/core';
import { FutureForecast } from '../../pages/weather-info-page/classes/weather-info.classes';
import { getCurrentCityData , getIsCelsius , WeatherState } from '../../pages/weather-info-page/state/weather-info.reducer';
import { iconsArray } from '../../pages/weather-info-page/classes/weather-info.classes';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable , Subscription } from 'rxjs';
import { AppGlobalState , getIsDarkMode } from '../../app-state/app-state.reducer';

@Component({
  selector: 'app-future-forecast-card',
  templateUrl: './future-forecast-card.component.html',
  styleUrls: ['./future-forecast-card.component.scss']
})
export class FutureForecastCardComponent implements OnInit, OnDestroy{
  @Input() cardData: FutureForecast;
  isDaytime: boolean;
  imgSrc: string;
  storeSub: Subscription = new Subscription();
  tempMin: number;
  tempMax: number;
  isCelsius$: Observable<boolean>;
  isDarkMode$: Observable<boolean>;

  constructor(
    private store: Store<WeatherState>,
    private globalStore: Store<AppGlobalState>
  ) {}

  ngOnInit(): void {
    this.isDarkMode$ = this.globalStore.select(getIsDarkMode);
    this.tempMin = Math.round(this.cardData.Temperature.Minimum.Value);
    this.tempMax = Math.round(this.cardData.Temperature.Maximum.Value);
    this.getWeatherIcon();
    this.isCelsius$ = this.store.select(getIsCelsius);
  }

  getDayName(): string {
    return moment(this.cardData.Date).format('dddd');
  }

  getWeatherIcon(): void {
    this.store.select(getCurrentCityData).subscribe(data => {
      this.isDaytime = data.IsDayTime;
      const dayTimeIconNum = this.cardData.Day.Icon;
      iconsArray.forEach(icon => {
        icon.iconNums.forEach(iconNum => {
          if (this.isDaytime && iconNum === dayTimeIconNum) {
            this.imgSrc = `assets/weather-icons/${icon.name}.svg`;
          } else if (!this.isDaytime && iconNum === dayTimeIconNum) {
            this.imgSrc = `assets/weather-icons/${icon.name}.svg`;
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

}
