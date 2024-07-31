import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faGraduationCap,
  faPhone,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getListCommentByTutorId,
  getTutorDetail,
  leaveFeedback,
} from "src/apis/tutor-module";
import { DEFAULT_IMG, LIST_GENDER_VALUE } from "src/constants/constants";
import { combineStrings, getValueFromKey } from "src/libs";
import { format } from "date-fns";
import PrimaryTextArea from "../common/PrimaryTextArea";
import PrimaryBtn from "../common/PrimaryBtn";
import { toast } from "react-toastify";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";
import { sendNewChat } from "src/apis/account-module";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";

const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

const TOAST_CHAT_PROGRESSING = "TOAST_CHAT_PROGRESS_ID";

function TutorExploreDetail() {
  const [tutorDetail, setTutorDetail] = useState(undefined);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isProgress, setIsProgress] = useState(false);
  const { roleId } = useAuthContext();
  const navigate = useNavigate();

  useQuery({
    queryKey: ["getTutorDetail", id],
    queryFn: async () => {
      const response = await getTutorDetail(id);
      setTutorDetail(response?.data);
      return response?.data;
    },
    enabled: !!id,
  });

  const { data: listComment } = useQuery({
    queryKey: ["getListCommentByTutorId", id],
    queryFn: async () => {
      const response = await getListCommentByTutorId(id);
      return response?.data;
    },
    enabled: !!id,
  });

  const sendCommentMutation = useMutation(
    async (data) => {
      return await leaveFeedback(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Nhận xét thành công");
          queryClient.invalidateQueries(["getListCommentByTutorId"]);
          setIsProgress(false);
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

  const handleSendComment = () => {
    setIsProgress(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    const submitObj = {
      feedbeckToId: id,
      content: search,
    };
    // @ts-ignore
    sendCommentMutation.mutate(submitObj);
  };

  const sendChatMutation = useMutation(
    async (data) => {
      return await sendNewChat(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_CHAT_PROGRESSING);
          toast.success("Gửi tin nhắn thành công");
          navigate(PRIVATE_ROUTER.CHAT_BOX);
        } else {
          toast.dismiss(TOAST_CHAT_PROGRESSING);
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
        toast.dismiss(TOAST_CHAT_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleClickContact = () => {
    const newMessage = `Xin chào, mình có thể xin thêm thông tin về bạn và các lớp bạn đang dạy được không?`;
    const submitObj = {
      to: id,
      content: newMessage,
    };
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_CHAT_PROGRESSING,
    });
    // @ts-ignore
    sendChatMutation.mutate(submitObj);
  };

  return (
    <div>
      <div className="grid gap-4 grid-cols-2080">
        <div className="flex flex-col items-center gap-3">
          <img
            src={tutorDetail?.avatar || DEFAULT_IMG.TUTOR}
            alt="logo"
            className="w-full rounded-sm aspect-square"
          />
          <PrimaryBtn
            onClick={handleClickContact}
            className="!w-[140px] !rounded-md"
          >
            Liên hệ
          </PrimaryBtn>
        </div>
        <div>
          <div className="text-2xl font-normal text-black capitalize">
            {tutorDetail?.fullName}
          </div>
          <div className="bg-[#fec723] h-[1px] w-full mt-2" />
          <div className="flex flex-col gap-3 mt-2">
            <InformationItem
              title={"Email:"}
              data={tutorDetail?.email}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <InformationItem
              title={"Giới tính:"}
              data={
                tutorDetail?.gender
                  ? getValueFromKey(tutorDetail?.gender, LIST_GENDER_VALUE)
                      ?.name
                  : "---"
              }
              icon={<FontAwesomeIcon icon={faVenusMars} />}
            />
            <InformationItem
              title={"Trình độ:"}
              data={"Giáo viên"}
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
            />
            <InformationItem
              title={"Ngày sinh:"}
              data={tutorDetail?.dob}
              icon={<FontAwesomeIcon icon={faCakeCandles} />}
            />
            <InformationItem
              title={"Số điện thoại:"}
              data={tutorDetail?.phone}
              icon={<FontAwesomeIcon icon={faPhone} />}
            />
          </div>
          <div className="mt-5">{tutorDetail?.desciption}</div>
        </div>
      </div>
      <div className="p-3 mt-5 border rounded-xl">
        <div className="text-xl font-semibold text-black">
          NHẬN XÉT CỦA HỌC VIÊN
        </div>
        {Number(roleId) === LIST_ROLE_KEY.STUDENT ? (
          <div className="mt-3">
            <div className="flex items-center w-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
                alt="logo"
                className="w-16 h-16 rounded-full"
              />
              <PrimaryTextArea
                className="w-full"
                rows={3}
                placeholder="Nhập bình luận"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search || ""}
              />
            </div>
            <div className="flex justify-end">
              <PrimaryBtn
                onClick={handleSendComment}
                className="!rounded-md !w-[200px]"
              >
                Gửi
              </PrimaryBtn>
            </div>
          </div>
        ) : (
          <div className="p-3 mt-3 rounded bg-grayBorder">
            Chỉ học sinh mới có thể đăng nhận xét cho giáo viên
          </div>
        )}
        <div className="mt-5 font-medium">{listComment?.length} nhận xét</div>
        <div className="flex flex-col gap-3">
          {listComment?.map((item) => (
            <div className="flex items-center gap-3 mt-3" key={item?.id}>
              <img
                src={item?.avatar || DEFAULT_IMG.LOGO}
                alt="logo"
                className="object-cover w-20 rounded-full h-2w-20"
              />
              <div className="w-full">
                <div className="">{item?.createBy?.fullName}</div>
                <div className="mt-3">
                  {item?.createAt
                    ? format(new Date(item?.createAt), "hh:MM, dd-MM-yyyy")
                    : "---"}
                </div>
                <div className="w-full p-4 mt-3 rounded-md bg-slate-100">
                  {item?.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TutorExploreDetail;

function InformationItem({ icon, title, data }) {
  return (
    <div className="grid gap-3 grid-cols-2080">
      <div className="flex items-center gap-2">
        {icon}
        <div>{title}</div>
      </div>
      <div>{data}</div>
    </div>
  );
}
