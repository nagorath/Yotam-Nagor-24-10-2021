import { createAction , props } from '@ngrx/store';
import { CurrentCityData , FutureForecast } from '../classes/weather-info.classes';

export const setCurrentCityName = createAction(
  'SET_CURRENT_CITY_NAME',
  props<{currentCityName: string}>()
);

export const setCurrentCityData = createAction(
  'SET_CURRENT_CITY_DATA',
  props<{currentCityData: CurrentCityData}>()
);

export const setCurrentCityFutureForecast = createAction(
  'SET_CURRENT_CITY_FUTURE_FORECAST',
  props<{futureForecast: FutureForecast[]}>()
);

export const toggleIsCelsius = createAction(
  'TOGGLE_IS_CELSIUS',
  props<{isCelsius: boolean}>()
);
