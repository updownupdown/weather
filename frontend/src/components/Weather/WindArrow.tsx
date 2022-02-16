import clsx from "clsx";
import React from "react";
import { mpsTokph } from "../../utils/utils";
import { ArrowWind } from "../Icons/ArrowWind";
import "./WindArrow.scss";

interface Props {
  deg: number;
  speed: number;
  gust?: number;
  large?: boolean;
}

export const WindArrow = ({ deg, speed, gust, large }: Props) => {
  const lowWinds = 0;
  const highWinds = 60;
  const scaleFactor = (mpsTokph(speed) - lowWinds) / highWinds;

  const min = 0.5;
  const max = 1.5;
  const clampedScaleFactor = Math.min(Math.max(scaleFactor, min), max);

  const tooltipText = () => {
    let text = speed.toFixed() + " km/h";

    if (gust) text += "\n" + gust.toFixed() + " km/h gusts";

    return text;
  };

  return (
    <div
      className={clsx("wind-arrow", large && "wind-arrow--large")}
      title={tooltipText()}
    >
      <ArrowWind
        style={{ transform: `rotate(${deg}deg) scale(${clampedScaleFactor})` }}
      />
      <span className="wind-arrow__label">{`${speed.toFixed()} km/h`}</span>
    </div>
  );
};
