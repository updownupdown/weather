import React from "react";
import { Icon as Icon01d } from "./01d";
import { Icon as Icon02d } from "./02d";
import { Icon as Icon03d } from "./03d";
import { Icon as Icon04d } from "./04d";
import { Icon as Icon09d } from "./09d";
import { Icon as Icon10d } from "./10d";
import { Icon as Icon11d } from "./11d";
import { Icon as Icon13d } from "./13d";
import { Icon as Icon50d } from "./50d";
import { Icon as Icon01n } from "./01n";
import { Icon as Icon02n } from "./02n";
import { Icon as Icon03n } from "./03n";
import { Icon as Icon04n } from "./04n";
import { Icon as Icon09n } from "./09n";
import { Icon as Icon10n } from "./10n";
import { Icon as Icon11n } from "./11n";
import { Icon as Icon13n } from "./13n";
import { Icon as Icon50n } from "./50n";

const iconMap = [
  { code: "01d", icon: Icon01d },
  { code: "02d", icon: Icon02d },
  { code: "03d", icon: Icon03d },
  { code: "04d", icon: Icon04d },
  { code: "09d", icon: Icon09d },
  { code: "10d", icon: Icon10d },
  { code: "11d", icon: Icon11d },
  { code: "13d", icon: Icon13d },
  { code: "50d", icon: Icon50d },
  { code: "01n", icon: Icon01n },
  { code: "02n", icon: Icon02n },
  { code: "03n", icon: Icon03n },
  { code: "04n", icon: Icon04n },
  { code: "09n", icon: Icon09n },
  { code: "10n", icon: Icon10n },
  { code: "11n", icon: Icon11n },
  { code: "13n", icon: Icon13n },
  { code: "50n", icon: Icon50n },
];

interface Props {
  code: string;
}

export const WeatherIcon = ({ code }: Props) => {
  const icon = iconMap.find((el) => {
    return el.code === code;
  });

  return <div className="weather-icon">{icon && <icon.icon />}</div>;
};
