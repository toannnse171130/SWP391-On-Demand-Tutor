import React, { useState } from "react";
import { toast } from "react-toastify";
import FilterDropDown from "src/components/common/FilterDropDown";
import PrimaryInput from "src/components/common/PrimaryInput";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import SmallLine from "src/components/common/SmallLine";
import SubMenu from "src/components/common/SubMenu";
import AddPlusIcon from "src/components/icons/AddPlusIcon";
import GarbageIcon from "src/components/icons/GarbageIcon";
import Layout from "src/components/layout/Layout";
import { DAYS_OF_WEEK } from "src/constants/enumConstants";

function CreatePostPage(props) {
  const [genderSelected, setGenderSelected] = useState(undefined);
  const [sessionStart, setSessionStart] = useState("");
  const [listLevels, setListLevels] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(undefined);

  const handleAddNewLevel = () => {
    if (sessionStart && dayOfWeek) {
      setListLevels([
        ...listLevels,
        {
          sessionStart: sessionStart,
          dayOfWeek: dayOfWeek?.key,
          dayValue: dayOfWeek?.value,
          status: "CREATED",
        },
      ]);
      setSessionStart("");
      setDayOfWeek(undefined);
    }
  };

  return (
    <Layout>
      <h3>Mô tả yêu cầu về lớp</h3>
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
          <div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreatePostPage;

function AdditionLevelRow({
  handleAddNewLevel,
  sessionStart,
  setSessionStart,
  dayOfWeek,
  setDayOfWeek,
  scheduleNumber,
}) {
  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Lịch {scheduleNumber}:</h1>
        <FilterDropDown
          textDefault="Chọn ngày"
          className="!w-[200px]"
          listDropdown={DAYS_OF_WEEK}
          showing={dayOfWeek}
          setShowing={setDayOfWeek}
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Giờ bắt đầu</p>
        <input
          type="time"
          value={sessionStart || ""}
          onChange={(e) => {
            setSessionStart(e.target.value);
          }}
        />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <SecondaryBtn
          className="!w-10 !h-10 !px-0 !py-0 rounded"
          onClick={handleAddNewLevel}
        >
          <AddPlusIcon />
        </SecondaryBtn>
      </div>
    </div>
  );
}

function TableLevelRow({ data, listLevels, setListLevels, itemIndex }) {
  const handleRemoveLevel = () => {
    const listRemove = listLevels.filter((i, index) => index !== itemIndex);
    setListLevels(listRemove);
  };

  return (
    <div className="grid items-end gap-3 mt-3 grid-cols-3530305">
      <div className="flex items-center gap-3">
        <h1>Lịch {itemIndex + 1}:</h1>
        <FilterDropDown
          textDefault={data?.dayValue}
          className="!w-[200px]"
          listDropdown={DAYS_OF_WEEK}
          showing={undefined}
          setShowing={undefined}
          disabled
        />
      </div>
      <div className="flex items-center gap-3">
        <p>Giờ bắt đầu</p>
        <input type="time" value={data?.sessionStart || ""} readOnly />
      </div>
      <div className="h-[46px] flex items-center justify-center cursor-pointer">
        <div onClick={handleRemoveLevel}>
          <GarbageIcon />
        </div>
      </div>
    </div>
  );
}
