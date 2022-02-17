import React, { useState } from "react";
import { dtToDate, isObjectEmpty } from "../../utils/utils";
import { AlertProps, OneCallAPIProps } from "./OpenWeatherMap";
import "./Alerts.scss";
import clsx from "clsx";

interface Props {
  data: OneCallAPIProps;
}

export const Alerts = ({ data }: Props) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  if (data === undefined || isObjectEmpty(data) || data.alerts === undefined) {
    return <div>Loading...</div>;
  }

  const alertData = data.alerts;

  return (
    <>
      {alertData.map((alert: AlertProps) => {
        return (
          <div key={alert.event} className="alert">
            <h3 className="alert__event">{alert.event} Warning</h3>
            <h5 className="alert__sender-timing">
              {alert.sender_name}
              <br />
              {dtToDate(alert.start, "alert")} to {dtToDate(alert.end, "alert")}
            </h5>
            <p
              className={clsx(
                "alert__description",
                isDescriptionOpen && "alert__description--expanded"
              )}
              onClick={() => {
                setIsDescriptionOpen(!isDescriptionOpen);
              }}
            >
              {alert.description}
            </p>
          </div>
        );
      })}
    </>
  );
};
