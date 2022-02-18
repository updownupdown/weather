import React from "react";
import {
  degToCompass,
  dtToDate,
  formatCityName,
  isObjectEmpty,
} from "../../utils/utils";
import { WindArrow } from "./WindArrow";
import { LocationResultsProps, OneCallAPIProps } from "./OpenWeatherMap";
import { Sunrise } from "../Icons/Sunrise";
import { Sunset } from "../Icons/Sunset";
import { Moonrise } from "../Icons/Moonrise";
import { Moonset } from "../Icons/Moonset";
import { WeatherIcon } from "../Icons/WeatherIcons";
import "./Current.scss";

interface Props {
  data: OneCallAPIProps;
  city?: LocationResultsProps;
}

export const Current = ({ data, city }: Props) => {
  if (
    city === undefined ||
    data === undefined ||
    data.current === undefined ||
    data.daily === undefined
  ) {
    return <div>Loading...</div>;
  }

  const currentData = data.current;
  const todayData = data.daily[0];

  return (
    <div className="current">
      <div className="current__description">
        <WeatherIcon code={currentData.weather[0].icon} />
      </div>

      <div className="current__temp">
        <span className="current__temp__description">
          {currentData.weather[0].description}
        </span>

        <div className="current__temp__temp">
          {currentData.temp.toFixed()}&deg;C
        </div>

        <div className="current__temp__feels-like">
          Feels like: {currentData.feels_like.toFixed()}&deg;C
        </div>
      </div>

      <div className="current__other">
        <div className="current__other__misc">
          <p>
            Min: {todayData.temp.min.toFixed()}&deg;C
            <br />
            Max: {todayData.temp.max.toFixed()}&deg;C
            <br />
            Clouds: {currentData.clouds}%
            <br />
            Humidity: {currentData.humidity.toFixed()}%
          </p>

          <WindArrow
            speed={currentData.wind_speed}
            deg={currentData.wind_deg}
            large
          />
        </div>
      </div>
    </div>
  );
};
