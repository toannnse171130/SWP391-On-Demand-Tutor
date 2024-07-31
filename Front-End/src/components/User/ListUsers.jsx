import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import SearchInput from "../common/SearchInput";
import useDebounce from "src/hooks/useDebounce";
import FilterDropDown from "../common/FilterDropDown";
import { LIST_STATUS_USER } from "src/constants/enumConstants";
import Pagination from "../common/Pagination";
import Table from "../common/Table";
import { changeUserDetail, getListUser } from "src/apis/account-module";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { combineStrings, getValueFromKey } from "src/libs";
import { LIST_GENDER_VALUE, LIST_ROLE_VALUE } from "src/constants/constants";
import { format } from "date-fns";
import ShowDetail from "../common/ShowDetail";
import SecondaryBtn from "../common/SecondaryBtn";
import PopupTemplate from "../common/PopupTemplate";
import PrimaryInput from "../common/PrimaryInput";
import PrimaryTextArea from "../common/PrimaryTextArea";
import PrimaryBtn from "../common/PrimaryBtn";
import { toast } from "react-toastify";

function ListUsers() {
  const [searchParam, setSearchParam] = useState("");
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listUsers, setListUsers] = useState(undefined);
  const debouncedSearchValue = useDebounce(searchParam, 500);

  useQuery({
    queryKey: [
      "getAdminUsers",
      page,
      limit,
      debouncedSearchValue,
      statusSelected,
    ],
    queryFn: async () => {
      const queryObj = {
        pageIndex: page,
        pageSize: limit,
      };
      if (statusSelected?.key) {
        queryObj.status = statusSelected?.key;
      }
      if (debouncedSearchValue) {
        queryObj.textSearch = debouncedSearchValue;
      }
      const response = await getListUser(queryObj);
      setListUsers(response?.data);
      return response?.data;
    },
  });

  useEffect(() => {
    if (debouncedSearchValue || statusSelected?.key) {
      setPage(1);
      setLimit(10);
    }
  }, [debouncedSearchValue, statusSelected?.key]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Title>Quản lí người dùng</Title>
      </div>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Tìm kiếm bởi tên và mã"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={LIST_STATUS_USER}
          showing={statusSelected}
          setShowing={setStatusSelected}
          className="md:max-w-[280px]"
          textDefault="Lọc trạng thái"
        />
      </div>
      <div className="bg-white table-style">
        {listUsers?.items && (
          <Table
            pageSizePagination={limit}
            columns={columns}
            data={listUsers?.items || []}
          />
        )}
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listUsers?.totalItems}
      />
    </div>
  );
}

export default ListUsers;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "Mã",
        accessor: (data) => <p>{data?.id}</p>,
      },
      {
        Header: "Email",
        accessor: (data) => <p>{data?.email || "---"}</p>,
      },
      {
        Header: "Họ tên",
        accessor: (data) => <p>{data?.fullName || "---"}</p>,
      },
      {
        Header: "Chức vụ",
        accessor: (data) => (
          <p>
            {data?.roleId
              ? getValueFromKey(data?.roleId, LIST_ROLE_VALUE)?.name
              : "---"}
          </p>
        ),
      },
      {
        Header: "Giới tính",
        accessor: (data) => (
          <p>
            {data?.gender
              ? getValueFromKey(data?.gender, LIST_GENDER_VALUE)?.name
              : "---"}
          </p>
        ),
      },
      {
        Header: "Ngày sinh",
        accessor: (data) => (
          <p>{data?.dob ? format(new Date(data?.dob), "dd/MM/yyyy") : "---"}</p>
        ),
      },
      {
        Header: "SĐT",
        accessor: (data) => <p>{data?.phone}</p>,
      },
      {
        Header: "Trạng thái",
        accessor: (data) => (
          <p
            className={`p-2 rounded-md w-fit ${
              data?.isActive && "border border-primary text-primary"
            } 
          ${!data?.isActive && "border border-denied text-denied"}
          `}
          >
            {getValueFromKey(data?.isActive, LIST_STATUS_USER, "key")?.value ||
              "---"}
          </p>
        ),
      },
      {
        Header: " ",
        accessor: (data) => <RenderActionUser data={data} />,
      },
    ],
  },
];

const RenderActionUser = ({ data }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <div
        className="w-fit"
        onClick={() => {
          setIsShow(true);
        }}
      >
        <ShowDetail />
      </div>
      <PopupTemplate
        setShowDialog={setIsShow}
        showDialog={isShow}
        title="Chi tiết người dùng"
        classNameWrapper="md:!min-w-[586px]"
      >
        <UserDetailPopup item={data} setIsShow={setIsShow} />
      </PopupTemplate>
    </div>
  );
};
const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function UserDetailPopup({ item, setIsShow }) {
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [isProgressing, setIsProgressing] = useState(false);

  const queryClient = useQueryClient();
  const changeUserDetailMutation = useMutation(
    async (data) => {
      return await changeUserDetail(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Cập nhật trạng thái thành công");
          setIsProgressing(false);
          queryClient.invalidateQueries(["getAdminUsers"]);
          setIsShow(false);
        } else {
          toast.dismiss(TOAST_PROGRESSING);
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsProgressing(false);
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsProgressing(false);
      },
    }
  );

  const handleUpdateUser = () => {
    setIsProgressing(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    const queryObj = {
      id: item?.id,
      isActive: statusSelected?.key,
    };
    // @ts-ignore
    changeUserDetailMutation.mutate(queryObj);
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <PrimaryInput
            className="w-full"
            title={
              <p>
                Họ và tên <span className="text-red-500">*</span>
              </p>
            }
            placeholder="Enter first name"
            value={item?.fullName ? item?.fullName : "---"}
            readOnly
          />
          <FilterDropDown
            className="!w-[180px] whitespace-nowrap"
            title={
              <div>
                Trạng thái <span className="text-denied">*</span>
              </div>
            }
            listDropdown={LIST_STATUS_USER}
            showing={statusSelected}
            setShowing={setStatusSelected}
            textDefault={
              getValueFromKey(item?.isActive, LIST_STATUS_USER, "key")?.value ||
              "---"
            }
          />
        </div>
        <div className="grid items-center grid-cols-2 gap-4">
          <PrimaryInput
            title="Giới tính"
            value={item?.gender ? "Nam" : "Nữ"}
            readOnly
          />
          <PrimaryInput
            title="Ngày sinh"
            value={
              item?.dob ? format(new Date(item?.dob), "dd-MM-yyyy") : "---"
            }
            readOnly
          />
        </div>
        <PrimaryInput
          title="Số điện thoại"
          placeholder="Enter phone number"
          value={item?.phone ? item?.phone : "---"}
          readOnly
        />
        <PrimaryTextArea
          title="Mô tả"
          rows={4}
          placeholder="Nhập mô tả"
          value={item?.desciption ? item?.desciption : "---"}
          readOnly
        />
      </div>
      <div className="flex items-center justify-end gap-5 mt-3">
        <PrimaryBtn
          disabled={isProgressing || !statusSelected}
          onClick={handleUpdateUser}
          className="!rounded-md w-[120px]"
        >
          Cập nhật
        </PrimaryBtn>
        <SecondaryBtn
          onClick={() => {
            setIsShow(false);
          }}
          className="!rounded-md w-[120px]"
        >
          Đóng
        </SecondaryBtn>
      </div>
    </div>
  );
}
