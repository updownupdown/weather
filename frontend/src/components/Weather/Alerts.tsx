import React, { useState } from "react";
import { dtToDate } from "../../utils/utils";
import { AlertProps } from "../../utils/OpenWeatherMap";
import { Warning } from "../Icons/Warning";
import "./Alerts.scss";
import clsx from "clsx";

interface Props {
  alerts: AlertProps[];
  timezone: string | undefined;
}

export const Alerts = ({ alerts, timezone }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="alerts">
      {alerts.map((alert: AlertProps) => {
        const timing = `${dtToDate(
          alert.start,
          "alert",
          timezone
        )} to ${dtToDate(alert.end, "alert", timezone)}`;

        return (
          <div
            key={alert.event}
            className={clsx(
              "alert",
              isExpanded ? "alert--expanded" : "alert--not-expanded"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Warning />
            <span className="alert__title">{alert.event}</span>
            <span className="alert__description alert__description--truncated">
              {alert.description}
            </span>
            <span className="alert__description alert__description--full">
              {alert.description}
            </span>
            <span className="alert__sender-timing">
              {alert.sender_name}
              <br />
              {timing}
            </span>
          </div>
        );
      })}
    </div>
  );
};
