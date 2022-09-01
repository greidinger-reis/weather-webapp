export interface CityMinMax {
  name: string;
  temp_max: number;
  temp_min: number;
}

export interface CityDetailedWeather {
  current: CityMinMax & {
    temp_now: number;
    country: string;
    feels_like: number;
    wind: number;
    humidity: number;
    description: string;
  };
  forecast: {
    weekDaysForecast: {
      date: Date;
      min: number;
      max: number;
    }[];
  };
}

export interface currentWeatherData {
  temp: number;
  temp_max: number;
  temp_min: number;
  feels_like: number;
  humidity: number;
}
