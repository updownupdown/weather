import React from "react";
import { WindArrow } from "../Weather/WindArrow";
import {
  LocationResultsProps,
  OneCallAPIProps,
} from "../../utils/OpenWeatherMap";
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
      <div className="current__condition">
        <WeatherIcon code={currentData.weather[0].icon} />

        <span className="description">
          {currentData.weather[0].description}
        </span>
      </div>

      <div className="current__temp">
        <div className="current__temp__left">
          <span className="temp-actual">
            <span className="temp-actual__number">
              {currentData.temp.toFixed()}
            </span>
            <span className="temp-actual__unit">&deg;C</span>
          </span>
          <span className="temp-feel">
            <span className="temp-feel__label">Feels:</span>
            <span className="temp-feel__temp">
              {currentData.feels_like.toFixed()}&deg;C
            </span>
          </span>
        </div>

        <div className="current__temp__right">
          <ul>
            <li>
              <span>Max:</span>
              <span>{todayData.temp.max.toFixed()}&deg;C</span>
            </li>
            <li>
              <span>Min:</span>
              <span>{todayData.temp.min.toFixed()}&deg;C</span>
            </li>
            <li>
              <span>Clouds:</span>
              <span>{currentData.clouds}%</span>
            </li>
            <li>
              <span>Humidity:</span>
              <span>{currentData.humidity.toFixed()}%</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="current__wind">
        <WindArrow
          speed={currentData.wind_speed}
          deg={currentData.wind_deg}
          large
        />
      </div>
    </div>
  );
};
