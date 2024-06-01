import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

function ProfileHeader({ isBack = false, title = "" }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center gap-3 ${isBack && "cursor-pointer"} w-fit`}
      onClick={() => {
        isBack && navigate(-1);
      }}
    >
      {isBack && <ArrowLeftIcon />}
      <Title>{title}</Title>
    </div>
  );
}

export default ProfileHeader;
