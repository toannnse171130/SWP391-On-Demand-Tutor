import React from "react";

function SmallLine({ className = "" }) {
  return <div className={`h-[2px] w-[50px] bg-black ${className}`}></div>;
}

export default SmallLine;
