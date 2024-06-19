import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import PrimaryInput from "src/components/common/PrimaryInput";
import Layout from "src/components/layout/Layout";
import { PUBLIC_ROUTER } from "src/constants/RouterConstant";

function ForgetPasswordPage(props) {
  const [forgetStatus, setForgetStatus] = useState(1);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center my-10 min-height-content">
        {forgetStatus === 2 ? (
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Đổi mật khẩu mới
                </h1>
              </div>
              <div className="space-y-4 md:space-y-6">
                <PrimaryInput
                  title={"Email"}
                  placeholder="********"
                  required={true}
                />
                <PrimaryInput
                  title={"OTP"}
                  placeholder="Enter your OTP"
                  required={true}
                />
                <PrimaryInput
                  title={"Mật khẩu mới"}
                  placeholder="********"
                  type="password"
                  required={true}
                />
                <PrimaryBtn
                  onClick={() => {
                    setForgetStatus(1);
                  }}
                >
                  Đổi mật khẩu
                </PrimaryBtn>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Link to={PUBLIC_ROUTER.LOGIN}>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="cursor-pointer"
                  />
                </Link>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Lấy lại mật khẩu
                </h1>
              </div>
              <div className="space-y-4 md:space-y-6">
                <PrimaryInput
                  title={"Email"}
                  placeholder="********"
                  required={true}
                />
                <PrimaryBtn
                  onClick={() => {
                    setForgetStatus(2);
                  }}
                >
                  Gửi OTP
                </PrimaryBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ForgetPasswordPage;
