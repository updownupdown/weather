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
  formatPOPLabel,
  formatTempLabel,
  isObjectEmpty,
  rainToolipFormatter,
  temperatureToolipFormatter,
} from "../../utils/utils";
import { WindArrow } from "../Weather/WindArrow";
import { MoonPhase } from "../MoonPhase/MoonPhase";
import { DailyProps, OneCallAPIProps } from "../../utils/OpenWeatherMap";
import { WeatherIcon } from "../Icons/WeatherIcons";
import "./Daily.scss";

interface Props {
  data: OneCallAPIProps;
}

export const Daily = ({ data }: Props) => {
  if (
    data === undefined ||
    data.timezone === undefined ||
    isObjectEmpty(data) ||
    data.daily === undefined
  ) {
    return <div>Loading...</div>;
  }

  const dailyData = data.daily;
  const timezone = data.timezone;

  const dailyGraphData = [];

  for (let i = 0; i < dailyData.length; i++) {
    const day = dailyData[i];

    dailyGraphData.push({
      day: dtToDate(day.dt, "day", timezone),
      temperature: day.temp.day,
      maxMin: [day.temp.max, day.temp.min],
      feels_like: day.feels_like.day,
      pop: day.pop,
      snow: day.snow ?? 0,
      rain: day.rain ?? 0,
      humidity: day.humidity,
    });
  }

  const titleBlocks = () => {
    return dailyData.map((day: DailyProps) => {
      return (
        <div key={day.dt} className="block">
          <span className="title">{dtToDate(day.dt, "day", timezone)}</span>
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
    <div className="daily">
      <div className="blocks blocks--title blocks--large">{titleBlocks()}</div>

      <div className="graph-container graph-container--daily-temp">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={dailyGraphData} syncId="daily">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={temperatureToolipFormatter}
            />

            <XAxis hide dataKey="day" />

            <ReferenceLine
              y={0}
              stroke="var(--zero-line)"
              strokeDasharray="2 2"
            />

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
                fill="var(--K800)"
                formatter={formatTempLabel}
              />
            </Line>

            <Area
              dataKey="maxMin"
              name="Max/min"
              isAnimationActive={false}
              type="monotone"
              fill="var(--temperature)"
              fillOpacity={0.08}
              stroke="var(--temperature)"
              strokeWidth={0}
            />

            <Line
              dataKey="feels_like"
              name="Feels like"
              type="monotone"
              stroke="var(--feels-like)"
              isAnimationActive={false}
              dot={false}
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
            <YAxis hide yAxisId={2} domain={[0, 100]} />

            <YAxis hide yAxisId={1} />
            <Area
              yAxisId={1}
              dataKey="pop"
              name="POP"
              type="monotone"
              fill="var(--pop)"
              fillOpacity={0.1}
              stroke="var(--pop)"
              strokeWidth={0}
              isAnimationActive={false}
            />

            <Line
              yAxisId={2}
              dataKey="humidity"
              name="Humidity"
              type="monotone"
              stroke="var(--humidity)"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
              isAnimationActive={false}
              dot={false}
            />

            <Area
              type="monotone"
              dataKey="rain"
              name="Rain"
              fill="var(--icon-rain)"
              fillOpacity={0.2}
              stroke="var(--icon-rain)"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="rain"
                position="top"
                offset={10}
                fill="var(--icon-rain)"
                formatter={formatAccumulationLabel}
              />
            </Area>

            <Area
              type="monotone"
              dataKey="snow"
              name="Snow"
              fill="var(--icon-snow)"
              fillOpacity={0.2}
              stroke="var(--icon-snow)"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <LabelList
                fill="var(--icon-snow)"
                dataKey="snow"
                position="top"
                offset={10}
                formatter={formatAccumulationLabel}
              />
            </Area>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="blocks blocks--large blocks--wind">{windBlocks()}</div>
      <div className="blocks blocks--large blocks--moon">{moonBlocks()}</div>
    </div>
  );
};
