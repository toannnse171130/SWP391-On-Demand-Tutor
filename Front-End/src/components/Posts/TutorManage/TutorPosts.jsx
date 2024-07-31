import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePostDetail, getListTutorPosts } from "src/apis/post-module";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import PopupTemplate from "src/components/common/PopupTemplate";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import SearchInput from "src/components/common/SearchInput";
import ShowDetail from "src/components/common/ShowDetail";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import EditIcon from "src/components/icons/EditIcon";
import GarbageIcon from "src/components/icons/GarbageIcon";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";
import {
  LIST_GENDER_POST,
  LIST_STATUS_POST,
  POST_STATUS,
} from "src/constants/enumConstants";
import useDebounce from "src/hooks/useDebounce";
import { combineStrings, getValueFromKey } from "src/libs";

function TutorPosts() {
  const [searchParam, setSearchParam] = useState("");
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [listPost, setListPost] = useState(undefined);
  const debouncedSearchValue = useDebounce(searchParam, 500);

  useQuery({
    queryKey: [
      "getListPosts",
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
      const response = await getListTutorPosts(queryObj);
      setListPost(response?.data);
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
        <Title>Quản lí bài đăng</Title>
        <Link to={PRIVATE_ROUTER.CREATE_POST}>
          <PrimaryBtn>Tạo bài đăng</PrimaryBtn>
        </Link>
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

export default TutorPosts;

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
        Header: " ",
        accessor: (data) => <RenderActionClassroom data={data} />,
      },
    ],
  },
];

const RenderActionClassroom = ({ data }) => {
  const [isShowPopupDelete, setIsShowPopupDelete] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Link to={`${PRIVATE_ROUTER.MANAGE_POST}/${data?.id}/chinh-sua`}>
        <EditIcon />
      </Link>
      <Link to={`${PRIVATE_ROUTER.MANAGE_POST}/${data?.id}`}>
        <ShowDetail />
      </Link>
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsShowPopupDelete(true);
        }}
      >
        <GarbageIcon />
      </div>
      <PopupTemplate
        setShowDialog={setIsShowPopupDelete}
        showDialog={isShowPopupDelete}
        title="Xóa bài đăng"
        classNameWrapper="md:!min-w-[486px]"
      >
        <DeletePostPopup
          item={data}
          setIsShowPopupDelete={setIsShowPopupDelete}
        />
      </PopupTemplate>
    </div>
  );
};
const TOAST_PROGRESSING = "TOAST_PROGRESS_ID";

function DeletePostPopup({ item, setIsShowPopupDelete }) {
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation(
    async (id) => {
      return await deletePostDetail(id);
    },
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          toast.dismiss(TOAST_PROGRESSING);
          toast.success("Bài viết đã xóa");
          setIsShowPopupDelete(false);
          queryClient.invalidateQueries(["getListPosts"]);
          setIsDelete(false);
        } else {
          toast.dismiss(TOAST_PROGRESSING);
          toast.error(
            combineStrings(data?.response?.data?.errors) ||
              combineStrings(data?.response?.data?.message) ||
              combineStrings(data?.response?.data) ||
              combineStrings(data?.message) ||
              "Oops! Something went wrong..."
          );
          setIsDelete(false);
        }
      },
      onError: (err) => {
        toast.dismiss(TOAST_PROGRESSING);
        toast.error(
          // @ts-ignore
          err?.response?.data?.message || err?.message || "Update error"
        );
        setIsDelete(false);
      },
    }
  );

  const handleClickDelete = () => {
    setIsDelete(true);
    toast.loading("Vui lòng chờ...", {
      toastId: TOAST_PROGRESSING,
    });
    deletePostMutation.mutate(item?.id);
  };

  return (
    <div>
      <div>Bạn có muốn xóa bài đăng có mã {item?.id} này không?</div>
      <div className="mt-5">{item?.shortDescription}</div>
      <div className="flex items-center justify-center mt-5">
        <PrimaryBtn
          disabled={isDelete}
          onClick={handleClickDelete}
          className="max-w-[160px] bg-denied border-denied hover:bg-denied !rounded-md"
        >
          Delete
        </PrimaryBtn>
      </div>
    </div>
  );
}
