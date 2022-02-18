import React from "react";
import {
  Area,
  Line,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  dtToDate,
  formatTempLabel,
  temperatureToolipFormatter,
  rainToolipFormatter,
  formatPOPLabel,
  isObjectEmpty,
} from "../../utils/utils";
import { HourlyProps, OneCallAPIProps } from "../../utils/OpenWeatherMap";
import { WindArrow } from "../Weather/WindArrow";
import { WeatherIcon } from "../Icons/WeatherIcons";
import { Moon } from "../Icons/Moon";
import { Sun } from "../Icons/Sun";
import "./Hourly.scss";

interface Props {
  data: OneCallAPIProps | undefined;
}

export const Hourly = ({ data }: Props) => {
  if (
    data === undefined ||
    isObjectEmpty(data) ||
    data.hourly === undefined ||
    data.daily === undefined ||
    data.timezone === undefined ||
    data.timezone_offset === undefined ||
    data.daily.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const hourlyData = data.hourly;

  const timezone = data.timezone;

  const hourlyGraphData = [];

  for (let i = 0; i < hourlyData.length; i++) {
    const hour = hourlyData[i];

    hourlyGraphData.push({
      hour: dtToDate(hour.dt, "time-short", timezone),
      temperature: hour.temp,
      feels_like: hour.feels_like,
      pop: hour.pop,
      humidity: hour.humidity,
    });
  }

  const risesAndSets = () => {
    if (data.daily === undefined || data.hourly === undefined) return;

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
          <span>{dtToDate(start, "time-long", timezone)}</span>
          {sun ? <Sun /> : <Moon />}
          <span>{dtToDate(end, "time-long", timezone)}</span>
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

    const moonCycles = () => {
      if (data.daily === undefined) return;

      let cycles: any = [];

      data.daily.forEach((day) => {
        cycles.push(day.moonrise);
        cycles.push(day.moonset);
      });

      cycles = cycles.sort();
      cycles = cycles.filter((dt: number) => dt !== 0);

      if (data.daily[0].moonset < data.daily[0].moonrise) {
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
            {generateSet(pair.start, pair.end, false)}
          </React.Fragment>
        );
      });
    };

    const nightCycles = () => {
      if (data.daily === undefined) return;

      let cycles: any = [];

      data.daily.forEach((day) => {
        cycles.push(day.sunrise);
        cycles.push(day.sunset);
      });

      cycles = cycles.sort();
      cycles = cycles.filter((dt: number) => dt !== 0);

      if (data.daily[0].sunrise < data.daily[0].sunset) {
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
            {generateNighttime(pair.start, pair.end)}
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

        {moonCycles()}
        {nightCycles()}
      </>
    );
  };

  // const dayNightIntervals = () => {
  //   if (data.hourly === undefined || !data.hourly.length) return;

  //   return data.hourly.map((hour) => {
  //     const description = hour.weather[0].icon;
  //     const isDay = hour.weather[0].icon.includes("d");

  //     return (
  //       <div
  //         key={hour.dt}
  //         className={`interval interval--desc-${description} interval--time-${
  //           isDay ? "day" : "night"
  //         }`}
  //       />
  //     );
  //   });
  // };

  const titleBlocks = () => {
    return hourlyData.map((hour: HourlyProps, index: number) => {
      return (
        <div key={hour.dt} className="block block--limit-num">
          <span className="title">
            {dtToDate(hour.dt, "time-short", timezone)}
          </span>
          <WeatherIcon code={hour.weather[0].icon} />
        </div>
      );
    });
  };

  const windBlocks = () => {
    return hourlyData.map((hour: HourlyProps, index: number) => {
      return (
        <div key={hour.dt} className="block block--limit-num">
          <WindArrow
            speed={hour.wind_speed}
            deg={hour.wind_deg}
            gust={hour.wind_gust}
          />
        </div>
      );
    });
  };

  return (
    <div className="box box--hourly">
      <div className="rises-sets-wrap">
        <div className="rises-sets">{risesAndSets()}</div>
      </div>

      {/* <div className="intervals-wrap">
        <div className="intervals">{dayNightIntervals()}</div>
      </div> */}

      <div className="blocks blocks--small">{titleBlocks()}</div>

      <div className="graph-container graph-container--hourly-temp">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hourlyGraphData} syncId="hourly">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={temperatureToolipFormatter}
            />

            {/* <CartesianGrid stroke="var(--graph-line)" vertical={false} /> */}

            <ReferenceLine y={0} stroke="var(--zero-line)" strokeWidth={2} />

            <XAxis hide dataKey="hour" />

            <Line
              dataKey="temperature"
              name="Temperature"
              type="monotone"
              stroke="var(--temperature)"
              strokeWidth={3}
              isAnimationActive={false}
              dot={false}
            >
              <LabelList
                dataKey="temperature"
                position="top"
                offset={15}
                formatter={formatTempLabel}
              />
            </Line>

            <Line
              dataKey="feels_like"
              name="Feels like"
              type="monotone"
              stroke="var(--feels-like)"
              strokeWidth={2}
              isAnimationActive={false}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="graph-container graph-container--hourly-rain graph-container--short">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hourlyGraphData} syncId="hourly">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={rainToolipFormatter}
            />

            <XAxis hide dataKey="hour" />
            <YAxis hide yAxisId={0} type="number" domain={[0, 1]} />
            <YAxis hide yAxisId={1} />

            <Line
              yAxisId={1}
              dataKey="humidity"
              name="Humidity"
              type="monotone"
              stroke="var(--K400)"
              strokeWidth={1}
              strokeDasharray="4 4"
              isAnimationActive={false}
              dot={false}
            />

            <Area
              yAxisId={0}
              dataKey="pop"
              name="POP"
              type="monotone"
              fill="#109BF8"
              strokeWidth={0}
              fillOpacity={0.08}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="pop"
                position="top"
                offset={10}
                // fill="var(--pop)"
                formatter={formatPOPLabel}
              />
            </Area>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="blocks blocks--small">{windBlocks()}</div>
    </div>
  );
};
