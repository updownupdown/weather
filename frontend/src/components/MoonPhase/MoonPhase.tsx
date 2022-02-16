import React from "react";
import moon from "./moon.jpg";
import "./MoonPhase.scss";

const moonPaths = [
  <path d="M0.733154 12.01C0.733154 10.48 1.03315 9.00998 1.62315 7.61998C2.21315 6.22998 3.02315 5.02998 4.02315 4.01998C5.02315 3.00998 6.22315 2.20998 7.62315 1.61998C9.02315 1.02998 10.4732 0.72998 11.9932 0.72998C13.5232 0.72998 14.9932 1.02998 16.3832 1.61998C17.7732 2.20998 18.9732 3.01998 19.9832 4.01998C20.9932 5.01998 21.7932 6.21998 22.3832 7.61998C22.9732 9.01998 23.2732 10.47 23.2732 12.01C23.2732 13.53 22.9732 14.99 22.3832 16.38C21.7932 17.77 20.9832 18.97 19.9832 19.98C18.9832 20.99 17.7832 21.79 16.3832 22.38C14.9832 22.97 13.5332 23.27 11.9932 23.27C10.4732 23.27 9.01315 22.97 7.62315 22.38C6.23315 21.79 5.03315 20.98 4.02315 19.98C3.01315 18.98 2.21315 17.78 1.62315 16.38C1.03315 14.98 0.733154 13.54 0.733154 12.01ZM1.93315 12.01C1.93315 13.37 2.20315 14.67 2.73315 15.91C3.26315 17.15 3.98315 18.23 4.88315 19.13C5.78315 20.03 6.85315 20.74 8.10315 21.28C9.35315 21.82 10.6532 22.08 12.0032 22.08C13.3732 22.08 14.6732 21.81 15.9132 21.28C17.1532 20.75 18.2232 20.03 19.1332 19.13C20.0432 18.23 20.7532 17.16 21.2832 15.91C21.8132 14.66 22.0832 13.36 22.0832 12.01C22.0832 10.19 21.6332 8.50998 20.7332 6.95998C19.8332 5.40998 18.6032 4.18998 17.0532 3.27998C15.5032 2.36998 13.8232 1.92998 12.0032 1.92998C10.6432 1.92998 9.34315 2.19998 8.10315 2.72998C6.86315 3.25998 5.78315 3.97998 4.88315 4.88998C3.98315 5.79998 3.27315 6.86998 2.73315 8.10998C2.19315 9.34998 1.93315 10.65 1.93315 12.01Z" />,
  <path d="M12.02 23.2551C14.06 23.2551 15.94 22.7551 17.67 21.7451C19.4 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.67 2.25512C15.95 1.25512 14.06 0.745117 12.02 0.745117C13.34 1.26512 14.5 1.94512 15.49 2.80512C16.48 3.66512 17.27 4.59512 17.84 5.62512C18.41 6.65512 18.83 7.69512 19.11 8.75512C19.39 9.81512 19.52 10.8951 19.52 11.9951C19.52 12.6351 19.5 13.2551 19.45 13.8351C19.4 14.4151 19.3 15.0351 19.16 15.7051C19.02 16.3751 18.83 16.9851 18.6 17.5651C18.37 18.1451 18.06 18.7151 17.68 19.3051C17.3 19.8951 16.85 20.4151 16.33 20.8851C15.81 21.3551 15.19 21.8051 14.46 22.2151C13.73 22.6251 12.91 22.9651 12.02 23.2551Z" />,
  <path d="M12.02 23.2551C14.06 23.2551 15.94 22.7551 17.67 21.7451C19.4 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.67 2.25512C15.95 1.25512 14.06 0.745117 12.02 0.745117C13.12 1.33512 14.09 2.06512 14.91 2.93512C15.73 3.80512 16.38 4.75512 16.86 5.76512C17.34 6.77512 17.69 7.79512 17.91 8.83512C18.13 9.87512 18.25 10.9251 18.25 11.9951C18.25 12.9051 18.21 13.7551 18.12 14.5351C18.03 15.3151 17.85 16.1651 17.59 17.0651C17.33 17.9651 16.97 18.7751 16.53 19.4951C16.09 20.2151 15.49 20.9151 14.71 21.5851C13.93 22.2551 13.04 22.8051 12.02 23.2551Z" />,
  <path d="M12.02 23.2551C14.06 23.2551 15.94 22.7551 17.67 21.7451C19.4 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.67 2.25512C15.95 1.25512 14.06 0.745117 12.02 0.745117C13.73 2.00512 14.99 3.64512 15.8 5.65512C16.61 7.66512 17.01 9.78512 17.01 11.9851C17.01 12.8851 16.98 13.7151 16.91 14.4851C16.84 15.2551 16.7 16.0751 16.48 16.9551C16.26 17.8351 15.97 18.6351 15.62 19.3551C15.27 20.0751 14.79 20.7751 14.17 21.4751C13.55 22.1751 12.84 22.7551 12.02 23.2551Z" />,
  <path d="M12.02 23.2551C14.06 23.2551 15.94 22.7551 17.67 21.7451C19.4 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.67 2.25512C15.95 1.25512 14.06 0.745117 12.02 0.745117C13.31 2.13512 14.26 3.81512 14.86 5.79512C15.46 7.77512 15.77 9.84512 15.77 11.9951C15.77 12.8751 15.74 13.6851 15.69 14.4351C15.64 15.1851 15.53 15.9851 15.37 16.8451C15.21 17.7051 14.99 18.4951 14.73 19.2151C14.47 19.9351 14.1 20.6451 13.64 21.3651C13.18 22.0851 12.63 22.6951 12.02 23.2551Z" />,
  <path d="M12.01 23.2551C14.05 23.2551 15.94 22.7551 17.66 21.7451C19.38 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.66 2.25512C15.93 1.25512 14.05 0.745117 12.01 0.745117C13.68 3.64512 14.51 7.39512 14.51 11.9951C14.51 14.3251 14.34 16.4251 13.99 18.2951C13.64 20.1651 12.99 21.8051 12.01 23.2551Z" />,
  <path d="M12.01 23.2551C14.05 23.2551 15.94 22.7551 17.66 21.7451C19.38 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.66 2.25512C15.93 1.25512 14.05 0.745117 12.01 0.745117C13.68 3.64512 14.51 7.39512 14.51 11.9951C14.51 14.3251 14.34 16.4251 13.99 18.2951C13.64 20.1651 12.99 21.8051 12.01 23.2551Z" />,
  <path d="M12.02 23.2551C14.06 23.2551 15.94 22.7551 17.67 21.7451C19.4 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.67 2.25512C15.95 1.25512 14.06 0.745117 12.02 0.745117V23.2551Z" />,
  <path d="M10.9408 11.9851C10.9208 16.5151 11.2708 20.2751 11.9808 23.2551C14.0208 23.2651 15.9108 22.7651 17.6308 21.7651C19.3508 20.7651 20.7308 19.4051 21.7408 17.6851C22.7508 15.9651 23.2608 14.0751 23.2708 12.0351C23.2808 9.99512 22.7808 8.10512 21.7808 6.38512C20.7808 4.65512 19.4208 3.28512 17.7008 2.27512C15.9808 1.26512 14.1008 0.755117 12.0608 0.745117C11.3308 4.45512 10.9508 8.20512 10.9408 11.9851Z" />,
  <path d="M9.87 11.9951C9.87 16.7651 10.58 20.5151 12.01 23.2551C14.05 23.2551 15.94 22.7551 17.66 21.7451C19.38 20.7351 20.76 19.3751 21.76 17.6451C22.76 15.9151 23.27 14.0351 23.27 11.9951C23.27 9.95512 22.77 8.07512 21.76 6.34512C20.75 4.61512 19.39 3.25512 17.66 2.25512C15.93 1.25512 14.05 0.745117 12.01 0.745117C10.59 4.16512 9.87 7.91512 9.87 11.9951Z" />,
  <path d="M8.79346 11.99C8.79346 14.38 9.03346 16.51 9.50346 18.38C9.97346 20.25 10.8135 21.88 12.0135 23.27C13.5335 23.27 14.9935 22.97 16.3835 22.38C17.7735 21.79 18.9735 20.98 19.9835 19.98C20.9935 18.98 21.7935 17.78 22.3835 16.38C22.9735 14.98 23.2735 13.53 23.2735 11.99C23.2735 10.45 22.9735 8.99998 22.3835 7.60998C21.7935 6.21998 20.9835 5.02998 19.9835 4.01998C18.9835 3.00998 17.7835 2.20998 16.3835 1.61998C14.9835 1.02998 13.5335 0.72998 12.0135 0.72998C10.9935 2.18998 10.2035 3.88998 9.64346 5.85998C9.08346 7.82998 8.79346 9.85998 8.79346 11.99Z" />,
  <path d="M7.72339 11.98C7.72339 13.17 7.79339 14.27 7.92339 15.28C8.05339 16.29 8.27339 17.28 8.59339 18.27C8.91339 19.26 9.35339 20.17 9.92339 21.02C10.4934 21.87 11.1934 22.61 12.0134 23.27C13.5434 23.27 15.0034 22.97 16.3934 22.38C17.7834 21.79 18.9734 20.98 19.9834 19.98C20.9934 18.98 21.7934 17.78 22.3834 16.38C22.9734 14.98 23.2734 13.53 23.2734 11.99C23.2734 9.94998 22.7734 8.05998 21.7634 6.33998C20.7534 4.61998 19.3934 3.23998 17.6634 2.23998C15.9334 1.23998 14.0534 0.72998 12.0134 0.72998C10.6634 2.02998 9.61339 3.66998 8.85339 5.65998C8.09339 7.64998 7.72339 9.73998 7.72339 11.98Z" />,
  <path d="M6.64343 11.99C6.64343 13.23 6.72343 14.37 6.89343 15.4C7.06343 16.43 7.33343 17.45 7.72343 18.44C8.11343 19.43 8.67343 20.33 9.39343 21.15C10.1134 21.97 10.9934 22.67 12.0134 23.27C13.5334 23.27 14.9934 22.97 16.3834 22.38C17.7734 21.79 18.9734 20.98 19.9834 19.98C20.9934 18.98 21.7934 17.78 22.3834 16.38C22.9734 14.98 23.2734 13.53 23.2734 11.99C23.2734 10.45 22.9734 8.99998 22.3834 7.60998C21.7934 6.21998 20.9834 5.02998 19.9834 4.01998C18.9834 3.00998 17.7834 2.20998 16.3834 1.61998C14.9834 1.02998 13.5334 0.72998 12.0134 0.72998C10.3434 1.86998 9.03343 3.44998 8.07343 5.46998C7.11343 7.48998 6.64343 9.64998 6.64343 11.99Z" />,
  <path d="M5.57336 12C5.57336 13.03 5.63336 13.97 5.75336 14.83C5.87336 15.69 6.07336 16.56 6.37336 17.42C6.67336 18.28 7.06336 19.07 7.53336 19.76C8.00336 20.45 8.63336 21.11 9.38336 21.72C10.1334 22.33 11.0134 22.84 12.0134 23.27C13.5434 23.27 15.0034 22.97 16.3934 22.38C17.7834 21.79 18.9734 20.98 19.9834 19.98C20.9934 18.98 21.7934 17.78 22.3834 16.38C22.9734 14.98 23.2734 13.53 23.2734 11.99C23.2734 9.94998 22.7734 8.05998 21.7634 6.33998C20.7534 4.61998 19.3934 3.23998 17.6634 2.23998C15.9334 1.23998 14.0534 0.72998 12.0134 0.72998C10.0234 1.72998 8.45336 3.23998 7.29336 5.27998C6.13336 7.31998 5.57336 9.55998 5.57336 12Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3434 21.7451C8.0734 22.7451 9.9534 23.2551 11.9934 23.2551C14.0334 23.2551 15.9134 22.7551 17.6434 21.7451C19.3734 20.7351 20.7334 19.3751 21.7334 17.6451C22.7334 15.9151 23.2434 14.0351 23.2434 11.9951C23.2434 9.95512 22.7434 8.07512 21.7334 6.34512C20.7234 4.61512 19.3634 3.25512 17.6434 2.25512C15.9234 1.25512 14.0334 0.745117 11.9934 0.745117C9.9534 0.745117 8.0734 1.25512 6.3434 2.25512C4.6134 3.25512 3.2434 4.62512 2.2434 6.34512C1.2434 8.06512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9949C0.733398 13.2149 0.923399 14.3949 1.2934 15.5349C1.6634 16.6749 2.2034 17.7049 2.8934 18.6249C3.5834 19.5449 4.3934 20.3449 5.3134 21.0449C6.2334 21.7449 7.2634 22.2749 8.4034 22.6449C9.5434 23.0149 10.7234 23.2049 11.9434 23.2049C16.9734 21.8049 19.4834 18.0649 19.4834 11.9849C19.4834 10.8049 19.3434 9.68492 19.0634 8.61492C18.7834 7.54492 18.4134 6.60492 17.9334 5.78492C17.4534 4.96492 16.8934 4.21492 16.2534 3.54492C15.6134 2.87492 14.9134 2.30492 14.1934 1.86492C13.4734 1.42492 12.7234 1.05492 11.9334 0.794922C10.4134 0.794922 8.9534 1.09492 7.5634 1.68492C6.1734 2.27492 5.0134 3.07492 4.0134 4.07492C3.0134 5.07492 2.2134 6.26492 1.6234 7.64492C1.0334 9.02492 0.733398 10.4749 0.733398 11.9949Z" />,
  <path d="M0.733398 12.0052C0.733398 13.2252 0.923399 14.4052 1.2934 15.5452C1.6634 16.6852 2.2034 17.7152 2.8934 18.6352C3.5834 19.5552 4.3934 20.3552 5.3134 21.0552C6.2334 21.7552 7.2634 22.2852 8.4034 22.6552C9.5434 23.0252 10.7234 23.2152 11.9434 23.2152C16.2734 21.4852 18.4334 17.7452 18.4334 11.9952C18.4334 10.6052 18.2534 9.29516 17.8934 8.06516C17.5334 6.83516 17.0434 5.75516 16.4234 4.83516C15.8034 3.91516 15.1134 3.12516 14.3634 2.44516C13.6134 1.76516 12.8034 1.21516 11.9434 0.785156C9.9134 0.785156 8.0334 1.28516 6.3134 2.28516C4.5934 3.28516 3.2434 4.65516 2.2334 6.37516C1.2234 8.09516 0.733398 9.97516 0.733398 12.0052Z" />,
  <path d="M0.733398 12.0149C0.733398 13.2349 0.923399 14.4149 1.2934 15.5549C1.6634 16.6949 2.2034 17.7249 2.8934 18.6449C3.5834 19.5649 4.3934 20.3649 5.3134 21.0649C6.2334 21.7649 7.2634 22.2949 8.4034 22.6649C9.5434 23.0349 10.7234 23.2249 11.9434 23.2249C15.5534 21.1549 17.3634 17.4149 17.3634 12.0049C17.3634 10.6949 17.2134 9.4449 16.9134 8.2649C16.6134 7.0849 16.2034 6.0249 15.6834 5.0949C15.1634 4.1649 14.5834 3.3449 13.9634 2.6349C13.3434 1.9249 12.6634 1.3049 11.9434 0.774902C10.4234 0.774902 8.9634 1.0749 7.5734 1.6649C6.1834 2.2549 4.9934 3.0549 3.9934 4.0649C2.9934 5.0749 2.1934 6.2649 1.6034 7.6549C1.0134 9.0449 0.733398 10.4849 0.733398 12.0149Z" />,
  <path d="M0.733398 11.9846C0.733398 13.5046 1.0334 14.9646 1.6234 16.3546C2.2134 17.7446 3.0134 18.9346 4.0234 19.9446C5.0334 20.9546 6.2234 21.7446 7.6134 22.3446C9.0034 22.9446 10.4534 23.2346 11.9834 23.2346C14.8734 20.8446 16.3234 17.0946 16.3234 11.9946C16.3234 9.65465 15.9134 7.52465 15.1034 5.63465C14.2934 3.74465 13.2534 2.11465 11.9934 0.764648C9.9634 0.764648 8.0834 1.26465 6.3534 2.27465C4.6234 3.28465 3.2434 4.63465 2.2334 6.35465C1.2234 8.07465 0.733398 9.95465 0.733398 11.9846Z" />,
  <path d="M0.733398 12.0098C0.733398 14.0398 1.2334 15.9198 2.2434 17.6398C3.2534 19.3598 4.6134 20.7298 6.3334 21.7298C8.0534 22.7298 9.9334 23.2398 11.9634 23.2398C14.1334 20.4898 15.2134 16.7398 15.2134 11.9998C15.2134 8.03977 14.1334 4.28977 11.9634 0.759766C9.9334 0.759766 8.0534 1.25977 6.3334 2.25977C4.6134 3.25977 3.2534 4.63977 2.2434 6.36977C1.2334 8.09977 0.733398 9.97977 0.733398 12.0098Z" />,
  <path d="M0.733398 11.9949C0.733398 14.0349 1.2334 15.9149 2.2434 17.6449C3.2534 19.3749 4.6134 20.7349 6.3334 21.7349C8.0534 22.7349 9.9434 23.2449 11.9834 23.2449C13.4234 20.1649 14.1334 16.4149 14.1334 11.9949C14.1334 8.53488 13.4134 4.79488 11.9834 0.754883C10.4634 0.754883 9.0034 1.05488 7.6134 1.64488C6.2234 2.23488 5.0234 3.03488 4.0234 4.03488C3.0234 5.03488 2.2234 6.23488 1.6234 7.62488C1.0234 9.01488 0.733398 10.4649 0.733398 11.9949Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3334 21.7451C8.0534 22.7451 9.9434 23.2551 11.9834 23.2551V0.745117C9.9434 0.745117 8.0634 1.24512 6.3334 2.25512C4.6034 3.26512 3.2534 4.62512 2.2434 6.35512C1.2334 8.08512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3334 21.7451C8.0534 22.7451 9.9434 23.2551 11.9834 23.2551C10.9834 20.1151 10.4934 16.3551 10.4934 11.9951C10.4934 8.56512 10.9934 4.81512 11.9834 0.745117C9.9434 0.745117 8.0634 1.24512 6.3334 2.25512C4.6034 3.26512 3.2534 4.62512 2.2434 6.35512C1.2334 8.08512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3434 21.7451C8.0734 22.7451 9.9534 23.2551 11.9934 23.2551C9.9834 20.5151 8.9734 16.7551 8.9734 11.9951C8.9734 8.01512 9.9834 4.26512 11.9934 0.745117C9.9534 0.745117 8.0634 1.24512 6.3434 2.25512C4.6234 3.26512 3.2434 4.62512 2.2434 6.34512C1.2434 8.06512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3334 21.7451C8.0534 22.7451 9.9434 23.2551 11.9834 23.2551C8.9934 20.9251 7.5034 17.1651 7.5034 11.9951C7.5034 9.67512 7.9234 7.53512 8.7534 5.59512C9.5834 3.65512 10.6634 2.03512 11.9834 0.745117C9.9434 0.745117 8.0634 1.24512 6.3334 2.25512C4.6034 3.26512 3.2534 4.62512 2.2434 6.35512C1.2334 8.08512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3434 21.7451C8.0734 22.7451 9.9534 23.2551 11.9934 23.2551C9.9234 22.2451 8.4034 20.8051 7.4334 18.9251C6.4634 17.0451 5.9934 14.7451 5.9934 11.9951C5.9934 9.46512 6.5534 7.21512 7.6834 5.24512C8.8134 3.27512 10.2534 1.77512 11.9934 0.745117C9.9534 0.745117 8.0634 1.24512 6.3434 2.25512C4.6234 3.26512 3.2434 4.62512 2.2434 6.34512C1.2434 8.06512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3334 21.7451C8.0534 22.7451 9.9434 23.2551 11.9834 23.2551C9.3934 22.4651 7.5034 21.1251 6.2934 19.2351C5.0834 17.3451 4.4834 14.9351 4.4834 11.9951C4.4834 10.6051 4.6834 9.29512 5.0834 8.04512C5.4834 6.79512 6.0234 5.70512 6.7134 4.77512C7.4034 3.84512 8.1934 3.02512 9.0834 2.33512C9.9734 1.64512 10.9434 1.11512 11.9734 0.745117C9.9334 0.745117 8.0534 1.24512 6.3234 2.25512C4.5934 3.26512 3.2534 4.62512 2.2434 6.35512C1.2334 8.08512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 11.9951C0.733398 14.0351 1.2334 15.9251 2.2434 17.6451C3.2534 19.3651 4.6134 20.7451 6.3334 21.7451C8.0534 22.7451 9.9434 23.2551 11.9834 23.2551C10.5234 22.6951 9.2634 22.0751 8.1934 21.3751C7.1234 20.6751 6.2634 19.9851 5.6234 19.2751C4.9834 18.5651 4.4734 17.7851 4.0934 16.9351C3.7134 16.0851 3.4534 15.2751 3.3234 14.5151C3.1934 13.7551 3.1234 12.9151 3.1234 11.9951C3.1234 11.3451 3.1534 10.7351 3.2034 10.1851C3.2534 9.63512 3.3634 9.04512 3.5234 8.41512C3.6834 7.78512 3.9034 7.20512 4.1634 6.66512C4.4234 6.12512 4.7934 5.57512 5.2434 5.00512C5.6934 4.43512 6.2234 3.90512 6.8334 3.43512C7.4434 2.96512 8.1734 2.48512 9.0434 2.01512C9.9134 1.54512 10.8934 1.12512 11.9734 0.745117C9.9334 0.745117 8.0534 1.24512 6.3234 2.25512C4.5934 3.26512 3.2534 4.62512 2.2434 6.35512C1.2334 8.08512 0.733398 9.95512 0.733398 11.9951Z" />,
  <path d="M0.733398 12.01C0.733398 10.48 1.0334 9.00998 1.6234 7.61998C2.2134 6.22998 3.0234 5.02998 4.0234 4.01998C5.0234 3.00998 6.2234 2.20998 7.6234 1.61998C9.0234 1.02998 10.4734 0.72998 11.9934 0.72998C13.5234 0.72998 14.9934 1.02998 16.3834 1.61998C17.7734 2.20998 18.9734 3.01998 19.9834 4.01998C20.9934 5.01998 21.7934 6.21998 22.3834 7.61998C22.9734 9.01998 23.2734 10.47 23.2734 12.01C23.2734 13.53 22.9734 14.99 22.3834 16.38C21.7934 17.77 20.9834 18.97 19.9834 19.98C18.9834 20.99 17.7834 21.79 16.3834 22.38C14.9834 22.97 13.5334 23.27 11.9934 23.27C10.4734 23.27 9.0134 22.97 7.6234 22.38C6.2334 21.79 5.0334 20.98 4.0234 19.98C3.0134 18.98 2.2134 17.78 1.6234 16.38C1.0334 14.98 0.733398 13.54 0.733398 12.01ZM1.9334 12.01C1.9334 13.37 2.2034 14.67 2.7334 15.91C3.2634 17.15 3.9834 18.23 4.8834 19.13C5.7834 20.03 6.8534 20.74 8.1034 21.28C9.3534 21.82 10.6534 22.08 12.0034 22.08C13.3734 22.08 14.6734 21.81 15.9134 21.28C17.1534 20.75 18.2234 20.03 19.1334 19.13C20.0434 18.23 20.7534 17.16 21.2834 15.91C21.8134 14.66 22.0834 13.36 22.0834 12.01C22.0834 10.19 21.6334 8.50998 20.7334 6.95998C19.8334 5.40998 18.6034 4.18998 17.0534 3.27998C15.5034 2.36998 13.8234 1.92998 12.0034 1.92998C10.6434 1.92998 9.3434 2.19998 8.1034 2.72998C6.8634 3.25998 5.7834 3.97998 4.8834 4.88998C3.9834 5.79998 3.2734 6.86998 2.7334 8.10998C2.1934 9.34998 1.9334 10.65 1.9334 12.01Z" />,
];

interface Props {
  phase: number;
  props?: React.SVGProps<SVGSVGElement>;
}

export const MoonPhase = ({ phase, props }: Props) => {
  const phaseNum = Math.round(phase * 28);

  return (
    <div className="moon-phase">
      <img className="texture" src={moon} alt="moon" />

      <div className="shadow" />

      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="#000000"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        {moonPaths[phaseNum]}
      </svg>
    </div>
  );
};