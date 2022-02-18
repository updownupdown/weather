import React from "react";
import { dtToDate } from "../../utils/utils";
import { AlertProps } from "../../utils/OpenWeatherMap";
import { Warning } from "../Icons/Warning";
import "./Alerts.scss";

interface Props {
  alerts: AlertProps[];
  timezone: string | undefined;
}

export const Alerts = ({ alerts, timezone }: Props) => {
  return (
    <div className="alerts">
      {alerts.map((alert: AlertProps) => {
        const timing = `${dtToDate(
          alert.start,
          "alert",
          timezone
        )} to ${dtToDate(alert.end, "alert", timezone)}`;

        const tooltip =
          alert.sender_name + "\n" + timing + "\n" + alert.description;

        return (
          <div key={alert.event} className="alert" title={tooltip}>
            <Warning />
            <span className="alert__title">{alert.event}</span>
          </div>
        );
      })}
    </div>
  );
};
