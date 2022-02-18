import React from "react";
import { formatCityName } from "../../utils/utils";
import { LocationResultsProps, OneCallAPIProps } from "./OpenWeatherMap";
import "./Location.scss";

interface Props {
  data: OneCallAPIProps;
  city?: LocationResultsProps;
}

export const Location = ({ data, city }: Props) => {
  if (city === undefined || data === undefined) {
    return <div>Loading...</div>;
  }

  const locationName = formatCityName(city);
  const timezone = data.timezone;

  let localTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="location">
      <span className="location__time">{localTime}</span>
      <span className="location__name">{locationName}</span>
    </div>
  );
};
