import React, { useEffect, useState } from "react";
import {
  LocationResultsProps,
  OneCallAPIProps,
} from "../../utils/OpenWeatherMap";
import "./Location.scss";

interface Props {
  data: OneCallAPIProps;
  city?: LocationResultsProps;
}

export const Location = ({ data, city }: Props) => {
  const locationName = () => {
    if (city === undefined) {
      return <span className="city">(No location)</span>;
    } else {
      return (
        <>
          <span className="city">{city.name}</span>
          <span className="state-country">
            {city.state && <span className="state">{city.state}, </span>}
            <span className="country">{city.country}</span>
          </span>
        </>
      );
    }
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const locationTime = () => {
    const timezone = data === undefined ? undefined : data.timezone;

    const currentTime = time.toLocaleString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
    });

    const timeParts = currentTime.split(" ");

    const currentDay = time.toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    return (
      <>
        <div className="time">
          <span className="time__numbers">{timeParts[0]}</span>
          <span className="time__period">{timeParts[1]}</span>
        </div>
        <span className="date">{currentDay}</span>
      </>
    );
  };

  return (
    <div className="location__info">
      <span className="location__info__name">{locationName()}</span>
      <span className="location__info__time">{locationTime()}</span>
    </div>
  );
};
