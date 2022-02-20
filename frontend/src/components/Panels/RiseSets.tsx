import React from "react";
import { OneCallAPIProps } from "../../utils/OpenWeatherMap";
import { dtToDate } from "../../utils/utils";
import { Moon } from "../Icons/Moon";
import { Sun } from "../Icons/Sun";
import "./RiseSets.scss";

interface Props {
  data: OneCallAPIProps;
}
export const RiseSets = ({ data }: Props) => {
  if (data.daily === undefined || data.hourly === undefined) return <></>;

  const firstInterval = data.hourly[0].dt;
  const lastInterval = data.hourly[data.hourly.length - 1].dt;
  const intervalDelta = lastInterval - firstInterval;

  function generateSet(start: number, end: number, sun: boolean) {
    const positionStart = ((start - firstInterval) / intervalDelta) * 100;
    const positionEnd = ((end - firstInterval) / intervalDelta) * 100;
    const width = positionEnd - positionStart;

    return (
      <div
        className={`rise-set rise-set--${sun ? "sun" : "moon"}`}
        style={{
          left: `${positionStart}%`,
          width: `${width}%`,
        }}
      >
        <span>{dtToDate(start, "time-long", data.timezone)}</span>
        {sun ? <Sun /> : <Moon />}
        <span>{dtToDate(end, "time-long", data.timezone)}</span>
      </div>
    );
  }

  function generateNighttime(start: number, end: number) {
    const positionStart = ((start - firstInterval) / intervalDelta) * 100;
    const positionEnd = ((end - firstInterval) / intervalDelta) * 100;
    const width = positionEnd - positionStart;

    return (
      <div
        className={`rise-set rise-set--night`}
        style={{
          left: `${positionStart}%`,
          width: `${width}%`,
        }}
      />
    );
  }

  const generateCycle = (type: "sun" | "moon") => {
    if (data.daily === undefined) return;

    let cycles: any = [];

    data.daily.forEach((day) => {
      cycles.push(type === "sun" ? day.sunrise : day.moonrise);
      cycles.push(type === "sun" ? day.sunset : day.moonset);
    });

    cycles = cycles.sort();
    cycles = cycles.filter((dt: number) => dt !== 0);

    if (
      (type === "sun" && data.daily[0].moonset < data.daily[0].moonrise) ||
      (type === "moon" && data.daily[0].sunset < data.daily[0].sunrise)
    ) {
      cycles.shift();
    }

    let cyclePairs: any = [];

    for (let i = 0; i < cycles.length / 2; i = i + 2) {
      cyclePairs.push({
        start: cycles[i],
        end: cycles[i + 1],
      });
    }

    return cyclePairs.map((pair: any) => {
      return (
        <React.Fragment key={pair.start}>
          {type === "sun"
            ? generateNighttime(pair.start, pair.end)
            : generateSet(pair.start, pair.end, false)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {data.daily.map((day) => {
        return (
          <React.Fragment key={day.dt}>
            {generateSet(day.sunrise, day.sunset, true)}
          </React.Fragment>
        );
      })}

      {generateCycle("sun")}
      {generateCycle("moon")}
    </>
  );
};
