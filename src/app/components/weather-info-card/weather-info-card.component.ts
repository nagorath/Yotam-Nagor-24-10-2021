import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CurrentCityData, FutureForecast} from '../../pages/weather-info-page/classes/weather-info.classes';
import {Store} from '@ngrx/store';
import {getCurrentCityData, getCurrentCityName, getFutureForecast, State} from '../../pages/weather-info-page/state/weather-info.reducer';

@Component({
  selector: 'app-weather-info-card',
  templateUrl: './weather-info-card.component.html',
  styleUrls: ['./weather-info-card.component.scss']
})
export class WeatherInfoCardComponent implements OnInit, OnDestroy {
  currentCityData$: Observable<CurrentCityData>;
  currentCityData: CurrentCityData;
  cityDataSub: Subscription = new Subscription();
  currentCityName$: Observable<string>;
  futureForecast$: Observable<FutureForecast[]>;
  futureForecastData: FutureForecast[];
  forecastSub: Subscription = new Subscription();
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // this.currentCityData$ = this.store.select(getCurrentCityData);
    this.currentCityName$ = this.store.select(getCurrentCityName);
    // this.futureForecast$ = this.store.select(getFutureForecast);
    this.cityDataSub = this.store.select(getCurrentCityData).subscribe(data => {
      this.currentCityData = data;
    });
    this.forecastSub = this.store.select(getFutureForecast).subscribe(data => {
      console.log(data);
      this.futureForecastData = data;
      console.log(this.futureForecastData);
    });
  }

  ngOnDestroy(): void {
    this.cityDataSub.unsubscribe();
    this.forecastSub.unsubscribe();
  }

}
