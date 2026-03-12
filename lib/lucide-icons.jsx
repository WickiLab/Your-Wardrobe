'use client';

import React from 'react';

const IconBase = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  children,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const Home = (props) => (
  <IconBase {...props}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </IconBase>
);

export const Shirt = (props) => (
  <IconBase {...props}>
    <path d="M8 4 6 8l-3 1v4l3-1v8h12v-8l3 1V9l-3-1-2-4-4 2-4-2Z" />
  </IconBase>
);

export const Calendar = (props) => (
  <IconBase {...props}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </IconBase>
);

export const CreditCard = (props) => (
  <IconBase {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </IconBase>
);

export const Sparkles = (props) => (
  <IconBase {...props}>
    <path d="m12 3 1.6 3.9L18 8.5l-4.4 1.6L12 14l-1.6-3.9L6 8.5l4.4-1.6Z" />
    <path d="m5 16 .8 2L8 19l-2.2 1L5 22l-.8-2L2 19l2.2-1Z" />
    <path d="m19 14 .8 2L22 17l-2.2 1-.8 2-.8-2L16 17l2.2-1Z" />
  </IconBase>
);

export const LogOut = (props) => (
  <IconBase {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </IconBase>
);

export const Plus = (props) => (
  <IconBase {...props}>
    <path d="M12 5v14M5 12h14" />
  </IconBase>
);

export const Trash2 = (props) => (
  <IconBase {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
  </IconBase>
);

export const Upload = (props) => (
  <IconBase {...props}>
    <path d="M12 16V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </IconBase>
);

export const X = (props) => (
  <IconBase {...props}>
    <path d="m18 6-12 12M6 6l12 12" />
  </IconBase>
);

export const Check = (props) => (
  <IconBase {...props}>
    <path d="m20 6-11 11-5-5" />
  </IconBase>
);
