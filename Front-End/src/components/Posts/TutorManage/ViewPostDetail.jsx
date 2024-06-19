import React, { useState } from "react";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryInput from "src/components/common/PrimaryInput";
import SmallLine from "src/components/common/SmallLine";
import SubMenu from "src/components/common/SubMenu";
import Title from "src/components/common/Title";

function ViewPostDetail() {
  const [genderSelected, setGenderSelected] = useState(undefined);
  return (
    <div>
      <Title>Xem lại bài đăng</Title>
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
          value={"---"}
          readOnly
        />
        <PrimaryInput
          title={
            <div>
              Mô tả tuyển sinh (Tối đa 20 từ){" "}
              <span className="text-dangerous">*</span>
            </div>
          }
          placeholder="Ví dụ: 0912******"
        />
        <div className="flex items-center gap-5">
          <PrimaryInput
            title={
              <div>
                Địa điểm dạy
                <span className="text-dangerous">*</span>
              </div>
            }
            placeholder="Ví dụ: 0912******"
            className="w-[400px]"
          />
          <PrimaryInput
            title={
              <div>
                Số học viên
                <span className="text-dangerous">*</span>
              </div>
            }
            placeholder=""
            className="w-[100px]"
          />
          <PrimaryInput
            title={
              <div>
                Ngày bắt đầu
                <span className="text-dangerous">*</span>
              </div>
            }
            placeholder=""
            className="w-[100px]"
          />
          <FilterDropDown
            title={
              <div>
                Giờ mỗi buổi
                <span className="text-dangerous">*</span>
              </div>
            }
            className="!w-[170px]"
            listDropdown={[1, 2]}
            showing={undefined}
            setShowing={undefined}
          />
        </div>
        <div className="flex items-center gap-5">
          <FilterDropDown
            title={
              <div>
                Môn học
                <span className="text-dangerous">*</span>
              </div>
            }
            className="!w-[400px]"
            listDropdown={[1, 2]}
            showing={undefined}
            setShowing={undefined}
          />
          <div>
            <div className="mb-2 text-sm font-bold text-black">
              Giới tính học viên
            </div>
            <SubMenu
              activeTab={genderSelected}
              setActiveTab={setGenderSelected}
              listMenu={[
                { id: 1, name: "Nam" },
                { id: 2, name: "Nữ" },
                { id: 3, name: "Cả Nam và Nữ" },
              ]}
            />
          </div>
          <PrimaryInput
            title={
              <div>
                Học phí
                <span className="text-dangerous">*</span>
              </div>
            }
            placeholder="Học phí 1 buổi"
            className="w-[200px]"
          />
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm font-bold text-black">
            Thời gian có thể học <span className="text-red-500">*</span>
          </div>
          {/* <div>
            {listLevels?.length > 0 && (
              <div className="max-h-[276px] overflow-y-auto my-2">
                {listLevels.map((i, index) => (
                  <TableLevelRow
                    key={`level-row-${index}`}
                    data={i}
                    itemIndex={index}
                    listLevels={listLevels}
                    setListLevels={setListLevels}
                  />
                ))}
              </div>
            )}
            <AdditionLevelRow
              handleAddNewLevel={handleAddNewLevel}
              sessionStart={sessionStart}
              setSessionStart={setSessionStart}
              dayOfWeek={dayOfWeek}
              setDayOfWeek={setDayOfWeek}
              scheduleNumber={listLevels?.length + 1}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ViewPostDetail;
