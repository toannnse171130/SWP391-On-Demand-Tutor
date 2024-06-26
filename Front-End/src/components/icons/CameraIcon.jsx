import React from "react";

function CameraIcon(props) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.25 8.25a.75.75 0 00-.75.75 2.25 2.25 0 01-2.25 2.25H7.5a2.25 2.25 0 00-2.25 2.25v12a2.25 2.25 0 002.25 2.25h21a2.25 2.25 0 002.25-2.25v-12a2.25 2.25 0 00-2.25-2.25h-3.75A2.25 2.25 0 0122.5 9a.75.75 0 00-.75-.75h-7.5zM12 9a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0124 9c0 .414.336.75.75.75h3.75a3.75 3.75 0 013.75 3.75v12a3.75 3.75 0 01-3.75 3.75h-21a3.75 3.75 0 01-3.75-3.75v-12A3.75 3.75 0 017.5 9.75h3.75A.75.75 0 0012 9zm6 6.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm-5.25 3.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
        fill="#43B14B"
      />
    </svg>
  );
}

export default CameraIcon;
