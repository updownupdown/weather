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
    <div className="box box--current">
      <div className="current">
        <div className="current__top">
          <WeatherIcon code={currentData.weather[0].icon} />

          <div className="current__top__temp">
            <span className="feels-like">
              Feels like: {currentData.feels_like.toFixed()}&deg;C
            </span>

            <span className="temp">{currentData.temp.toFixed()}&deg;C</span>

            <span className="description">
              {currentData.weather[0].description}
            </span>
          </div>

          <div className="current__top__wind">
            <WindArrow
              speed={currentData.wind_speed}
              deg={currentData.wind_deg}
              large
            />
          </div>
        </div>

        <div className="current__bottom">
          <ul className="current__other__misc">
            <li>
              <span>Min:</span>
              <span>{todayData.temp.min.toFixed()}&deg;C</span>
            </li>

            <li>
              <span>Max:</span>
              <span>{todayData.temp.max.toFixed()}&deg;C</span>
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
    </div>
  );
};
