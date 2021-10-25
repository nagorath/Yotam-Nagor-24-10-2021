import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {City} from '../pages/weather-info-page/classes/weather-info.classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  opts = [];
  constructor(private http: HttpClient) { }
  getCitiesData(apiKey: string, filterValue: string): Observable<City[]> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${filterValue}`;
    return this.http.get<any>(url).pipe(tap(data => data));
  }

  getCurrentCityCondition(apiKey: string, cityId: string): Observable<any> {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${apiKey}`;
    return this.http.get<any>(url).pipe(tap(data => data));
  }

  getFutureForecast(apiKey: string, cityId: string, isCelsius: boolean): Observable<any> {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${apiKey}&metric=${isCelsius}`;
    return this.http.get<any>(url).pipe(tap(data => data));
  }
}
