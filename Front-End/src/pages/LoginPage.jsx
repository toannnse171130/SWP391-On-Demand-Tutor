import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginNewAccount } from "src/apis/authentication-module";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import Layout from "src/components/layout/Layout";
import { PUBLIC_ROUTER } from "src/constants/RouterConstant";
import { combineStrings } from "src/libs";
import cookie from "cookie";
import { useAuthContext } from "src/context/AuthContext";

const TOAST_CREATE_ACCOUNT = "toast-login-account";

function LoginPage(props) {
  const [loginAccount, setLoginAccount] = useState(undefined);
  const navigate = useNavigate();
  const { checkUserId } = useAuthContext();
  const loginAccountMutation = useMutation(
    async (newData) => {
      return await loginNewAccount(newData);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.success("Đăng nhập thành công");
          toast.dismiss(TOAST_CREATE_ACCOUNT);
          localStorage.setItem("fullName", data?.data?.fullName);
          localStorage.setItem("roleId", data?.data?.roleId);
          localStorage.setItem("userId", data?.data?.userId);
          checkUserId();
          const expireDate = new Date(data?.data?.expireTime);
          const maxAge = Math.floor((expireDate.getTime() - Date.now()) / 1000);

          window.document.cookie = cookie.serialize(
            "accessToken",
            data?.data?.token,
            {
              maxAge: maxAge,
              path: "/",
            }
          );

          navigate(PUBLIC_ROUTER.HOME);
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
          err?.response?.data?.message || err?.message || "Login error"
        );
        toast.dismiss(TOAST_CREATE_ACCOUNT);
      },
    }
  );

  const handleLoginAccount = () => {
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_CREATE_ACCOUNT,
    });
    loginAccountMutation.mutate(loginAccount);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center my-10 min-height-content">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập vào hệ thống
            </h1>
            <div className="space-y-4 md:space-y-6">
              <PrimaryInput
                title={
                  <div>
                    Email <span className="text-red-500">*</span>
                  </div>
                }
                placeholder="********"
                required={true}
                onChange={(e) => {
                  setLoginAccount({
                    ...loginAccount,
                    email: e.target.value,
                  });
                }}
                value={loginAccount?.email || ""}
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
                  setLoginAccount({
                    ...loginAccount,
                    password: e.target.value,
                  });
                }}
                value={loginAccount?.password || ""}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Ghi nhớ
                    </label>
                  </div>
                </div>
                <Link
                  to={PUBLIC_ROUTER.FORGET_PASSWORD}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <PrimaryBtn onClick={handleLoginAccount}>Đăng nhập</PrimaryBtn>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản?{" "}
                <Link
                  to={PUBLIC_ROUTER.REGISTER}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
