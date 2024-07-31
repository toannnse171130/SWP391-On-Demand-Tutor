import React from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinkButton from "../common/NavLinkButton";
import Footer from "./Footer";
import {
  ADMIN_ROUTER,
  PRIVATE_ROUTER,
  PUBLIC_ROUTER,
} from "src/constants/RouterConstant";
import { useAuthContext } from "src/context/AuthContext";
import { LIST_ROLE_KEY } from "src/constants/enumConstants";

function Layout(props) {
  const { isHomePage = false } = props;
  const { roleId } = useAuthContext();
  return (
    <div>
      <div className="sticky top-0 left-0 right-0 z-10 bg-white bottom-shadow-main">
        <MainHeader />
        <div className="md:max-w-[1168px] 2xl:max-w-[1468px] mx-auto py-4">
          <div className="flex justify-start">
            <Link to="/" className="py-[10px]">
              <img
                src="https://www.daykemtainha.vn/public/templates/public/giasu/images/logo-wide-giasu.png"
                alt="logo"
                className="h-[50px] w-full object-contain "
              />
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <NavLinkButton className="!text-white !bg-primary" to="/">
              Trang chủ
            </NavLinkButton>
            <NavLinkButton className="!gap-2" to={PUBLIC_ROUTER.POST}>
              <div>Bài viết mới</div>
              <div className="px-1 py-[1px] text-xs text-white bg-red-500 rounded-md">
                Hot
              </div>
            </NavLinkButton>
            <NavLinkButton to={PUBLIC_ROUTER.TUTOR}>Gia sư</NavLinkButton>
            {/* Tutor section  */}
            {Number(roleId) === LIST_ROLE_KEY.TUTOR && (
              <>
                <NavLinkButton to={PRIVATE_ROUTER.CREATE_POST}>
                  Tạo bài đăng
                </NavLinkButton>
                <NavLinkButton to={PRIVATE_ROUTER.MANAGE_POST}>
                  Quản lí bài viết
                </NavLinkButton>
              </>
            )}
            {Number(roleId) === LIST_ROLE_KEY.ADMIN && (
              <>
                <NavLinkButton to={ADMIN_ROUTER.MANAGE_POST}>
                  Quản lí bài viết
                </NavLinkButton>
                <NavLinkButton to={ADMIN_ROUTER.MANAGE_USER}>
                  Quản lí người dùngg
                </NavLinkButton>
              </>
            )}
            <NavLinkButton to="/">Liên hệ</NavLinkButton>
          </div>
        </div>
      </div>
      <div className={!isHomePage && "pt-5 pb-10 md:max-w-[1170px] mx-auto"}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
