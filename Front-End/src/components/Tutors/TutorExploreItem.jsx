import {
  faCakeCandles,
  faEnvelope,
  faGraduationCap,
  faPhone,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_IMG, LIST_GENDER_VALUE } from "src/constants/constants";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "src/constants/RouterConstant";
import { combineStrings, getValueFromKey } from "src/libs";
import PrimaryBtn from "../common/PrimaryBtn";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { sendNewChat } from "src/apis/account-module";

const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function TutorExploreItem({ data }) {
  const { roleId } = useAuthContext();
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
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleClickContact = () => {
    // if (Number(roleId) !== LIST_ROLE_KEY.STUDENT) {
    //   toast.error("Bận cần phải là học sinh để tham gia lớp học này");
    //   return;
    // }
    const newMessage = `Xin chào, mình có thể xin thêm thông tin về bạn và các lớp bạn đang dạy được không?`;
    const submitObj = {
      to: data?.id,
      content: newMessage,
    };
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    // @ts-ignore
    sendChatMutation.mutate(submitObj);
  };
  return (
    <div>
      <div className="relative tutor-relative">
        <img
          src={data?.avatar || DEFAULT_IMG.TUTOR}
          alt="logo"
          className="w-full aspect-square"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-3 bg-white tutor-absolute-contact">
          <div>{data?.desciption}</div>
          <PrimaryBtn
            onClick={handleClickContact}
            className="!w-fit !rounded-lg !px-2 !py-[2px]"
          >
            Liên hệ
          </PrimaryBtn>
        </div>
      </div>
      <Link to={`${PUBLIC_ROUTER.TUTOR}/${data?.id}`}>
        <div className="p-3 bg-[#333333] text-white w-full">
          <div className="mb-2 uppercase">{data?.fullName}</div>
          <div className="flex flex-col gap-1">
            <InformationItem
              data={data?.email}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <InformationItem
              data={
                data?.gender
                  ? getValueFromKey(data?.gender, LIST_GENDER_VALUE)?.name
                  : "---"
              }
              icon={<FontAwesomeIcon icon={faVenusMars} />}
            />
            <InformationItem
              data={"Giáo viên"}
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
            />
            <InformationItem
              data={data?.dob}
              icon={<FontAwesomeIcon icon={faCakeCandles} />}
            />
            <InformationItem
              data={data?.phone}
              icon={<FontAwesomeIcon icon={faPhone} />}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TutorExploreItem;

function InformationItem({ data, icon }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <div>{data}</div>
    </div>
  );
}
