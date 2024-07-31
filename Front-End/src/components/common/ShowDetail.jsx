import React from "react";
import SecondaryBtn from "../common/SecondaryBtn";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";

function ShowDetail() {
  return (
    <div>
      <ShowPasswordIcon className="hidden cursor-pointer md:block" />
      <SecondaryBtn className="block w-[100px] md:hidden cursor-pointer">
        Chi tiết
      </SecondaryBtn>
    </div>
  );
}

export default ShowDetail;
