import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { City , CurrentCityData , FutureForecast } from '../../pages/weather-info-page/classes/weather-info.classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getCitiesData(apiKey: string, filterValue: string): Observable<City[]> {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${filterValue}`;
    return this.http.get<any>(url);
  }

  getCityByCurrentLocationData(apiKey: string, lat: number, lon: number): Observable<any> {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    return this.http.get<any>(url);
  }

  getCurrentCityCondition(apiKey: string, cityId: string): Observable<CurrentCityData> {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityId}?apikey=${apiKey}`;
    return this.http.get<any>(url);
  }

  getFutureForecast(apiKey: string, cityId: string, isCelsius: boolean): Observable<FutureForecast[]> {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${apiKey}&metric=${isCelsius}`;
    return this.http.get<any>(url);
  }
}
