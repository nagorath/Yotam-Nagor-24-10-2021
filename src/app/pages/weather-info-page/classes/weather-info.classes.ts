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

