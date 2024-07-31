import React from "react";
import ProfileHeader from "../common/ProfileHeader";
import PrimaryInput from "../common/PrimaryInput";
import { format } from "date-fns";
import PrimaryBtn from "../common/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";
import { getValueFromKey } from "src/libs";
import {
  DEFAULT_IMG,
  LIST_ROLE_AVATAR,
  LIST_ROLE_VALUE,
} from "src/constants/constants";
import PrimaryTextArea from "../common/PrimaryTextArea";

function TutorProfilePageDetail({ dataProfileDetail }) {
  const navigate = useNavigate();

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
                  src={dataProfileDetail?.avatar || DEFAULT_IMG.LOGO}
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
          <PrimaryTextArea
            title="Mô tả"
            rows={4}
            placeholder="Nhập mô tả"
            value={
              dataProfileDetail?.desciption ? dataProfileDetail?.desciption : ""
            }
            readOnly
          />
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

export default TutorProfilePageDetail;
