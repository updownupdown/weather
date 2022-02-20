import React from "react";
import { mpsTokph } from "../../utils/utils";
import { ArrowWind } from "../Icons/ArrowWind";
import clsx from "clsx";
import "./WindArrow.scss";

interface Props {
  deg: number;
  speed: number;
  gust?: number;
  large?: boolean;
}

export const WindArrow = ({ deg, speed, gust, large }: Props) => {
  const lowWinds = 0;
  const highWinds = 40;
  const speedInKmh = mpsTokph(speed);
  const gustInKmh = gust ? mpsTokph(gust) : undefined;
  const scaleFactor = (speedInKmh - lowWinds) / highWinds;

  const min = 0.5;
  const max = 1.5;
  const clampedScaleFactor = Math.min(Math.max(scaleFactor, min), max);

  const tooltipText = () => {
    let text = speedInKmh.toFixed() + " km/h";

    if (gustInKmh) text += "\n" + gustInKmh.toFixed() + " km/h gusts";

    return text;
  };

  return (
    <div
      className={clsx("wind-arrow", large && "wind-arrow--large")}
      title={tooltipText()}
    >
      <ArrowWind
        style={{
          transform: `rotate(${deg}deg) scale(${clampedScaleFactor})`,
        }}
      />
      <span className="wind-arrow__text">
        <span className="wind-arrow__text__number">{speedInKmh.toFixed()}</span>
        <span className="wind-arrow__text__unit">km/h</span>
      </span>
    </div>
  );
};
