import React from "react";
import {
  Area,
  Line,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
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
import { HourlyProps, OneCallAPIProps } from "./OpenWeatherMap";
import { WindArrow } from "./WindArrow";
import { WeatherIcon } from "../Icons/WeatherIcons";
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
    data.daily.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const hourlyData = data.hourly;

  const hourlyGraphData = [];

  for (let i = 0; i < hourlyData.length; i++) {
    const hour = hourlyData[i];

    hourlyGraphData.push({
      hour: dtToDate(hour.dt, "time-short"),
      temperature: hour.temp,
      feels_like: hour.feels_like,
      pop: hour.pop,
      humidity: hour.humidity,
    });
  }

  const dayNightIntervals = () => {
    if (data.hourly === undefined || !data.hourly.length) return;
    const now = data.hourly[0].dt;

    const firstInterval = data.hourly[0].dt;
    const lastInterval = data.hourly[data.hourly.length - 1].dt;
    const intervalDelta = lastInterval - firstInterval;

    function generateInterval(dt: number, prevDt: number, isDay: boolean) {
      if (dt < now || dt > lastInterval) return;

      const intervalWidth = ((dt - prevDt) / intervalDelta) * 100;
      const intervalType = isDay ? "night" : "day";

      return (
        <div
          key={dt}
          className={`interval interval--${intervalType}`}
          style={{ width: `${intervalWidth}%` }}
        />
      );
    }

    const intervalBlocks = data.daily!.map((day, index) => {
      if (index === 0 || day.dt < now || day.dt > lastInterval) {
        return <React.Fragment key={index}></React.Fragment>;
      }

      const dayInterval = generateInterval(
        data.daily![index].sunrise,
        data.daily![index - 1].sunset,
        true
      );
      const nightInterval = generateInterval(
        data.daily![index].sunset,
        data.daily![index].sunrise,
        false
      );

      return (
        <React.Fragment key={index}>
          {dayInterval}
          {nightInterval}
        </React.Fragment>
      );
    });

    return <div className="intervals">{intervalBlocks}</div>;
  };

  const titleBlocks = () => {
    return hourlyData.map((hour: HourlyProps, index: number) => {
      return (
        <div key={hour.dt} className="block block--limit-num">
          <span className="title">{dtToDate(hour.dt, "time-short")}</span>
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
    <>
      {dayNightIntervals()}

      <div className="blocks blocks--small">{titleBlocks()}</div>

      <div className="graph-container graph-container--hourly-temp">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hourlyGraphData} syncId="hourly">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={temperatureToolipFormatter}
            />

            <CartesianGrid stroke="var(--graph-line)" vertical={false} />

            <ReferenceLine y={0} stroke="var(--zero-line)" />

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
    </>
  );
};
