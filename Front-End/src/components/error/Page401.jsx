import React from "react";
import { Link } from "react-router-dom";

function Page401() {
  return (
    <div className="min-h-[400px] flex justify-center items-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">401</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! You need to login in this site.
        </p>
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let&apos;s get you back{" "}
          <Link to="/" className="underline text-blue">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Page401;
