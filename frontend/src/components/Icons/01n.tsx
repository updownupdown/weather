import * as React from "react";

export function Icon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M18.9375 13.1625C14.625 13.1625 9.86245 9.74998 12.0375 4.19998C7.38745 4.16248 4.19995 7.94998 4.19995 12C4.19995 16.3125 7.68745 19.8375 12.0375 19.8375C15.975 19.8375 19.2375 16.9875 19.8 13.2C19.8 13.1625 19.2375 13.1625 18.9375 13.1625ZM12.15 18.675C8.43745 18.675 5.43745 15.675 5.43745 11.9625C5.43745 8.88748 7.61245 6.29998 10.425 5.47498V5.51248C9.74995 10.2 13.0875 14.1375 18.1875 14.5875C16.875 17.1375 15.075 18.5625 12.15 18.675Z"
        fill="var(--icon-moon)"
      />
    </svg>
  );
}
