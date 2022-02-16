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
        d="M13.0607 1.93934C12.4749 1.35355 11.5251 1.35355 10.9393 1.93934L2.93934 9.93934C2.35355 10.5251 2.35355 11.4749 2.93934 12.0607C3.52513 12.6464 4.47487 12.6464 5.06066 12.0607L10.5 6.62132V21C10.5 21.8284 11.1716 22.5 12 22.5C12.8284 22.5 13.5 21.8284 13.5 21V6.62132L18.9393 12.0607C19.5251 12.6464 20.4749 12.6464 21.0607 12.0607C21.6464 11.4749 21.6464 10.5251 21.0607 9.93934L13.0607 1.93934Z"
      />
    </svg>
  );
}
