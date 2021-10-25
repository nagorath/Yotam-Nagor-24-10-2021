import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as WeatherInfoActions from './weather-info.actions';
import {CurrentCityData, FutureForecast} from '../classes/weather-info.classes';

export interface State {
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
  accuWeatherApiKey: 'YKGOoUemZrJrt95lcZ1yFu4rGgwsJzBA',
  currentCityData: null,
  currentCityName: '',
  futureForecast: [
    {
      Date: '2021-10-25T07:00:00+03:30',
      EpochDate: 1635132600,
      Temperature: {
        Minimum: {
          Value: 50,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 68,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us'
    },
    {
      Date: '2021-10-25T07:00:00+03:30',
      EpochDate: 1635132600,
      Temperature: {
        Minimum: {
          Value: 50,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 68,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us'
    },
    {
      Date: '2021-10-25T07:00:00+03:30',
      EpochDate: 1635132600,
      Temperature: {
        Minimum: {
          Value: 50,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 68,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us'
    },
    {
      Date: '2021-10-25T07:00:00+03:30',
      EpochDate: 1635132600,
      Temperature: {
        Minimum: {
          Value: 50,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 68,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us'
    },
    {
      Date: '2021-10-25T07:00:00+03:30',
      EpochDate: 1635132600,
      Temperature: {
        Minimum: {
          Value: 50,
          Unit: 'F',
          UnitType: 18
        },
        Maximum: {
          Value: 68,
          Unit: 'F',
          UnitType: 18
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: 'Sunny',
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: 'Clear',
        HasPrecipitation: false
      },
      Sources: [
        'AccuWeather'
      ],
      MobileLink: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us',
      Link: 'http://www.accuweather.com/en/ir/tehran/210841/daily-weather-forecast/210841?day=1&lang=en-us'
    },
  ],
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
  on(WeatherInfoActions.toggleIsCelsius, (state): WeatherInfoState => {
    return {
      ...state,
      isCelsius: !state.isCelsius
    };
  })
);
