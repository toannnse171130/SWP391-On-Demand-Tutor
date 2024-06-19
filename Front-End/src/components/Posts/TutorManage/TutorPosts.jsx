import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterDropDown from "src/components/common/FilterDropDown";
import Pagination from "src/components/common/Pagination";
import PrimaryBtn from "src/components/common/PrimaryBtn";
import SearchInput from "src/components/common/SearchInput";
import ShowDetail from "src/components/common/ShowDetail";
import Table from "src/components/common/Table";
import Title from "src/components/common/Title";
import EditIcon from "src/components/icons/EditIcon";
import GarbageIcon from "src/components/icons/GarbageIcon";
import { PRIVATE_ROUTER } from "src/constants/RouterConstant";

function TutorPosts(props) {
  const [searchParam, setSearchParam] = useState("");
  const [statusSelected, setStatusSelected] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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
          listDropdown={[1, 2, 3]}
          showing={statusSelected}
          setShowing={setStatusSelected}
          className="md:max-w-[220px]"
          textDefault="Chọn"
        />
      </div>
      <div className="bg-white table-style">
        <Table pageSizePagination={limit} columns={columns} data={[1, 2, 3]} />
      </div>

      <Pagination
        pageSize={limit}
        setPageSize={setLimit}
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={10}
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
        Header: "No",
        accessor: (data) => <p>{data?.classId}</p>,
      },
      {
        Header: " ",
        accessor: (data) => <RenderActionClassroom data={data} />,
      },
    ],
  },
];

const RenderActionClassroom = ({ data }) => {
  return (
    <div className="flex items-center gap-3">
      <Link to={`${PRIVATE_ROUTER.MANAGE_POST}/${1}/chinh-sua`}>
        <EditIcon />
      </Link>
      <Link to={`${PRIVATE_ROUTER.MANAGE_POST}/${1}`}>
        <ShowDetail />
      </Link>
      <div className="cursor-pointer">
        <GarbageIcon />
      </div>
    </div>
  );
};
