import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePostStatusDetail,
  getListAdminPosts,
} from "src/apis/post-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import SearchInput from "src/components/common/SearchInput";
import SecondaryBtn from "src/components/common/SecondaryBtn";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import { ADMIN_ROUTER } from "src/constants/RouterConstant";
import {
  LIST_GENDER_POST,
  LIST_STATUS_POST,
  POST_STATUS,
} from "src/constants/enumConstants";
import useDebounce from "src/hooks/useDebounce";
import { combineStrings, getValueFromKey } from "src/libs";

function ListPosts() {
  const [searchParam, setSearchParam] = useState("");
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listPost, setListPost] = useState(undefined);
  const debouncedSearchValue = useDebounce(searchParam, 500);

  useQuery({
    queryKey: [
      "getAdminPost",
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
      const response = await getListAdminPosts(queryObj);
      setListPost(response?.data);
      return response?.data;
    },
  });
  useEffect(() => {
    if (statusSelected || debouncedSearchValue) {
      setPage(1);
      setLimit(10);
    }
  }, [debouncedSearchValue, statusSelected]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Title>Quản lí bài đăng</Title>
      </div>
      <div className="flex flex-col gap-4 py-5 md:items-center md:flex-row md:justify-end">
        <SearchInput
          placeholder="Tìm kiếm bởi tên và mã"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam || ""}
        />
        <FilterDropDown
          listDropdown={LIST_STATUS_POST}
          showing={statusSelected}
          setShowing={setStatusSelected}
          className="md:max-w-[280px]"
          textDefault="Lọc trạng thái"
        />
      </div>
      <div className="bg-white table-style">
        {listPost?.items && (
          <Table
            pageSizePagination={limit}
            columns={columns}
            data={listPost?.items || []}
          />
        )}
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={listPost?.totalItems}
      />
    </div>
  );
}

export default ListPosts;

const columns = [
  {
    Header: " ",
    columns: [
      {
        Header: "Mã",
        accessor: (data) => <p>{data?.id}</p>,
      },
      {
        Header: "Mô tả",
        accessor: (data) => (
          <p className="max-w-[200px] text-truncate">
            {data?.shortDescription}
          </p>
        ),
      },
      {
        Header: "SĐT liên hệ",
        accessor: (data) => <p>{data?.contactPhone}</p>,
      },
      {
        Header: "Địa điểm dạy",
        accessor: (data) => <p>{data?.studyAddress}</p>,
      },
      {
        Header: "Giới tính học viên",
        accessor: (data) => (
          <p>
            {data?.studentGender
              ? getValueFromKey(data?.studentGender, LIST_GENDER_POST, "key")
                  ?.value
              : "---"}
          </p>
        ),
      },
      {
        Header: "Học phí",
        accessor: (data) => (
          <p>{new BigNumber(data?.fee || 0).toFormat()}đ/ Buổi</p>
        ),
      },
      {
        Header: "Trạng thái",
        accessor: (data) => (
          <p
            className={`p-2 rounded-md w-fit ${
              data?.status === POST_STATUS.APPROVED &&
              "border border-primary text-primary"
            } 
            ${
              data?.status === POST_STATUS.PENDING &&
              "border border-pending text-pending"
            }
            ${
              data?.status === POST_STATUS.REJECTED &&
              "border border-denied text-denied"
            }
            `}
          >
            {data?.status
              ? getValueFromKey(data?.status, LIST_STATUS_POST, "key")?.value
              : "---"}
          </p>
        ),
      },
      {
        Header: "Hành động",
        accessor: (data) => <RenderActionClassroom data={data} />,
      },
    ],
  },
];

