import { format } from "date-fns";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryInput from "src/components/common/PrimaryInput";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import SmallLine from "src/components/common/SmallLine";
import SubMenu from "src/components/common/SubMenu";
import Page401 from "src/components/error/Page401";
import AddPlusIcon from "src/components/icons/AddPlusIcon";
import GarbageIcon from "src/components/icons/GarbageIcon";
import Layout from "src/components/layout/Layout";
import {
  DAYS_OF_WEEK,
  LIST_GENDER_POST,
  LIST_ROLE_KEY,
  LIST_TIME_PER_SECTION,
  LIST_TYPE_OF_FEE,
} from "src/constants/enumConstants";
import { useAuthContext } from "src/context/AuthContext";
import Select from "react-select";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { createNewPostDetail } from "src/apis/post-module";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";
import { combineStrings } from "src/libs";

const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function CreatePostPage() {
  const { roleId } = useAuthContext();
  const [newPostDetail, setNewPostDetail] = useState(undefined);
  const [genderSelected, setGenderSelected] = useState(undefined);
  const [sessionStart, setSessionStart] = useState("");
  const [listLevels, setListLevels] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(undefined);
  const [hoursPerSection, setHoursPerSection] = useState(null);
  const [typeOfFee, setTypeOfFee] = useState(null);
  const navigate = useNavigate();
  console.log("genderSelected: ", genderSelected);
  const handleAddNewLevel = () => {
    if (!hoursPerSection) {
      toast.error("Hãy chọn số giờ cho mỗi buổi học trước khi lên lịch học");
    }
    if (sessionStart && hoursPerSection && dayOfWeek) {
      const fromTime = moment(sessionStart, "HH:mm:ss");
      const toTime = fromTime.clone().add(hoursPerSection?.value, "hours");
      const toTimeString = toTime.format("HH:mm:ss");
      setListLevels([
        ...listLevels,
        {
          from: fromTime.format("HH:mm:ss"),
          dayOfWeek: dayOfWeek?.value,
          dayValue: dayOfWeek?.label,
          to: toTimeString,
        },
      ]);
      setSessionStart("");
      setDayOfWeek(undefined);
    }
  };

  const createPostMutation = useMutation(
    async (newData) => {
      return await createNewPostDetail(newData);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Bài viết đã được gửi cho admin duyệt");
          navigate(PRIVATE_ROUTER.MANAGE_POST);
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

  const handleCreateNewPost = () => {
    if (!hoursPerSection) {
      toast.error("Hãy chọn số giờ học trong mỗi buổi học");
      return;
    }
    if (!typeOfFee) {
      toast.error("Hãy chọn cách thức đóng học phí");
      return;
    }
    const submitData = {
      ...newPostDetail,
      studyHour: hoursPerSection?.value,
      typeOfFee: typeOfFee?.key,
      studyTimes: listLevels,
    };
    if (genderSelected) {
      submitData["studentGender"] = genderSelected?.key;
    }
    console.log("SubmitData: ", submitData);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    createPostMutation.mutate(submitData);
  };

  return (
    <Layout>
      {Number(roleId) === LIST_ROLE_KEY.TUTOR ? (
        <>
          <h3>Mô tả yêu cầu về lớp</h3>
          <SmallLine className="my-2" />
          <div className="flex flex-col gap-3 mt-5">
            <PrimaryInput
              title={
                <div>
                  Số điện thoại liên hệ{" "}
                  <span className="text-dangerous">*</span>
                </div>
              }
              placeholder="Ví dụ: 0912******"
              className="max-w-[400px]"
              onChange={(e) => {
                setNewPostDetail({
                  ...newPostDetail,
                  contactPhone: e.target.value,
                });
              }}
              value={newPostDetail?.contactPhone || ""}
            />
            <PrimaryInput
              title={
                <div>
                  Mô tả tuyển sinh (Tối đa 20 từ){" "}
                  <span className="text-dangerous">*</span>
                </div>
              }
              placeholder="Ví dụ: Tuyển sinh lớp dạy đàn"
              onChange={(e) => {
                setNewPostDetail({
                  ...newPostDetail,
                  shortDescription: e.target.value,
                });
              }}
              value={newPostDetail?.shortDescription || ""}
            />
            <div className="flex items-center gap-5">
              <PrimaryInput
                title={
                  <div>
                    Địa điểm dạy
                    <span className="text-dangerous">*</span>
                  </div>
                }
                placeholder="Ví dụ: Google Meet"
                className="w-[400px]"
                onChange={(e) => {
                  setNewPostDetail({
                    ...newPostDetail,
                    studyAddress: e.target.value,
                  });
                }}
                value={newPostDetail?.studyAddress || ""}
              />
              <PrimaryInput
                title={
                  <div>
                    Số học viên
                    <span className="text-dangerous">*</span>
                  </div>
                }
                placeholder="2"
                type="number"
                className="w-[100px]"
                onChange={(e) => {
                  setNewPostDetail({
                    ...newPostDetail,
                    numberOfStudent: e.target.value,
                  });
                }}
                value={newPostDetail?.numberOfStudent || ""}
              />
              <PrimaryInput
                title={
                  <div>
                    Ngày bắt đầu
                    <span className="text-dangerous">*</span>
                  </div>
                }
                type="date"
                className="w-[160px]"
                value={
                  newPostDetail?.startDate
                    ? format(new Date(newPostDetail?.startDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  const currentDate = new Date().toISOString().slice(0, 10);
                  if (selectedDate < currentDate) {
                    setNewPostDetail({
                      ...newPostDetail,
                      startDate: currentDate,
                    });
                  } else {
                    setNewPostDetail({
                      ...newPostDetail,
                      startDate: selectedDate,
                    });
                  }
                }}
                min={new Date().toISOString().slice(0, 10)}
              />
              <div>
                <div className="mb-2 text-sm font-bold text-black">
                  Giờ mỗi buổi <span className="text-dangerous">*</span>
                </div>
                <Select
                  className="!w-[170px]"
                  options={LIST_TIME_PER_SECTION}
                  placeholder="tiếng/ buổi"
                  onChange={setHoursPerSection}
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <PrimaryInput
                title={
                  <div>
                    Môn học
                    <span className="text-dangerous">*</span>
                  </div>
                }
                placeholder="Đàn piano"
                className="w-[!400px]"
                onChange={(e) => {
                  setNewPostDetail({
                    ...newPostDetail,
                    subject: e.target.value,
                  });
                }}
                value={newPostDetail?.subject || ""}
              />
              <div>
                <div className="mb-2 text-sm font-bold text-black">
                  Giới tính học viên
                </div>
                <SubMenu
                  activeTab={genderSelected}
                  setActiveTab={setGenderSelected}
                  listMenu={LIST_GENDER_POST}
                />
              </div>
              <PrimaryInput
                title={
                  <div>
                    Học phí
                    <span className="text-dangerous">*</span>
                  </div>
                }
                placeholder="Ví dụ: 300000"
                className="w-[200px]"
                onChange={(e) => {
                  setNewPostDetail({
                    ...newPostDetail,
                    fee: e.target.value,
                  });
                }}
                value={newPostDetail?.fee || ""}
                accessoriesRight={"/buổi"}
              />
              <FilterDropDown
                title={
                  <div>
                    Cách đóng học phí
                    <span className="text-dangerous">*</span>
                  </div>
                }
                textDefault=""
                className="!w-[200px]"
                showing={typeOfFee}
                setShowing={setTypeOfFee}
                listDropdown={LIST_TYPE_OF_FEE}
              />
            </div>
            <PrimaryInput
              title={
                <div>
                  Mô tả thêm
                  <span className="text-dangerous">*</span>
                </div>
              }
              placeholder="Ví dụ: tôi có 10 năm kinh nghiệm"
              onChange={(e) => {
                setNewPostDetail({
                  ...newPostDetail,
                  description: e.target.value,
                });
              }}
              value={newPostDetail?.description || ""}
            />
            <div className="mt-3">
              <div className="mb-2 text-sm font-bold text-black">
                Thời gian có thể học <span className="text-red-500">*</span>
              </div>
              <div>
                {listLevels?.length > 0 && (
                  <div className="max-h-[276px] overflow-y-auto my-2">
                    {listLevels.map((i, index) => (
                      <TableLevelRow
                        key={`level-row-${index}`}
                        data={i}
                        itemIndex={index}
                        listLevels={listLevels}
                        setListLevels={setListLevels}
                      />
                    ))}
                  </div>
                )}
                <AdditionLevelRow
                  handleAddNewLevel={handleAddNewLevel}
                  sessionStart={sessionStart}
                  setSessionStart={setSessionStart}
                  dayOfWeek={dayOfWeek}
                  setDayOfWeek={setDayOfWeek}
                  scheduleNumber={listLevels?.length + 1}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <PrimaryBtn className="!w-[200px]" onClick={handleCreateNewPost}>
              Đăng bài
            </PrimaryBtn>
          </div>
        </>
      ) : (
        <Page401 />
      )}
    </Layout>
  );
}

export default CreatePostPage;

function AdditionLevelRow({
  handleAddNewLevel,
  sessionStart,
  setSessionStart,
  dayOfWeek,
  setDayOfWeek,
  scheduleNumber,
}) {
  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Lịch {scheduleNumber}:</h1>
        <Select
          placeholder="Chọn ngày"
          className="!w-[200px]"
          onChange={setDayOfWeek}
          defaultValue={dayOfWeek}
          options={DAYS_OF_WEEK}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Giờ bắt đầu</p>
        <input
          type="time"
          value={sessionStart || ""}
          onChange={(e) => {
            setSessionStart(e.target.value);
          }}
        />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <SecondaryBtn
          className="!w-10 !h-10 !px-0 !py-0 rounded"
          onClick={handleAddNewLevel}
        >
          <AddPlusIcon />
        </SecondaryBtn>
      </div>
    </div>
  );
}

function TableLevelRow({ data, listLevels, setListLevels, itemIndex }) {
  const handleRemoveLevel = () => {
    const listRemove = listLevels.filter((i, index) => index !== itemIndex);
    setListLevels(listRemove);
  };

  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Lịch {itemIndex + 1}:</h1>
        <FilterDropDown
          textDefault={data?.dayValue}
          className="!w-[200px]"
          listDropdown={DAYS_OF_WEEK}
          showing={undefined}
          setShowing={undefined}
          disabled
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Giờ bắt đầu</p>
        <input type="time" value={data?.from || ""} readOnly />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <div onClick={handleRemoveLevel}>
          <GarbageIcon />
        </div>
      </div>
    </div>
  );
}
