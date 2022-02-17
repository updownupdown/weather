import * as React from "react";

export function ArrowWind(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="#000000"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0607 22.0607C12.4749 22.6464 11.5251 22.6464 10.9393 22.0607L2.93934 14.0607C2.35355 13.4749 2.35355 12.5251 2.93934 11.9393C3.52513 11.3536 4.47487 11.3536 5.06066 11.9393L10.5 17.3787V3C10.5 2.17157 11.1716 1.5 12 1.5C12.8284 1.5 13.5 2.17157 13.5 3V17.3787L18.9393 11.9393C19.5251 11.3536 20.4749 11.3536 21.0607 11.9393C21.6464 12.5251 21.6464 13.4749 21.0607 14.0607L13.0607 22.0607Z"
      />
    </svg>
  );
}
