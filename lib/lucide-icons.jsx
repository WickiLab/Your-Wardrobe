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

export const ChevronRight = (props) => (
  <IconBase {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
);

export const User = (props) => (
  <IconBase {...props}>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="8" r="4" />
  </IconBase>
);

export const Settings = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.54V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.54-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.54V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.64.25 1.07.87 1.07 1.56V11a2 2 0 0 1 0 2h-.09c-.69 0-1.31.43-1.54 1Z" />
  </IconBase>
);

export const Bell = (props) => (
  <IconBase {...props}>
    <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </IconBase>
);

export const Lock = (props) => (
  <IconBase {...props}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </IconBase>
);

export const Tag = (props) => (
  <IconBase {...props}>
    <path d="M20 12 12 20 4 12V4h8Z" />
    <circle cx="9" cy="9" r="1" />
  </IconBase>
);

export const Users = (props) => (
  <IconBase {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
);

export const ShoppingCart = (props) => (
  <IconBase {...props}>
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
    <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.76L21 7H6" />
  </IconBase>
);

export const Edit2 = (props) => (
  <IconBase {...props}>
    <path d="M3 21h6" />
    <path d="M14.7 4.3a2.1 2.1 0 0 1 3 3L8 17l-4 1 1-4Z" />
  </IconBase>
);
