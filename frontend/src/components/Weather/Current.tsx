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
  const locationName = formatCityName(city);

  return (
    <div className="current">
      <div className="current__description">
        <WeatherIcon code={currentData.weather[0].icon} />

        <span className="description">
          {currentData.weather[0].description}
        </span>
        <span className="location">{locationName}</span>
      </div>

      <div className="current__temp">
        <div className="current__temp__temp">
          {currentData.temp.toFixed()}&deg;C
        </div>

        <div className="current__temp__feels-like">
          Feels like: {currentData.feels_like.toFixed()}&deg;C
        </div>

        <div className="current__temp__min-max">
          Min/max: {todayData.temp.min.toFixed()}&deg;C /{" "}
          {todayData.temp.max.toFixed()}&deg;C
        </div>
      </div>

      <div className="current__other">
        <div className="current__other__misc">
          <p>
            Cloud cover: {currentData.clouds}%
            <br />
            Humidity: {currentData.humidity.toFixed()}%
            <br />
            Wind: {currentData.wind_speed.toFixed()} km/h{" "}
            {degToCompass(currentData.wind_deg)}
          </p>

          <WindArrow
            speed={currentData.wind_speed}
            deg={currentData.wind_deg}
            large
          />
        </div>
      </div>

      <div className="current__times">
        <div className="rise-set rise-set--sun">
          <div>
            <Sunrise />
            <span>
              Sunrise
              <br />
              <b>{dtToDate(currentData.sunrise, "time-long")}</b>
            </span>
          </div>
          <div>
            <Sunset />
            <span>
              Sunset
              <br />
              <b>{dtToDate(currentData.sunset, "time-long")}</b>
            </span>
          </div>
        </div>

        <div className="rise-set rise-set--moon">
          <div>
            <Moonrise />
            <span>
              Moonrise
              <br />
              <b>{dtToDate(todayData.moonrise, "time-long")}</b>
            </span>
          </div>
          <div>
            <Moonset />
            <span>
              Moonset
              <br />
              <b>{dtToDate(todayData.moonset, "time-long")}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
