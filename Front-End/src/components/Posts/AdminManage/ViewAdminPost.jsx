import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { format } from "date-fns";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getAdminPostDetail, getTutorPostDetail } from "src/apis/post-module";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallLine from "src/components/common/SmallLine";
import Title from "src/components/common/Title";
import {
  DAYS_OF_WEEK,
  LIST_GENDER_POST,
  LIST_TYPE_OF_FEE,
} from "src/constants/enumConstants";
import { getValueFromKey } from "src/libs";

function ViewAdminPost() {
  const [postDetail, setPostDetail] = useState(undefined);
  const { id } = useParams();

  useQuery({
    queryKey: ["getAdminPostDetail", id],
    queryFn: async () => {
      const response = await getAdminPostDetail(id);
      setPostDetail(response?.data);
      return response?.data;
    },
    enabled: !!id,
  });

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <Title>Xem lại bài đăng</Title>
      </div>
      <SmallLine className="my-2" />
      <div className="flex flex-col gap-3 mt-5">
        <PrimaryInput
          title={
            <div>
              Số điện thoại liên hệ <span className="text-dangerous">*</span>
            </div>
          }
          placeholder="Ví dụ: 0912******"
          className="max-w-[400px]"
          value={postDetail?.contactPhone || "---"}
          readOnly
        />
        <PrimaryInput
          title={
            <div>
              Mô tả tuyển sinh (Tối đa 20 từ){" "}
              <span className="text-dangerous">*</span>
            </div>
          }
          value={postDetail?.shortDescription || "---"}
          readOnly
        />
        <div className="flex items-center gap-5">
          <PrimaryInput
            title={
              <div>
                Địa điểm dạy
                <span className="text-dangerous">*</span>
              </div>
            }
            value={postDetail?.studyAddress || "---"}
            readOnly
            className="w-[400px]"
          />
          <PrimaryInput
            title={
              <div>
                Số học viên
                <span className="text-dangerous">*</span>
              </div>
            }
            value={postDetail?.numberOfStudent || "---"}
            readOnly
            className="w-[100px]"
          />
          <PrimaryInput
            title={
              <div>
                Ngày bắt đầu
                <span className="text-dangerous">*</span>
              </div>
            }
            type="date"
            className="w-[160px]"
            value={
              postDetail?.startDate
                ? format(new Date(postDetail?.startDate), "yyyy-MM-dd")
                : ""
            }
            readOnly
          />
          <div>
            <div className="mb-2 text-sm font-bold text-black">
              Giờ mỗi buổi <span className="text-dangerous">*</span>
            </div>
            <PrimaryInput
              className="!w-[170px]"
              value={postDetail?.studyHour || "---"}
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <PrimaryInput
            title={
              <div>
                Môn học
                <span className="text-dangerous">*</span>
              </div>
            }
            className="w-[!400px]"
            value={postDetail?.subject || "---"}
            readOnly
          />
          <div>
            <div className="mb-2 text-sm font-bold text-black">
              Giới tính học viên
            </div>
            <div
              className={`text-center px-6 text-base py-2 rounded-sm border text-black bg-[#7F7F7F15] capitalize`}
            >
              {postDetail?.studentGender
                ? getValueFromKey(
                    postDetail?.studentGender,
                    LIST_GENDER_POST,
                    "key"
                  )?.value
                : "---"}
            </div>
          </div>
          <PrimaryInput
            title={
              <div>
                Học phí
                <span className="text-dangerous">*</span>
              </div>
            }
            className="w-[200px]"
            value={`${new BigNumber(postDetail?.fee || 0).toFormat()} đ`}
            accessoriesRight={"/buổi"}
            readOnly
          />
          <PrimaryInput
            title={"Cách trả phí"}
            className="!w-[170px]"
            value={
              postDetail?.typeOfFee
                ? getValueFromKey(
                    postDetail?.typeOfFee,
                    LIST_TYPE_OF_FEE,
                    "key"
                  )?.value
                : "---"
            }
            readOnly
          />
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm font-bold text-black">
            Thời gian có thể học <span className="text-red-500">*</span>
          </div>
          {postDetail?.studyTimes?.map((item) => (
            <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
              <div>Từ {item?.from}</div>
              <div>Đến {item?.to}</div>
              <div>
                Vào{" "}
                {item?.dayOfWeek
                  ? getValueFromKey(item?.dayOfWeek, DAYS_OF_WEEK, "value")
                      ?.label
                  : "---"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAdminPost;
