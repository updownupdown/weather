import * as React from "react";

export function ArrowSimple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="#000000"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11.5358 2.93581L7.8348 6.6368C7.41032 7.06128 7.70215 7.7776 8.29908 7.7776L10.6736 7.7776L10.6736 19.7163C10.6736 20.4459 11.2705 21.0428 12.0001 21.0428C12.7297 21.0428 13.3266 20.4459 13.3266 19.7163L13.3266 7.7776L15.7011 7.7776C16.298 7.7776 16.5898 7.06128 16.1653 6.65006L12.4643 2.94908C12.2123 2.68377 11.7878 2.68377 11.5358 2.93581Z" />
    </svg>
  );
}
