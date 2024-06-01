import React from "react";
import { Link } from "react-router-dom";

function LinkCustom({
  to = "/",
  className = "",
  isLink = true,
  children,
  ...props
}) {
  return isLink ? (
    <Link className={`flex items-center gap-2 ${className}`} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <a
      className={`flex items-center gap-2 ${className}`}
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default LinkCustom;
