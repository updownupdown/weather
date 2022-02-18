import React from "react";
import { LocationResultsProps } from "../components/Weather/OpenWeatherMap";

export function isObjectEmpty(empty: any) {
  return Object.keys(empty).length === 0 && empty.constructor === Object;
}

export function formatTempLabel(temp: number) {
  return `${temp.toFixed()}°`;
}

export function formatPOPLabel(pop: number) {
  const popPercentage = pop * 100;

  return popPercentage < 1 ? "" : popPercentage.toFixed() + "%";
}

export function formatAccumulationLabel(accumulation: number) {
  return accumulation < 1 ? "" : accumulation.toFixed() + " mm";
}

export function temperatureToolipFormatter(
  value: string,
  name: string,
  props: any
) {
  let formattedValue = "";

  if (typeof props.value === "object") {
    let formattedArray: string[] = [];
    formattedValue = props.value.map((val: number) => {
      formattedArray.push(val.toFixed());
      return;
    });
    return formattedArray.join("/") + "°C";
  } else {
    formattedValue = formatTempLabel(props.value) + "C";
  }

  return [formattedValue, name];
}

export function rainToolipFormatter(value: string, name: string, props: any) {
  const units =
    props.dataKey === "snow" || props.dataKey === "rain" ? " mm" : "%";

  const formattedValue =
    props.dataKey === "pop" ? props.value * 100 : props.value;
  return [Math.round(formattedValue) + units, name];
}

export function dtToDate(
  dt: number,
  format: "day" | "alert" | "time-short" | "time-long",
  timezone?: string
) {
  const date = new Date(dt * 1000);
  let options: any = {};

  if (timezone !== undefined) {
    options.timeZone = timezone;
  }

  if (format === "day") {
    options.weekday = "short";
  } else if (format === "alert") {
    options.weekday = "long";
    options.hour = "numeric";
  } else if (format === "time-short") {
    options.hour = "numeric";
  } else if (format === "time-long") {
    options.timeStyle = "short";
  }

  const dateTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return dateTime;
}

export function mpsTokph(number: number) {
  return number * 3.6;
}

export function degToCompass(angle: number) {
  const val = Math.floor(angle / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

export function formatCityName(city: LocationResultsProps) {
  return `${city.name}, ${city.state && city.state + ", "}${city.country}`;
}
