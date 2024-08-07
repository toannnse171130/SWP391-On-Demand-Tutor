import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import SmallLine from "../common/SmallLine";
import { Link } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";

function RightPostSection() {
  const { roleId } = useAuthContext();

  return (
    <div className="flex flex-col gap-7">
      {(!Number(roleId) || Number(roleId) === 0) && (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-3 text-sm text-black">
            &ldquo;Bạn đã tham gia đội ngũ Gia Sư của chúng tôi chưa??&ldquo;
          </div>
          <PrimaryBtn className="!w-fit rounded-md text-sm !bg-[#D95350] !border-[#D95350] hover:!bg-red-700 active:!bg-red-700">
            ĐĂNG KÝ LÀM GIA SƯ
          </PrimaryBtn>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-[#666666] py-7">
        <div className="text-base text-yellow">Hãy gọi ngay:</div>
        <div className="text-2xl text-white">0123457...</div>
        <div className="text-base text-yellow">để được hỗ trợ</div>
      </div>
      <div>
        <h5 className="text-primary">Lớp phổ biến</h5>
        <SmallLine className="mt-3" />
        <div className="flex flex-wrap gap-1 mt-5">
          {[
            { id: 1, title: "Đàn guitar" },
            { id: 2, title: "Đàn organ" },
            { id: 3, title: "Tiếng việt" },
          ].map((item) => (
            <ClassItem key={item?.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightPostSection;

function ClassItem({ data }) {
  return (
    <Link
      to={"/"}
      className="px-[10px] py-[5px] border border-[#ddd] text-[#999999] bg-white hover:text-white hover:bg-black smooth-transform"
    >
      {data?.title}
    </Link>
  );
}