const RenderActionClassroom = ({ data }) => {
  const [isShowPopupApprove, setIsShowPopupApprove] = useState(false);
  const [isShowPopupReject, setIsShowPopupReject] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <SecondaryBtn
        className="!w-fit whitespace-nowrap !px-3"
        onClick={() => {
          setIsShowPopupApprove(true);
        }}
      >
        Chấp thuận
      </SecondaryBtn>
      <PrimaryBtn
        onClick={() => {
          setIsShowPopupReject(true);
        }}
        className="active:!bg-[#DC354535] whitespace-nowrap !w-fit bg-transparent border !border-denied !px-3 hover:bg-[#DC354515] !text-denied !rounded-md"
      >
        Từ chối
      </PrimaryBtn>
      <Link to={`${ADMIN_ROUTER.MANAGE_POST}/${data?.id}`}>
        <PrimaryBtn className="block !w-fit !rounded-md whitespace-nowrap !px-3">
          Xem
        </PrimaryBtn>
      </Link>
      <PopupTemplate
        setShowDialog={setIsShowPopupApprove}
        showDialog={isShowPopupApprove}
        title="Duyệt bài đăng"
        classNameWrapper="md:!min-w-[486px]"
      >
        <ApprovePostPopup item={data} setShowing={setIsShowPopupApprove} />
      </PopupTemplate>
      <PopupTemplate
        setShowDialog={setIsShowPopupReject}
        showDialog={isShowPopupReject}
        title="Duyệt bài đăng"
        classNameWrapper="md:!min-w-[486px]"
      >
        <RejectPostPopup item={data} setShowing={setIsShowPopupReject} />
      </PopupTemplate>
    </div>
  );
};
const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function RejectPostPopup({ item, setShowing }) {
  const [isProgress, setIsProgress] = useState(false);
  const queryClient = useQueryClient();

  const approvePostMutation = useMutation(
    async (data) => {
      return await changePostStatusDetail(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Từ chối bài thành công");
          setShowing(false);
          queryClient.invalidateQueries(["getAdminPost"]);
          setIsProgress(false);
        } else {
          toast.dismiss(TOAST_PROGRESSING);
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsProgress(false);
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsProgress(false);
      },
    }
  );

  const handleClickSubmit = () => {
    setIsProgress(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    const submitObj = {
      id: item?.id,
      status: POST_STATUS.APPROVED,
    };
    // @ts-ignore
    approvePostMutation.mutate(submitObj);
  };

  return (
    <div>
      <div>Bạn có muốn từ chối bài đăng có mã {item?.id} này không?</div>
      <div className="mt-5">{item?.shortDescription}</div>
      <div className="flex items-center w-full gap-5 mt-5">
        <PrimaryBtn
          disabled={isProgress}
          onClick={handleClickSubmit}
          className="whitespace-nowrap !bg-denied border !border-denied !px-3 hover:bg-[#DC354515] !text-white !rounded-md"
        >
          Từ chối
        </PrimaryBtn>
        <SecondaryBtn
          onClick={() => {
            setShowing(false);
          }}
          className="!rounded-md"
        >
          Đóng
        </SecondaryBtn>
      </div>
    </div>
  );
}

function ApprovePostPopup({ item, setShowing }) {
  const [isProgress, setIsProgress] = useState(false);
  const queryClient = useQueryClient();

  const approvePostMutation = useMutation(
    async (data) => {
      return await changePostStatusDetail(data);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Duyệt bài thành công");
          setShowing(false);
          queryClient.invalidateQueries(["getAdminPost"]);
          setIsProgress(false);
        } else {
          toast.dismiss(TOAST_PROGRESSING);
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsProgress(false);
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsProgress(false);
      },
    }
  );

  const handleClickSubmit = () => {
    setIsProgress(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    const submitObj = {
      id: item?.id,
      status: POST_STATUS.APPROVED,
    };
    // @ts-ignore
    approvePostMutation.mutate(submitObj);
  };

  return (
    <div>
      <div>Bạn có muốn chấp nhận đăng bài có mã {item?.id} này không?</div>
      <div className="mt-5">{item?.shortDescription}</div>
      <div className="flex items-center w-full gap-5 mt-5">
        <PrimaryBtn
          disabled={isProgress}
          onClick={handleClickSubmit}
          className="!rounded-md"
        >
          Chấp thuận
        </PrimaryBtn>
        <SecondaryBtn
          onClick={() => {
            setShowing(false);
          }}
          className="!rounded-md"
        >
          Đóng
        </SecondaryBtn>
      </div>
    </div>
  );
}
