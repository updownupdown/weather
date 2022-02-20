import React from "react";
import clsx from "clsx";
import "./Box.scss";

interface BoxProps {
  children: React.ReactNode;
  layout?: string;
}
export const Box = ({ children, layout }: BoxProps) => {
  return (
    <div className={clsx("box", layout && "box--" + layout)}>{children}</div>
  );
};
