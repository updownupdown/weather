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
        d="M13.3125 5.73751C13.05 5.73751 12.825 5.51251 12.825 5.25001V3.37501C12.825 3.11251 13.05 2.88751 13.3125 2.88751C13.575 2.88751 13.8 3.11251 13.8 3.37501V5.25001C13.8 5.51251 13.575 5.73751 13.3125 5.73751ZM7.20002 11.85H5.32502C5.06252 11.85 4.83752 11.625 4.83752 11.3625C4.83752 11.1 5.06252 10.875 5.32502 10.875H7.20002C7.46252 10.875 7.68752 11.1 7.68752 11.3625C7.68752 11.625 7.46252 11.85 7.20002 11.85ZM21.2625 11.85H19.3875C19.125 11.85 18.9 11.625 18.9 11.3625C18.9 11.1 19.125 10.875 19.3875 10.875H21.2625C21.525 10.875 21.75 11.1 21.75 11.3625C21.75 11.625 21.525 11.85 21.2625 11.85ZM17.8125 7.50001C17.7 7.50001 17.55 7.46251 17.475 7.35001C17.2875 7.16251 17.2875 6.82501 17.475 6.63751L18.7875 5.32501C18.975 5.13751 19.3125 5.13751 19.5 5.32501C19.6875 5.51251 19.6875 5.85001 19.5 6.03751L18.1875 7.35001C18.075 7.42501 17.925 7.50001 17.8125 7.50001ZM19.125 17.55C19.0125 17.55 18.8625 17.5125 18.7875 17.4L17.475 16.0875C17.2875 15.9 17.2875 15.5625 17.475 15.375C17.6625 15.1875 17.9625 15.1875 18.1875 15.375L19.5 16.6875C19.6875 16.875 19.6875 17.2125 19.5 17.4C19.3875 17.475 19.2375 17.55 19.125 17.55ZM9.00002 7.57501C8.88752 7.57501 8.73752 7.53751 8.66252 7.42501L7.35002 6.11251C7.16252 5.92501 7.16252 5.58751 7.35002 5.40001C7.53752 5.21251 7.83752 5.21251 8.06252 5.40001L9.37502 6.71251C9.56252 6.90001 9.56252 7.23751 9.37502 7.42501C9.26252 7.53751 9.11252 7.57501 9.00002 7.57501V7.57501Z"
        fill="var(--icon-orange)"
      />
      <path
        d="M12.525 21.825H5.02495C3.63745 21.825 2.51245 20.7 2.51245 19.3125C2.51245 18.2625 3.14995 17.325 4.12495 16.95C4.16245 15.7125 5.17495 14.7 6.44995 14.7C6.71245 14.7 6.97495 14.7375 7.19995 14.85C7.79995 14.025 8.77495 13.5 9.82495 13.5C11.625 13.5 13.0875 14.9625 13.0875 16.7625C13.0875 16.9125 13.0874 17.025 13.0499 17.175C14.0999 17.4 14.9249 18.3375 14.9249 19.5C14.8874 20.775 13.8375 21.825 12.525 21.825V21.825ZM6.41245 15.7125C5.69995 15.7125 5.09995 16.3125 5.09995 17.025C5.09995 17.1 5.09995 17.175 5.13745 17.25L5.21245 17.7375L4.72495 17.85C4.01245 18 3.48745 18.6375 3.48745 19.35C3.48745 20.175 4.16245 20.8875 5.02495 20.8875H12.525C13.275 20.8875 13.8749 20.2875 13.8749 19.5375C13.8749 18.7875 13.275 18.1875 12.525 18.1875H12.45L11.7 18.225L11.9249 17.5125C11.9999 17.2875 12.0374 17.0625 12.0374 16.8C12.0374 15.5625 11.025 14.55 9.78745 14.55C8.96245 14.55 8.17495 15 7.79995 15.75L7.53745 16.2375L7.08745 15.975C6.89995 15.7875 6.63745 15.7125 6.41245 15.7125V15.7125Z"
        fill="var(--icon-cloud)"
      />
      <path
        d="M17.8125 11.3625C17.8125 8.88749 15.7875 6.86249 13.3125 6.86249C10.8375 6.86249 8.8125 8.88749 8.8125 11.3625C8.8125 11.625 8.85 11.8875 8.8875 12.1125C8.8875 12.4125 9.15 12.6375 9.4125 12.6C9.5625 12.6 9.7875 12.4875 9.825 12.3375C9.9 12.15 9.8625 11.9625 9.825 11.775C9.7875 11.625 9.7875 11.475 9.7875 11.3625C9.7875 9.41249 11.3625 7.83749 13.3125 7.83749C15.2625 7.83749 16.8 9.41249 16.8 11.3625C16.8 11.5125 16.7625 11.6625 16.7625 11.8125C16.725 11.9625 16.725 12.1125 16.6875 12.2625C16.6125 12.525 16.5 12.825 16.3875 13.05C16.2375 13.3125 16.0875 13.5375 15.9 13.7625C15.7125 13.9875 15.4875 14.175 15.2625 14.2875C15 14.4375 14.7375 14.55 14.475 14.6625C14.3625 14.7 14.25 14.7 14.1375 14.775C14.025 14.8125 13.95 14.925 13.9125 15.0375C13.875 15.1125 13.875 15.15 13.875 15.225C13.875 15.4875 14.1 15.7125 14.4 15.75C16.3125 15.3375 17.8125 13.4625 17.8125 11.3625V11.3625Z"
        fill="var(--icon-orange)"
      />
    </svg>
  );
}
