import React from "react";
import { Link } from "react-router-dom";

function NavLinkButton({
  className = "",
  accessoriesLeft = null,
  accessoriesRight = null,
  children,
  to = "/",
  ...props
}) {
  return (
    <Link
      to={to}
      {...props}
      className={`bg-white w-fit rounded-3xl text-black font-medium py-2 px-4 active:bg-primary hover:bg-primary hover:text-white disabled:opacity-40 disabled:cursor-not-allowed smooth-transform flex justify-center items-center gap-3 text-sm ${className}`}
    >
      {accessoriesLeft && <div className="">{accessoriesLeft}</div>}
      {children}
      {accessoriesRight && <div className="">{accessoriesRight}</div>}
    </Link>
  );
}

export default NavLinkButton;
