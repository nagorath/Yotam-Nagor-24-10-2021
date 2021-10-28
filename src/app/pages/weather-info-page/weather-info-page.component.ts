import { Component , OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { Observable , Subscription } from 'rxjs';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { City , CurrentCityData } from './classes/weather-info.classes';
import { getAccuWeatherApiKey , getCurrentCityData , getIsCelsius , WeatherState } from './state/weather-info.reducer';
import * as WeatherInfoActions from './state/weather-info.actions';
import { Store } from '@ngrx/store';
import { DataService } from '../../services/data/data.service';
import { UtilsService } from '../../services/utils/utils.service';
import { AppGlobalState , getIsDarkMode } from '../../app-state/app-state.reducer';

@Component({
  selector: 'app-weather-info-page',
  templateUrl: './weather-info-page.component.html',
  styleUrls: ['./weather-info-page.component.scss']
})
export class WeatherInfoPageComponent implements OnInit {
  citiesArray: City[] = [];
  filteredCities: Observable<any>;
  apiKey$: Observable<string>;
  isCelsius$: Observable<boolean>;
  isLoading: boolean;
  searchFromGroup: FormGroup;
  currentCitySub: Subscription = new Subscription();
  isDarkMode$: Observable<boolean>;
  constructor(
    private http: HttpClient,
    private store: Store<WeatherState>,
    private dataService: DataService,
    private utilsService: UtilsService,
    private globalStore: Store<AppGlobalState>
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.isDarkMode$ = this.globalStore.select(getIsDarkMode);
    this.checkIfDarkMode();
    this.apiKey$ = this.store.select(getAccuWeatherApiKey);
    this.isCelsius$ = this.store.select(getIsCelsius);
    this.searchFromGroup.get('citySearch').valueChanges.pipe(
      debounceTime(300),
      filter(val => typeof val === 'string'),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap((val) => this.getCities(val)),
      tap(() => this.isLoading = false)
    ).subscribe((res: City[]) => {
      if (res) {
        this.citiesArray = res;
      }
    }, (err) => {
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
    });
    this.currentCitySub = this.store.select(getCurrentCityData).subscribe(currentCityData => {
      if (!currentCityData) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.getCityByCurrentLocation(latitude, longitude);
          if (!currentCityData) {
            this.onCitySelect('215854', 'Tel Aviv');
          }
        }, err => {
          this.onCitySelect('215854', 'Tel Aviv');
          this.utilsService.showSnackBar('An error occurred getting you current location, Tel Aviv will be displayed instead.', '', 3000);
        }, {enableHighAccuracy: true});
      }
    });
  }

  initForm(): void {
    this.searchFromGroup = new FormGroup({
      citySearch: new FormControl('')
    });
  }

  checkIfDarkMode(): void {
    let isDarkMode;
    this.isDarkMode$.subscribe(isDarkModeBol => {
      isDarkMode = isDarkModeBol;
    });
    const autoCompleteEl = document.querySelector('.mat-form-field-flex');
    if (isDarkMode) {
      autoCompleteEl.classList.add('dark-mode');
    } else {
      autoCompleteEl.classList.remove('dark-mode');
    }
  }

  getCityByCurrentLocation(lat: number, lon: number): void {
    this.utilsService.showLoader();
    let apiKey = '';
    let cityKey = '';
    let cityName = '';
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    this.dataService.getCityByCurrentLocationData(apiKey, lat, lon).subscribe(res => {
      cityKey = res.Key;
      cityName = res.LocalizedName;
      this.onCitySelect(cityKey, cityName);
    }, err => {
      this.utilsService.hideLoader();
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
    });
  }

  getCities(val: string): Observable<City[]> {
    let apiKey = '';
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    return this.dataService.getCitiesData(apiKey, val);
  }

  onCitySelect(cityKey: string, cityName: string): void {
    this.utilsService.showLoader();
    let apiKey = '';
    let isCelsius: boolean;
    this.apiKey$.subscribe(key => {
      apiKey = key;
    });
    this.isCelsius$.subscribe(bol => {
      isCelsius = bol;
    });
    this.dataService.getCurrentCityCondition(apiKey, cityKey).subscribe((res: CurrentCityData) => {
      const parsedRes = {
        ...res[0],
        Key: cityKey,
        LocalizedName: cityName,
        isFavorite: null
      };
      this.store.dispatch(WeatherInfoActions.setCurrentCityData({currentCityData: parsedRes}));
      this.store.dispatch(WeatherInfoActions.setCurrentCityName({currentCityName: cityName}));
    }, err => {
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
      this.utilsService.hideLoader();
    });
    this.dataService.getFutureForecast(apiKey, cityKey, isCelsius).subscribe((res) => {
        this.store.dispatch(WeatherInfoActions.setCurrentCityFutureForecast({futureForecast: res['DailyForecasts']}));
        this.utilsService.hideLoader();
    }, err => {
      this.utilsService.hideLoader();
      this.utilsService.showSnackBar('An error occurred, please try again later.', '', 3000);
    });
  }

  displayFn(cityObj): string {
    return cityObj ? cityObj.LocalizedName + ', ' + cityObj.Country.LocalizedName : '';
  }
}
