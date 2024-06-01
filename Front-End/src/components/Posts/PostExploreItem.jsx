import {
  faAnglesRight,
  faBook,
  faLocationDot,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BigNumber from "bignumber.js";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryBtn from "../common/PrimaryBtn";
import { format } from "date-fns";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import SmallLine from "../common/SmallLine";

function PostExploreItem() {
  return (
    <div className="px-4 pt-3 pb-5 bg-white border-dashed hover:bg-[#eee] smooth-transform border-b-[#ddd] border-b-[1px]">
      <h3 className="text-black">
        Cần Gia Sư Môn Bóng Chuyền Tại Đông Anh, Hà Nội
      </h3>
      <div className="flex items-center mt-2">
        <div className="text-[#808080] font-medium text-base">Mã lớp: 2211</div>
        <div className="w-[50px]">
          <div className="slide-ltr">
            <FontAwesomeIcon icon={faAnglesRight} className="opacity-20" />
          </div>
        </div>
        <Link className="text-brown hover:underline smooth-transform" to={"/"}>
          Xem thêm
        </Link>
      </div>
      <SmallLine className="mt-3" />
      <div className="flex items-center justify-between mt-2">
        <h4 className="">
          Học phí :{" "}
          <span className="text-2xl text-primary">
            {new BigNumber(250000).toFormat()}/ Buổi
          </span>
        </h4>
        <PrimaryBtn className="!w-fit rounded-md">
          phí: <span className="font-semibold">25% (750,000)</span>{" "}
          <span className="font-medium text-yellow">Nhận lớp ngay</span>
        </PrimaryBtn>
      </div>
      <div className="px-4 py-2 mt-3 border-dashed border-[#ddd] border-[2px]">
        học sinh lớp 9, học để luyển thi vào lớp 10 trường Lê Quý Đôn
      </div>
      <div className="grid items-center grid-cols-3 gap-3 mt-3">
        <DetailItem
          icon={<FontAwesomeIcon icon={faClock} color="#a94442" size="xs" />}
          title="Tạo lúc: "
          description={format(new Date(), "HH:mm dd.MM.yyyy")}
        />
        <DetailItem
          icon={
            <FontAwesomeIcon icon={faMarsAndVenus} color="#a94442" size="xs" />
          }
          title="Yêu cầu gia sư: "
          description={"(nam/nữ) Giáo viên"}
        />
        <DetailItem
          icon={
            <FontAwesomeIcon icon={faMarsAndVenus} color="#a94442" size="xs" />
          }
          title="2 buổi"
          description={"(60 phút/ buổi)"}
        />
      </div>
      <DetailItem
        icon={<FontAwesomeIcon icon={faUser} color="#a94442" size="xs" />}
        title="2"
        description={" học viên (nữ)"}
      />
      <DetailItem
        icon={
          <FontAwesomeIcon icon={faLocationDot} color="#a94442" size="xs" />
        }
        title="Địa điểm dạy: "
        description={"Phố Lò Đúc, Phạm Đình Hổ, Hai Bà Trưng, Hà Nội"}
      />
      <DetailItem
        icon={<FontAwesomeIcon icon={faBook} color="#a94442" size="xs" />}
        title="Môn học: "
        description={"Đàn Guitar"}
      />
    </div>
  );
}

export default PostExploreItem;

function DetailItem({ icon = null, title = "", description = "" }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <div className="text-base font-semibold">
        {title} <span className="font-light">{description}</span>
      </div>
    </div>
  );
}
