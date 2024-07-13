import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="bg-white ">
      <div className="w-full p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <img
              src="https://www.daykemtainha.vn/public/templates/public/giasu/images/logo-wide-giasu.png"
              alt="logo"
              className="h-[50px] w-full object-contain "
            />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://www.daykemtainha.vn/" className="hover:underline">
            Daynhauhoc
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
