import React from "react";
import { Link } from "react-router-dom";

function NotFound({ className = "" }) {
  return (
    <div className="flex items-center justify-center flex-grow min-h-screen bg-gray-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-4 font-semibold text-white rounded bg-blue hover:bg-blue-600"
        >
          {" "}
          Go back to Home{" "}
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
