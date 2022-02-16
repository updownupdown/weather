import React from "react";

export interface WeatherProps {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyProps {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  snow: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  weather: WeatherProps[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface HourlyProps {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherProps[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface AlertProps {
  description: string;
  end: number;
  event: string;
  sender_name: string;
  start: number;
  tags: string[];
}

export interface CurrentProps {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherProps[];
  wind_deg: number;
  wind_speed: number;
}

export interface OneCallAPIProps {
  alerts?: AlertProps[];
  current?: CurrentProps;
  daily?: DailyProps[];
  hourly?: HourlyProps[];
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
}
