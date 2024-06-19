import React, { useState } from "react";
import { format } from "date-fns";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryBtn from "../common/PrimaryBtn";
import UploadImage from "../common/UploadImage";
import useUploadImage from "src/hooks/useUploadImage";
import FilterDropDown from "../common/FilterDropDown";
import { Link } from "react-router-dom";
import ProfileHeader from "../common/ProfileHeader";
import Title from "../common/Title";
import { useFormik } from "formik";
import {
  passwordValidation,
  requileValidation,
} from "src/constants/validations";
import * as Yup from "yup";
import {
  DEFAULT_IMG,
  LIST_GENDER_VALUE,
  LIST_ROLE_VALUE,
} from "src/constants/constants";
import PrimarySmallTitle from "../common/PrimarySmallTitle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileDetail, updateProfileDetail } from "src/apis/account-module";
import { combineStrings, getValueFromKey } from "src/libs";
import { toast } from "react-toastify";

function EditProfile() {
  const { imageUrlResponse, handleUploadImage, imageUpload } = useUploadImage();
  const [gender, setGender] = useState(undefined);
  const [dataProfileDetail, setDataProfileDetail] = useState(null);
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["profileDetail"],
    queryFn: async () => {
      const response = await getProfileDetail();
      setDataProfileDetail(response?.data);
      return response?.data;
    },
  });

  const changeProfileMutation = useMutation(
    async (newData) => {
      return await updateProfileDetail(newData);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Update profile successfully");
          queryClient.invalidateQueries(["profileDetail"]);
        } else {
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
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
      },
    }
  );

  const handleSaveNewDetail = () => {
    const submitObj = {
      ...dataProfileDetail,
    };
    if (gender) {
      submitObj["gender"] = gender?.value;
    }
    // @ts-ignore
    changeProfileMutation.mutate(submitObj);
  };

  return (
    <div>
      <div className="bg-[#ffffff] block-border">
        <ProfileHeader isBack title="Chỉnh sửa hồ sơ" />
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-37">
          <div className="w-full h-auto">
            <div className="flex flex-col items-center justify-between">
              <div>
                <div className="mb-5 text-xl font-semibold text-center">
                  Ảnh đại diện
                </div>
                {/* <div className="flex items-center justify-center border rounded border-primary w-[200px] h-[200px]">
                  <UploadImage
                    imageUrlResponse={
                      imageUpload ? imageUpload : dataProfileDetail?.userAvatar
                    }
                    onChange={(e) => handleUploadImage(e)}
                  />
                </div> */}
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
              placeholder="Nhập họ và tên"
              value={dataProfileDetail?.fullName || ""}
              onChange={(e) => {
                setDataProfileDetail({
                  ...dataProfileDetail,
                  fullName: e.target.value,
                });
              }}
            />
            <div className="grid items-center grid-cols-2 gap-4">
              <FilterDropDown
                title="Giới tính"
                listDropdown={LIST_GENDER_VALUE}
                showing={gender}
                setShowing={setGender}
                textDefault={dataProfileDetail?.gender ? "Nam" : "Nữ"}
              />
              <div>
                <PrimarySmallTitle className="mb-2">
                  Date of birth
                </PrimarySmallTitle>
                <input
                  max={new Date().toISOString().slice(0, 10)}
                  value={
                    dataProfileDetail?.dob
                      ? format(new Date(dataProfileDetail?.dob), "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const currentDate = new Date().toISOString().slice(0, 10);
                    if (selectedDate > currentDate) {
                      setDataProfileDetail({
                        ...dataProfileDetail,
                        dob: currentDate,
                      });
                    } else {
                      setDataProfileDetail({
                        ...dataProfileDetail,
                        dob: selectedDate,
                      });
                    }
                  }}
                  type="date"
                  className="w-full h-[46px] px-4 py-3 border rounded-md outline-none border-gray focus:border-primary hover:border-primary smooth-transform"
                />
              </div>
            </div>
            <PrimaryInput
              title="Số điện thoại"
              placeholder="Enter phone number"
              value={dataProfileDetail?.phone || ""}
              onChange={(e) => {
                setDataProfileDetail({
                  ...dataProfileDetail,
                  phone: e.target.value,
                });
              }}
            />
            <PrimaryInput
              title="Địa chỉ"
              rows={4}
              placeholder="Nhập địa chỉ"
              value={
                dataProfileDetail?.address ? dataProfileDetail?.address : ""
              }
              onChange={(e) => {
                setDataProfileDetail({
                  ...dataProfileDetail,
                  address: e.target.value,
                });
              }}
            />
            <div className="grid items-center grid-cols-2 gap-4">
              <PrimaryInput
                title={<p>Education level</p>}
                placeholder="Enter education level"
                value={
                  dataProfileDetail?.educationLevel
                    ? dataProfileDetail?.educationLevel
                    : ""
                }
                onChange={(e) => {
                  setDataProfileDetail({
                    ...dataProfileDetail,
                    educationLevel: e.target.value,
                  });
                }}
              />
              <PrimaryInput
                title={<p>Graduation year</p>}
                placeholder="Enter graduation year"
                value={
                  dataProfileDetail?.graduationYear
                    ? dataProfileDetail?.graduationYear
                    : ""
                }
                onChange={(e) => {
                  setDataProfileDetail({
                    ...dataProfileDetail,
                    graduationYear: e.target.value,
                  });
                }}
              />
            </div>
            <div className="grid items-center gap-x-4 gap-y-2 grid-cols-2575">
              <PrimarySmallTitle>CV</PrimarySmallTitle>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    setDataProfileDetail({
                      ...dataProfileDetail,
                      Cv: e.target.files[0],
                    });
                  }}
                />
                <a
                  className="underline hover:text-primary smooth-transform"
                  href={dataProfileDetail?.tutor?.cv}
                  target="_blank"
                  rel="noreferrer"
                >
                  View CV Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryBtn
            onClick={handleSaveNewDetail}
            className="md:max-w-[222px] mt-6"
          >
            Lưu
          </PrimaryBtn>
        </div>
      </div>
      <ChangePasswordSection staffAccountObject={dataProfileDetail} />
    </div>
  );
}

