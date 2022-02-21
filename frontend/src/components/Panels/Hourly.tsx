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
import { RiseSets } from "./RiseSets";
import "./Hourly.scss";

interface Props {
  data: OneCallAPIProps | undefined;
}

export const Hourly = ({ data }: Props) => {
  if (
    data === undefined ||
    isObjectEmpty(data) ||
    data.hourly === undefined ||
    data.daily === undefined
  ) {
    return <div>Loading...</div>;
  }

  const timezone = data.timezone;
  const hourlyData = data.hourly;
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

  const titleBlocks = () => {
    return hourlyData.map((hour: HourlyProps) => {
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
    return hourlyData.map((hour: HourlyProps) => {
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
    <div className="hourly">
      <div className="rises-sets-wrap">
        <div className="rises-sets">
          <RiseSets data={data} />
        </div>
      </div>

      <div className="blocks blocks--small">{titleBlocks()}</div>

      <div className="graph-container graph-container--hourly-temp">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hourlyGraphData} syncId="hourly">
            <Tooltip
              separator=": "
              isAnimationActive={false}
              formatter={temperatureToolipFormatter}
            />

            <ReferenceLine
              y={0}
              stroke="var(--zero-line)"
              strokeDasharray="2 2"
            />

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
                fill="var(--K800)"
                formatter={formatTempLabel}
              />
            </Line>

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
              stroke="var(--humidity)"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
              isAnimationActive={false}
              dot={false}
            />

            <Area
              yAxisId={0}
              dataKey="pop"
              name="POP"
              type="monotone"
              fill="var(--pop)"
              fillOpacity={0.1}
              stroke="var(--pop)"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="pop"
                position="top"
                offset={10}
                fill="var(--pop)"
                formatter={formatPOPLabel}
              />
            </Area>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="blocks blocks--small blocks--wind">{windBlocks()}</div>
    </div>
  );
};
