import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import PrimaryInput from "../common/PrimaryInput";
import { getListTutors } from "src/apis/tutor-module";
import TutorExploreItem from "./TutorExploreItem";
import Pagination from "../common/Pagination";

function ListAllTutors() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [listTutors, setListTutors] = useState(undefined);
  const [searchParams, setSearchParams] = useState("");
  const debouncedSearchValue = useDebounce(searchParams, 500);

  useQuery({
    queryKey: ["getListTutors", page, limit, debouncedSearchValue],
    queryFn: async () => {
      const queryObj = {
        pageIndex: page,
        pageSize: limit,
      };
      if (debouncedSearchValue) {
        queryObj.textSearch = debouncedSearchValue;
      }
      const response = await getListTutors(queryObj);
      setListTutors(response?.data);
      return response?.data;
    },
  });

  useEffect(() => {
    if (debouncedSearchValue) {
      setPage(1);
      setLimit(10);
    }
  }, [debouncedSearchValue]);

  return (
    <div>
      <div className="bg-[#eee] flex justify-between gap-6 items-center px-6 w-full py-2">
        <PrimaryInput
          placeholder="Tên và môn học"
          value={searchParams || ""}
          onChange={(e) => setSearchParams(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {listTutors?.items?.map((item) => (
            <TutorExploreItem key={item?.id} data={item} />
          ))}
        </div>
        {listTutors?.items?.length === 0 && (
          <div className="text-gray">Không có dữ liệu</div>
        )}
        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={listTutors?.totalItems}
        />
      </div>
    </div>
  );
}

export default ListAllTutors;
