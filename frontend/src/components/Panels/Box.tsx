import React from "react";
import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import "./Box.scss";

interface BoxProps {
  children: React.ReactNode;
  layout?: string;
  allowOverflow?: boolean;
  isLoading?: boolean;
}
export const Box = ({
  children,
  layout,
  allowOverflow,
  isLoading,
}: BoxProps) => {
  return (
    <div
      className={clsx(
        "box",
        layout && "box--" + layout,
        allowOverflow && "box--allow-overflow"
      )}
    >
      <div
        className={clsx(
          "box__loading",
          isLoading ? "box__loading--show" : "box__loading--hide"
        )}
      >
        <Spinner />
      </div>

      {children}
    </div>
  );
};
