import React from "react";

function XIcon(props) {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={12} cy={12.875} r={10} fill="#F13535" />
      <path
        d="M15.016 14.645l-1.779-1.778 1.778-1.778a.874.874 0 000-1.237.872.872 0 00-1.237 0L12 11.628 10.22 9.85a.877.877 0 00-1.238 0 .877.877 0 000 1.238l1.78 1.78-1.776 1.775a.874.874 0 101.237 1.238L12 14.104l1.78 1.78a.876.876 0 001.237-1.238z"
        fill="#F5F5F5"
      />
    </svg>
  );
}
export default XIcon;
