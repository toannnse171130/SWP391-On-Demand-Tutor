import React, { useState } from "react";
import ProfileHeader from "../common/ProfileHeader";
import PrimaryInput from "../common/PrimaryInput";
import { format } from "date-fns";
import PrimarySmallTitle from "../common/PrimarySmallTitle";
import PrimaryBtn from "../common/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetail } from "src/apis/account-module";
import { getValueFromKey } from "src/libs";
import { DEFAULT_IMG, LIST_ROLE_VALUE } from "src/constants/constants";

function ProfilePageDetail() {
  const [dataProfileDetail, setDataProfileDetail] = useState(undefined);
  const navigate = useNavigate();

  useQuery({
    queryKey: ["profileDetail"],
    queryFn: async () => {
      const response = await getProfileDetail();
      setDataProfileDetail(response?.data);
      return response?.data;
    },
  });

  return (
    <div className="bg-[#ffffff] block-border">
      <ProfileHeader title="Thông tin cá nhân" />
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
        <div className="w-full h-auto">
          <div className="flex flex-col items-center justify-between">
            <div>
              <div className="mb-5 text-xl font-semibold text-center">
                Ảnh đại diện
              </div>
              <div className="flex items-center justify-center rounded w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src={dataProfileDetail?.userAvatar || DEFAULT_IMG.LOGO}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            Chức vụ:{" "}
            {getValueFromKey(dataProfileDetail?.roleId, LIST_ROLE_VALUE)
              ?.name || "---"}
          </div>
          <div className="mt-3">Email: {dataProfileDetail?.email}</div>
        </div>
        <div className="flex flex-col gap-4">
          <PrimaryInput
            title={
              <p>
                Họ và tên <span className="text-red-500">*</span>
              </p>
            }
            placeholder="Enter first name"
            value={
              dataProfileDetail?.fullName ? dataProfileDetail?.fullName : ""
            }
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
            <PrimaryInput
              title="Giới tính"
              value={dataProfileDetail?.gender ? "Nam" : "Nữ"}
              readOnly
            />
            <PrimaryInput
              title="Ngày sinh"
              value={
                dataProfileDetail?.dob
                  ? format(new Date(dataProfileDetail?.dob), "dd-MM-yyyy")
                  : ""
              }
              readOnly
            />
          </div>
          <PrimaryInput
            title="Số điện thoại"
            placeholder="Enter phone number"
            value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Địa chỉ"
            rows={4}
            placeholder="Enter address"
            value={dataProfileDetail?.address ? dataProfileDetail?.address : ""}
            readOnly
          />
          <div className="grid items-center grid-cols-2 gap-4">
            <PrimaryInput
              title={<p>Education level</p>}
              placeholder="Enter education level"
              value={
                dataProfileDetail?.tutor?.educationLevel
                  ? dataProfileDetail?.tutor?.educationLevel
                  : ""
              }
              readOnly
            />
            <PrimaryInput
              title={<p>Graduation year</p>}
              placeholder="Enter graduation year"
              value={
                dataProfileDetail?.tutor?.graduationYear
                  ? dataProfileDetail?.tutor?.graduationYear
                  : ""
              }
              readOnly
            />
          </div>
          <div className="grid items-center gap-x-4 gap-y-2 grid-cols-2575">
            <PrimarySmallTitle>CV</PrimarySmallTitle>
            <div>
              <a
                className="underline hover:text-primary smooth-transform"
                href={dataProfileDetail?.tutor?.cv}
                target="_blank"
                rel="noreferrer"
              >
                View CV Now
              </a>
            </div>
            <PrimarySmallTitle>Identify Card</PrimarySmallTitle>
            <div>
              <a
                className="underline hover:text-primary smooth-transform"
                href={dataProfileDetail?.tutor?.frontCmnd}
                target="_blank"
                rel="noreferrer"
              >
                View Front
              </a>{" "}
              /{" "}
              <a
                className="underline hover:text-primary smooth-transform"
                href={dataProfileDetail?.tutor?.backCmnd}
                target="_blank"
                rel="noreferrer"
              >
                View Back
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <PrimaryBtn
          className="md:max-w-[222px]"
          onClick={() => {
            navigate(PRIVATE_ROUTER.EDIT_PROFILE);
          }}
        >
          Chỉnh sửa
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default ProfilePageDetail;
