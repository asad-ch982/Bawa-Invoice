import React from "react";

function HistoryIcon(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 9a6 6 0 100 12 6 6 0 000-12z"
    />
  </svg>
  );
}

export default HistoryIcon;
