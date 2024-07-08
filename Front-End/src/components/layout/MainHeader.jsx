import React from "react";
import SmallText from "../common/SmallText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkCustom from "../common/LinkCustom";
import {
  faEnvelope,
  faPhone,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "src/context/AuthContext";
import { logOut } from "src/libs/handleLogout";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  const navigate = useNavigate();
  const { fullName, checkUserId } = useAuthContext();
  return (
    <div className="bg-primary">
      <div className="flex justify-between text-white md:max-w-[1168px] 2xl:max-w-[1468px] mx-auto py-2">
        <div className="flex items-center gap-8">
          <LinkCustom to="tel:0365062443" isLink={false}>
            <FontAwesomeIcon icon={faPhone} />
            <SmallText>0365.xxx.xxx</SmallText>
          </LinkCustom>
          <LinkCustom to="mailto:manhlon18@gmail.com " isLink={false}>
            <FontAwesomeIcon icon={faEnvelope} />
            <SmallText>manhlon18@gmail.com</SmallText>
          </LinkCustom>
        </div>
        <div className="flex items-center gap-6">
          {!fullName ? (
            <>
              <LinkCustom to="/dang-nhap">
                <FontAwesomeIcon icon={faUser} />
                <SmallText>Đăng nhập</SmallText>
              </LinkCustom>
              <LinkCustom to="/dang-ky">
                <FontAwesomeIcon icon={faUserPlus} />
                <SmallText>Đăng ký</SmallText>
              </LinkCustom>
            </>
          ) : (
            <>
              <LinkCustom to="/thong-tin-ca-nhan">
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
