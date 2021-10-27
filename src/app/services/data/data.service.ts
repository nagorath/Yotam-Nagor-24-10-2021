import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {City, CurrentCityData, FutureForecast} from '../../pages/weather-info-page/classes/weather-info.classes';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  opts = [];
  constructor(private http: HttpClient) { }
  getCitiesData(apiKey: string, filterValue: string): Observable<City[]> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${filterValue}`;
    return this.http.get<any>(url);
  }

  getCityByCurrentLocationData(apiKey: string, lat: number, lon: number): Observable<any> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    return this.http.get<any>(url);
  }

  getCurrentCityCondition(apiKey: string, cityId: string): Observable<CurrentCityData> {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${apiKey}`;
    return this.http.get<any>(url);
  }

  getFutureForecast(apiKey: string, cityId: string, isCelsius: boolean): Observable<FutureForecast[]> {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${apiKey}&metric=${isCelsius}`;
    return this.http.get<any>(url);
  }
}
