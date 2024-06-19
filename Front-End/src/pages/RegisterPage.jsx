import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewAccount } from "src/apis/authentication-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import Layout from "src/components/layout/Layout";
import { PUBLIC_ROUTER } from "src/constants/RouterConstant";
import { LIST_GENDER_VALUE } from "src/constants/constants";
import { combineStrings } from "src/libs";

const TOAST_CREATE_ACCOUNT = "toast-create-account";

function RegisterPage(props) {
  const [accountDetail, setAccountDetail] = useState(undefined);
  const [genderSelected, setGenderSelected] = useState(undefined);
  const navigate = useNavigate();

  const createNewAccountMutation = useMutation(
    async (newData) => {
      return await registerNewAccount(newData);
    },
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Register successfully");
          toast.dismiss(TOAST_CREATE_ACCOUNT);
          navigate(PUBLIC_ROUTER.LOGIN);
        } else {
          toast.error(
            // @ts-ignore
            combineStrings(data?.response?.data?.errors) ||
              // @ts-ignore
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              // @ts-ignore
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          toast.dismiss(TOAST_CREATE_ACCOUNT);
        }
      },
      onError: (err) => {
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Create error"
        );
        toast.dismiss(TOAST_CREATE_ACCOUNT);
      },
    }
  );

  const handleRegisterNewAccount = () => {
    toast.loading("Sending request...", {
      toastId: TOAST_CREATE_ACCOUNT,
    });
    const queryObj = {
      ...accountDetail,
    };
    if (genderSelected) {
      queryObj["gender"] = genderSelected?.value;
    }
    console.log("Send log: ", queryObj);
    createNewAccountMutation.mutate(queryObj);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center my-10 min-height-content">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-md xl:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng ký tài khoản
            </h1>
            <div className="space-y-4 md:space-y-6">
              <PrimaryInput
                title={
                  <div>
                    Email <span className="text-red-500">*</span>
                  </div>
                }
                placeholder="gs@gmail.com"
                required={true}
                onChange={(e) => {
                  setAccountDetail({
                    ...accountDetail,
                    email: e.target.value,
                  });
                }}
                value={accountDetail?.email || ""}
              />
              <PrimaryInput
                title={
                  <div>
                    Mật khẩu <span className="text-red-500">*</span>
                  </div>
                }
                type="password"
                placeholder="********"
                required={true}
                onChange={(e) => {
                  setAccountDetail({
                    ...accountDetail,
                    password: e.target.value,
                  });
                }}
                value={accountDetail?.password || ""}
              />
              <PrimaryInput
                title={
                  <div>
                    Họ và tên <span className="text-red-500">*</span>
                  </div>
                }
                required={true}
                onChange={(e) => {
                  setAccountDetail({
                    ...accountDetail,
                    fullName: e.target.value,
                  });
                }}
                value={accountDetail?.fullName || ""}
              />
              <div className="grid items-center grid-cols-3 gap-3">
                <PrimaryInput
                  title={<div>Ngày sinh</div>}
                  type="date"
                  onChange={(e) => {
                    setAccountDetail({
                      ...accountDetail,
                      dob: e.target.value,
                    });
                  }}
                  value={
                    accountDetail?.dob
                      ? format(new Date(accountDetail?.dob), "yyyy-MM-dd")
                      : ""
                  }
                />
                <PrimaryInput
                  title={<div>Số điện thoại</div>}
                  placeholder="0912.xxx.xxx"
                  onChange={(e) => {
                    setAccountDetail({
                      ...accountDetail,
                      phone: e.target.value,
                    });
                  }}
                  value={accountDetail?.phone || ""}
                />
                <FilterDropDown
                  title={<div>Giới tính</div>}
                  listDropdown={LIST_GENDER_VALUE}
                  showing={genderSelected}
                  setShowing={setGenderSelected}
                />
              </div>
              <div className="flex items-center gap-8">
                <div className="text-sm font-bold text-black">
                  Chức vụ <span className="text-red-500"> *</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="flexRadioDefault"
                    type="radio"
                    id="radioOption1"
                    onChange={(e) => {
                      setAccountDetail({
                        ...accountDetail,
                        roleId: 3,
                      });
                    }}
                    checked={accountDetail?.roleId === 3}
                  />
                  <label className="" htmlFor="radioOption1">
                    Học sinh
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="flexRadioDefault"
                    type="radio"
                    id="radioOption2"
                    onChange={(e) => {
                      setAccountDetail({
                        ...accountDetail,
                        roleId: 2,
                      });
                    }}
                    checked={accountDetail?.roleId === 2}
                  />
                  <label className="" htmlFor="radioOption2">
                    Gia sư
                  </label>
                </div>
              </div>
              <PrimaryBtn onClick={handleRegisterNewAccount}>
                Đăng ký
              </PrimaryBtn>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  to={PUBLIC_ROUTER.LOGIN}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
