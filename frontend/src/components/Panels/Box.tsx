import React from "react";
import clsx from "clsx";
import "./Box.scss";

interface BoxProps {
  children: React.ReactNode;
  layout?: string;
  allowOverflow?: boolean;
}
export const Box = ({ children, layout, allowOverflow }: BoxProps) => {
  return (
    <div
      className={clsx(
        "box",
        layout && "box--" + layout,
        allowOverflow && "box--allow-overflow"
      )}
    >
      {children}
    </div>
  );
};