export default EditProfile;

const passwordValidationSchema = Yup.object({
  NewPassword: passwordValidation,
  RePassword: requileValidation,
  OldPassword: requileValidation,
});

function ChangePasswordSection({ staffAccountObject }) {
  // const changePasswordMutation = useMutation(
  //   async (newData) => {
  //     console.log("newData: ", newData);
  //     return await changePasswordAccount(newData);
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log("Data: ", data);
  //       if (data?.status >= 200 && data?.status < 300) {
  //         toast.success("Change password successfully");
  //       } else {
  //         toast.error(
  //           // @ts-ignore
  //           combineStrings(data?.response?.data?.errors) ||
  //             // @ts-ignore
  //             combineStrings(data?.response?.data?.message) ||
  //             // @ts-ignore
  //             combineStrings(data?.message) ||
  //             "Oops! Something went wrong..."
  //         );
  //       }
  //     },
  //     onError: (err) => {
  //       toast.error(
  //         // @ts-ignore
  //         err?.response?.data?.message || err?.message || "Update error"
  //       );
  //     },
  //   }
  // );

  const formPassword = useFormik({
    initialValues: {
      Email: staffAccountObject?.account?.email,
      OldPassword: "",
      NewPassword: "",
      RePassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        const submitObject = {
          ...values,
          Email: staffAccountObject?.account?.email,
        };
        console.log("Go change password", submitObject);
        for (const key in submitObject) {
          const value = submitObject[key];
          formData.append(key, value);
        }
        // @ts-ignore
        // changePasswordMutation.mutate(formData);
      } catch (error) {
        console.error("Call api failed:", error.response.data);
      }
    },
  });

  return (
    <form
      onSubmit={formPassword.handleSubmit}
      className="mt-5 bg-white block-border"
    >
      <Title>Đổi mật khẩu</Title>
      <div className="flex flex-col gap-3 mt-5">
        <PrimaryInput
          id="OldPassword"
          type="password"
          title={
            <div>
              Mật khẩu cũ <span className="text-dangerous">*</span>
            </div>
          }
          classNameInput={`${
            formPassword.touched.OldPassword && formPassword.errors.OldPassword
              ? "border border-red-500"
              : ""
          }`}
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.OldPassword || ""}
          isError={
            formPassword.touched.OldPassword && formPassword.errors.OldPassword
          }
          messageError={formPassword.errors.OldPassword}
          placeholder="Nhập mật khẩu cũ"
        />
        <PrimaryInput
          id="NewPassword"
          type="password"
          title={
            <div>
              Mật khẩu mới <span className="text-dangerous">*</span>
            </div>
          }
          classNameInput={`${
            formPassword.touched.NewPassword && formPassword.errors.NewPassword
              ? "border border-red-500"
              : ""
          }`}
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.NewPassword || ""}
          isError={
            formPassword.touched.NewPassword && formPassword.errors.NewPassword
          }
          messageError={formPassword.errors.NewPassword}
          placeholder="Nhập mật khẩu mới"
        />
        <PrimaryInput
          title={
            <div>
              Nhập lại mật khẩu mới <span className="text-dangerous">*</span>
            </div>
          }
          id="RePassword"
          type="password"
          classNameInput={`${
            formPassword.values.NewPassword !== formPassword.values.RePassword
              ? "border border-red-500"
              : ""
          }`}
          placeholder="******"
          onChange={formPassword.handleChange}
          onBlur={formPassword.handleBlur}
          value={formPassword.values.RePassword}
          isError={
            formPassword.values.NewPassword !==
              formPassword.values.RePassword && formPassword.values.RePassword
          }
          messageError={"Password not match"}
        />
      </div>
      <div className="flex items-center justify-end gap-4 mt-6">
        <PrimaryBtn className="md:max-w-[222px]" type="submit">
          Save
        </PrimaryBtn>
      </div>
    </form>
  );
}
