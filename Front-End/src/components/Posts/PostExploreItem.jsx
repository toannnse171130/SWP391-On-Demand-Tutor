import {
  faAnglesRight,
  faBook,
  faLocationDot,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../common/PrimaryBtn";
import { format } from "date-fns";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import SmallLine from "../common/SmallLine";
import { combineStrings, getValueFromKey } from "src/libs";
import { LIST_GENDER_POST, LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { sendNewChat } from "src/apis/account-module";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "src/constants/RouterConstant";

const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function PostExploreItem({ data }) {
  const { roleId } = useAuthContext();
  const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();

  const sendChatMutation = useMutation(
    async (data) => {
      return await sendNewChat(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Gửi tin nhắn thành công");
          setIsProgress(false);
          navigate(PRIVATE_ROUTER.CHAT_BOX);
        } else {
          toast.dismiss(TOAST_PROGRESSING);
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsProgress(false);
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsProgress(false);
      },
    }
  );

  const handleClickJoin = () => {
    if (Number(roleId) !== LIST_ROLE_KEY.STUDENT) {
      toast.error("Bận cần phải là học sinh để tham gia lớp học này");
      return;
    }
    const newMessage = `Xin chào, mình có thể xin thêm thông tin về ${data?.shortDescription} có mã số lớp ${data?.id} được không?`;
    const submitObj = {
      to: data?.userId,
      content: newMessage,
    };
    setIsProgress(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    // @ts-ignore
    sendChatMutation.mutate(submitObj);
  };

  return (
    <div className="px-4 pt-3 pb-5 bg-white border-dashed hover:bg-[#eee] smooth-transform border-b-[#ddd] border-b-[1px]">
      <h3 className="text-black">{data?.shortDescription}</h3>
      <div className="flex items-center mt-2">
        <div className="text-[#808080] font-medium text-base">
          Mã lớp: {data?.id}
        </div>
        <div className="w-[50px]">
          <div className="slide-ltr">
            <FontAwesomeIcon icon={faAnglesRight} className="opacity-20" />
          </div>
        </div>
        <Link
          className="text-brown hover:underline smooth-transform"
          to={`${PUBLIC_ROUTER.TUTOR}/${data?.user?.id}`}
        >
          {data?.user?.fullName || "---"}
        </Link>
      </div>
      <SmallLine className="mt-3" />
      <div className="flex items-center justify-between mt-2">
        <h4 className="">
          Học phí :{" "}
          <span className="text-2xl text-primary">
            {new BigNumber(data?.fee || 0).toFormat()}đ/ Buổi
          </span>
        </h4>
        <PrimaryBtn
          disabled={isProgress}
          className="!w-fit rounded-md"
          onClick={handleClickJoin}
        >
          <span className="font-medium text-yellow">Tham gia ngay</span>
        </PrimaryBtn>
      </div>
      <div className="px-4 py-2 mt-3 border-dashed border-[#ddd] border-[2px]">
        {data?.description}
      </div>
      <div className="grid items-center grid-cols-3 gap-3 mt-3">
        <DetailItem
          icon={<FontAwesomeIcon icon={faClock} color="#a94442" size="xs" />}
          title="Bắt đầu vào: "
          description={
            data?.startDate
              ? format(new Date(data?.startDate), "HH:mm dd.MM.yyyy")
              : "---"
          }
        />
        <DetailItem
          icon={
            <FontAwesomeIcon icon={faMarsAndVenus} color="#a94442" size="xs" />
          }
          title="Yêu cầu học sinh: "
          description={
            data?.studentGender
              ? getValueFromKey(data?.studentGender, LIST_GENDER_POST, "key")
                  ?.value
              : "---"
          }
        />
        <DetailItem
          icon={
            <FontAwesomeIcon icon={faMarsAndVenus} color="#a94442" size="xs" />
          }
          title={`${data?.studyTimes?.length} buổi/ tuần`}
          description={`(${data?.studyHour} giờ/ buổi)`}
        />
      </div>
      <DetailItem
        icon={<FontAwesomeIcon icon={faUser} color="#a94442" size="xs" />}
        title={data?.numberOfStudent || "---"}
        description={" học viên"}
      />
      <DetailItem
        icon={
          <FontAwesomeIcon icon={faLocationDot} color="#a94442" size="xs" />
        }
        title="Địa điểm dạy: "
        description={data?.studyAddress}
      />
      <DetailItem
        icon={<FontAwesomeIcon icon={faBook} color="#a94442" size="xs" />}
        title="Môn học: "
        description={data?.subject}
      />
    </div>
  );
}

export default PostExploreItem;

function DetailItem({ icon = null, title = "", description = "" }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <div className="text-base font-semibold">
        {title} <span className="font-light">{description}</span>
      </div>
    </div>
  );
}
