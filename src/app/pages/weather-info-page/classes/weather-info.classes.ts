export const iconsArray = [
  {
    name: 'day',
    iconNums: [1]
  },
  {
    name: 'night',
    iconNums: [33]
  },
  {
    name: 'cloudy-night',
    iconNums: [34, 35, 36, 37, 38]
  },
  {
    name: 'cloudy-day',
    iconNums: [2, 3, 4, 5, 6, 19, 20, 21]
  },
  {
    name: 'cloudy',
    iconNums: [7, 8, 11, 32]
  },
  {
    name: 'rainy-day',
    iconNums: [13, 14]
  },
  {
    name: 'rainy',
    iconNums: [12, 18, 25, 26, 39, 40, 43]
  },
  {
    name: 'thunder',
    iconNums: [15, 16, 17, 41, 42]
  },
  {
    name: 'snowy',
    iconNums: [22, 23, 24, 44, 29]
  },
];

export interface City {
  AdministrativeArea: {ID: string, LocalizedName: string};
  Country: {ID: string, LocalizedName: string};
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
}

export interface CurrentCityData {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: any;
  IsDayTime: boolean;
  Key: string;
  LocalizedName: string;
  isFavorite: boolean;
  Temperature: {
    Metric: {
      Value: number,
      Unit: string;
      UnitType: number;
    },
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number
    }
  };
  MobileLink: string;
  Link: string;
}

export interface FutureForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    },
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    }
  };
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
  };
  Sources: string[];
  MobileLink: string;
  Link: string;
}

