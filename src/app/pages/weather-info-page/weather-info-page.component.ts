import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscriber} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {City, CurrentCityData, FutureForecast} from './classes/weather-info.classes';
import {getAccuWeatherApiKey, getIsCelsius, State} from './state/weather-info.reducer';
import * as WeatherInfoActions from './state/weather-info.actions';
import {Store} from '@ngrx/store';
import {DataService} from '../../services/data.service';
import {toggleIsCelsius} from './state/weather-info.actions';
export interface User {
  name: string;
}
@Component({
  selector: 'app-weather-info-page',
  templateUrl: './weather-info-page.component.html',
  styleUrls: ['./weather-info-page.component.scss']
})
export class WeatherInfoPageComponent implements OnInit {
  fakeCurrentCity: CurrentCityData = {
      LocalObservationDateTime: '2021-10-25T09:46:00+03:00',
      EpochTime: 1635144360,
      WeatherText: 'Partly sunny',
      WeatherIcon: 3,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: true,
      Temperature: {
        Metric: {
          Value: 23.2,
          Unit: 'C',
          UnitType: 17
        },
        Imperial: {
          Value: 74,
          Unit: 'F',
          UnitType: 18
        }
      },
      MobileLink: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us',
      Link: 'http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us'
    };
  citiesArray: City[] = [];
  autocompleteFormControl = new FormControl();
  filteredCities: Observable<any>;
  apiKey$: Observable<string>;
  isCelsius$: Observable<boolean>;
  isLoading: boolean;
  constructor(private http: HttpClient, private store: Store<State>, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.apiKey$ = this.store.select(getAccuWeatherApiKey);
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.filteredCities = this.autocompleteFormControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
         return this.getCities(val || '');
        }),
      );
  }

  getCities(val: string): any {
    let apiKey = '';
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    return this.dataService.getCitiesData(apiKey, val).pipe(
      map((input: City[]) => input ? input : this.citiesArray.slice())
      );
  }

  test() {

  }

  onCitySelect(cityObj: City): void {
    let apiKey = '';
    let isCelsius: boolean;
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    this.isCelsius$.subscribe(bol => {
      isCelsius = bol;
    });
    this.dataService.getCurrentCityCondition(apiKey, cityObj.Key).subscribe((res: CurrentCityData) => {
      this.store.dispatch(WeatherInfoActions.setCurrentCityData({currentCityData: res[0]}));
      this.store.dispatch(WeatherInfoActions.setCurrentCityName({currentCityName: cityObj.LocalizedName}));
    });
    this.dataService.getFutureForecast(apiKey, cityObj.Key, isCelsius).subscribe((res: FutureForecast[]) => {
        this.store.dispatch(WeatherInfoActions.setCurrentCityFutureForecast({futureForecast: res}));
    });

    // this.store.dispatch(WeatherInfoActions.setCurrentCityData({currentCityData: this.fakeCurrentCity}));
  }

  displayFn(cityObj): string {
    return cityObj ? cityObj.LocalizedName + ', ' + cityObj.Country.LocalizedName : '';
  }
  //
  // getCities(input): any {
  //   const filterValue = input.toLowerCase();
  //   return this.options.filter(option => option.LocalizedName.toLowerCase().includes(filterValue));
  // }

  // getData(input: [], val: string) {
  //   console.log(input);
  //   console.log(val);
  //   const filterValue = val.toLowerCase();
  //   let apiKey = '';
  //   this.apiKey$.subscribe(key => {
  //     apiKey = key;
  //   });
  //   this.dataService.getData(apiKey, filterValue);
  //   // const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${filterValue}`;
  //   // const resp = await this.getCities(url);
  //   // this.options = resp;
  //   const x = input.filter((option: any)  => option.LocalizedName.toLowerCase().includes(filterValue));
  //   console.log(x);
  //   return x;
  // }
  //
  // public getCities(url): Promise<any>{
  //   return this.http.get(url).toPromise();
  // }

  // getCities(input) {
  //   this.getData(input).subscribe(res => {
  //     console.log(res);
  //     this.options = res;
  //     // return this.options.filter(option => option.LocalizedName.toLowerCase().includes(input));
  //   });
  // }
}
