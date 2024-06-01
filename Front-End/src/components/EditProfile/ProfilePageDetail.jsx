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
  console.log("dataProfileDetail: ", dataProfileDetail);

  return (
    <div className="bg-[#ffffff] block-border">
      <ProfileHeader title="Thông tin cá nhân" />
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
        <div className="w-full h-auto">
          <div className="flex flex-col items-center justify-between">
            <div>
              <div className="mb-5 text-xl font-semibold text-center">
                Avatar
              </div>
              <div className="flex items-center justify-center rounded w-[200px] h-[200px]">
                <img
                  className="object-cover w-full h-full rounded"
                  src={
                    dataProfileDetail?.userAvatar || "/images/logo-default.png"
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            Role: {dataProfileDetail?.account?.roleName}
          </div>
          <div className="mt-3">Email: {dataProfileDetail?.account?.email}</div>
        </div>
        <div className="flex flex-col gap-4">
          <PrimaryInput
            title={
              <p>
                Full name <span className="text-red-500">*</span>
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
              title="Gender"
              value={dataProfileDetail?.gender ? dataProfileDetail?.gender : ""}
              readOnly
            />
            <PrimaryInput
              title="Birth date"
              value={
                dataProfileDetail?.dob
                  ? format(new Date(dataProfileDetail?.dob), "dd-MM-yyyy")
                  : ""
              }
              readOnly
            />
          </div>

          <PrimaryInput
            title="Identify number"
            placeholder="Enter identify number"
            value={
              dataProfileDetail?.tutor?.cmnd
                ? dataProfileDetail?.tutor?.cmnd
                : ""
            }
            readOnly
          />
          <PrimaryInput
            title="Phone number"
            placeholder="Enter phone number"
            value={dataProfileDetail?.phone ? dataProfileDetail?.phone : ""}
            readOnly
          />
          <PrimaryInput
            title="Address"
            rows={4}
            placeholder="Enter address"
            value={dataProfileDetail?.address ? dataProfileDetail?.address : ""}
            readOnly
          />

          <PrimaryInput
            title={<p>School</p>}
            value={
              dataProfileDetail?.tutor?.school
                ? dataProfileDetail?.tutor?.school
                : ""
            }
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
