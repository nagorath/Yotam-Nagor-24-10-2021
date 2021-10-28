import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as WeatherInfoActions from './weather-info.actions';
import {CurrentCityData, FutureForecast} from '../classes/weather-info.classes';

export interface WeatherState {
  weatherInfo: WeatherInfoState;
}

export interface WeatherInfoState {
  accuWeatherApiKey: string;
  currentCityData: CurrentCityData;
  currentCityName: string;
  futureForecast: FutureForecast[];
  isCelsius: boolean;
}

const InitialState: WeatherInfoState = {
  accuWeatherApiKey: '8pDGSFuDVpHnYQsqqPCdp9M33iTQVOZA\n',
  currentCityData: null,
  currentCityName: '',
  futureForecast: null,
  isCelsius: true
};

const getWeatherInfoState = createFeatureSelector<WeatherInfoState>('weatherInfo');

export const getAccuWeatherApiKey = createSelector(
  getWeatherInfoState,
  state => state.accuWeatherApiKey
);

export const getCurrentCityName = createSelector(
  getWeatherInfoState,
  state => state.currentCityName
);

export const getCurrentCityData = createSelector(
  getWeatherInfoState,
  state => state.currentCityData
);

export const getFutureForecast = createSelector(
  getWeatherInfoState,
  state => state.futureForecast
);

export const getIsCelsius = createSelector(
  getWeatherInfoState,
  state => state.isCelsius
);

export const weatherInfoReducer = createReducer<WeatherInfoState>(
  InitialState,
  on(WeatherInfoActions.setCurrentCityData, (state, action): WeatherInfoState => {
    return {
      ...state,
      currentCityData: action.currentCityData
    };
  }),
  on(WeatherInfoActions.setCurrentCityName, (state, action): WeatherInfoState => {
    return {
      ...state,
      currentCityName: action.currentCityName
    };
  }),
  on(WeatherInfoActions.setCurrentCityFutureForecast, (state, action): WeatherInfoState => {
    return {
      ...state,
      futureForecast: action.futureForecast
    };
  }),
  on(WeatherInfoActions.toggleIsCelsius, (state, action): WeatherInfoState => {
    return {
      ...state,
      isCelsius: action.isCelsius
    };
  })
);
