import React from "react";
import {
  Area,
  Line,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import {
  dtToDate,
  formatAccumulationLabel,
  formatTempLabel,
  isObjectEmpty,
  rainToolipFormatter,
  temperatureToolipFormatter,
} from "../../utils/utils";
import { WindArrow } from "./WindArrow";
import { MoonPhase } from "../MoonPhase/MoonPhase";
import "./Daily.scss";
import { DailyProps, OneCallAPIProps } from "./OpenWeatherMap";
import { WeatherIcon } from "../Icons/WeatherIcons";

interface Props {
  data: OneCallAPIProps;
}

export const Daily = ({ data }: Props) => {
  if (data === undefined || isObjectEmpty(data) || data.daily === undefined) {
    return <div>Loading...</div>;
  }

  const dailyData = data.daily;

  const dailyGraphData = [];

  for (let i = 0; i < dailyData.length; i++) {
    const day = dailyData[i];

    dailyGraphData.push({
      day: dtToDate(day.dt, "day"),
      temperature: day.temp.day,
      minMax: [day.temp.min, day.temp.max],
      feels_like: day.feels_like.day,
      pop: day.pop,
      snow: day.snow ?? 0,
      rain: day.rain ?? 0,
    });
  }

  const titleBlocks = () => {
    return dailyData.map((day: DailyProps) => {
      return (
        <div key={day.dt} className="block">
          <span className="title">{dtToDate(day.dt, "day")}</span>
          <WeatherIcon code={day.weather[0].icon} />
        </div>
      );
    });
  };

  const windBlocks = () => {
    return dailyData.map((day: DailyProps) => {
      return (
        <div key={day.dt} className="block">
          <WindArrow speed={day.wind_speed} deg={day.wind_deg} />
        </div>
      );
    });
  };

  const moonBlocks = () => {
    return dailyData.map((day: DailyProps) => {
      return (
        <div key={day.dt} className="block">
          <MoonPhase phase={day.moon_phase} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="blocks blocks--title blocks--large">{titleBlocks()}</div>

      <div className="graph-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dailyGraphData} syncId="daily">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={temperatureToolipFormatter}
            />

            <XAxis hide dataKey="day" />

            <ReferenceLine y={0} stroke="var(--zero-line)" />
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

            <Area
              dataKey="minMax"
              name="Min/max"
              isAnimationActive={false}
              type="monotone"
              fill="rgba(var(--temperature-rgb), .2)"
              strokeWidth={0}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="graph-container graph-container--short">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dailyGraphData} barGap={-30} syncId="daily">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={rainToolipFormatter}
            />

            <XAxis hide dataKey="day" />

            <YAxis hide yAxisId={0} />
            <YAxis hide yAxisId={1} domain={[0, 1]} />

            <YAxis hide yAxisId={1} />
            <Area
              yAxisId={1}
              dataKey="pop"
              name="POP"
              type="monotone"
              fill="var(--pop)"
              strokeWidth={0}
              isAnimationActive={false}
            />

            <Area
              type="monotone"
              dataKey="rain"
              name="Rain"
              fill="var(--rain)"
              fillOpacity={0.2}
              strokeWidth={0}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="rain"
                position="top"
                offset={10}
                fill="var(--rain)"
                formatter={formatAccumulationLabel}
              />
            </Area>

            <Area
              type="monotone"
              dataKey="snow"
              name="Snow"
              fill="var(--snow)"
              fillOpacity={0.2}
              strokeWidth={0}
              isAnimationActive={false}
            >
              <LabelList
                fill="var(--snow)"
                dataKey="snow"
                position="top"
                offset={10}
                formatter={formatAccumulationLabel}
              />
            </Area>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="blocks blocks--large">{windBlocks()}</div>
      <div className="blocks blocks--large">{moonBlocks()}</div>
    </>
  );
};
