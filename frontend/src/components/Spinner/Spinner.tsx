import React from 'react';
import clsx from 'clsx';
import './Spinner.scss';

interface Props {
  size: 'sm' | 'md' | 'lg';
  centered: boolean;
}

export const Spinner = ({ size, centered }: Props) => (
  <div
    className={clsx(`spinner spinner--${size}`, centered && 'spinner--centered')}
    role="presentation"
  >
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" />
    </svg>
  </div>
);

Spinner.defaultProps = {
  size: 'md',
  centered: true,
};
