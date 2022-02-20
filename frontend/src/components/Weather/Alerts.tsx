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
            <div className="alert__header">
              <span className="alert__header__title">
                <Warning />
                {alert.event}
              </span>
              <span className="alert__header__sender-timing">
                {alert.sender_name}
                <br />
                {timing}
              </span>
            </div>
            <span className="alert__description">{alert.description}</span>
          </div>
        );
      })}
    </div>
  );
};
