import React from "react";

function SmallText({ className = "", children }) {
  return (
    <div className={`text-sm font-normal text-white ${className}`}>
      {children}
    </div>
  );
}

export default SmallText;
