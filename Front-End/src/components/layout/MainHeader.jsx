import React from "react";
import SmallText from "../common/SmallText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkCustom from "../common/LinkCustom";
import {
  faEnvelope,
  faPhone,
  faUser,
  faUserPlus,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "src/context/AuthContext";
import { logOut } from "src/libs/handleLogout";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "src/constants/RouterConstant";

function MainHeader() {
  const navigate = useNavigate();
  const { fullName, checkUserId } = useAuthContext();
  return (
    <div className="bg-primary">
      <div className="flex justify-between text-white md:max-w-[1168px] 2xl:max-w-[1468px] mx-auto py-2">
        <div className="flex items-center gap-8">
          <LinkCustom to="tel:0912222222" isLink={false}>
            <FontAwesomeIcon icon={faPhone} />
            <SmallText>0912.xxx.xxx</SmallText>
          </LinkCustom>
          <LinkCustom to="mailto:info@giasuviet.net" isLink={false}>
            <FontAwesomeIcon icon={faEnvelope} />
            <SmallText>info@giasuviet.net</SmallText>
          </LinkCustom>
        </div>
        <div className="flex items-center gap-6">
          {!fullName ? (
            <>
              <LinkCustom to={PUBLIC_ROUTER.LOGIN}>
                <FontAwesomeIcon icon={faUser} />
                <SmallText>Đăng nhập</SmallText>
              </LinkCustom>
              <LinkCustom to={PUBLIC_ROUTER.REGISTER}>
                <FontAwesomeIcon icon={faUserPlus} />
                <SmallText>Đăng ký</SmallText>
              </LinkCustom>
            </>
          ) : (
            <>
              <LinkCustom className="relative" to={PRIVATE_ROUTER.CHAT_BOX}>
                <FontAwesomeIcon icon={faComments} />
                <div className="absolute top-[-4px] right-[-4px] w-[10px] h-[10px] bg-red-600 rounded-full" />
              </LinkCustom>
              <LinkCustom to={PRIVATE_ROUTER.PROFILE}>
                <FontAwesomeIcon icon={faUser} />
                <SmallText>Trang cá nhân</SmallText>
              </LinkCustom>
              <SmallText>
                <div
                  className="text-white cursor-pointer hover:underline"
                  onClick={() => {
                    logOut();
                    checkUserId();
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </div>
              </SmallText>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
