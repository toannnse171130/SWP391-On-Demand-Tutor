import React, { useEffect, useState } from "react";
import PostExploreItem from "./PostExploreItem";
import Pagination from "../common/Pagination";
import PrimaryInput from "../common/PrimaryInput";
import { useQuery } from "@tanstack/react-query";
import { getListPosts } from "src/apis/post-module";
import useDebounce from "src/hooks/useDebounce";
import { LIST_REGION } from "src/constants/constants";
import SearchFilterDropDown from "../common/SearchFilterDropDown";
import PrimaryBtn from "../common/PrimaryBtn";
import XIcon from "../icons/XIcon";

function LeftPostSection() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [regionSelected, setRegionSelected] = useState(undefined);
  const [listPost, setListPost] = useState(undefined);
  const [searchParams, setSearchParams] = useState("");
  const debouncedSearchValue = useDebounce(searchParams, 500);

  useQuery({
    queryKey: [
      "getListPosts",
      page,
      limit,
      debouncedSearchValue,
      regionSelected?.value,
    ],
    queryFn: async () => {
      const queryObj = {
        pageIndex: page,
        pageSize: limit,
      };
      if (debouncedSearchValue) {
        queryObj.textSearch = debouncedSearchValue;
      }
      if (regionSelected?.value) {
        queryObj.addressSearch = regionSelected?.value;
      }
      const response = await getListPosts(queryObj);
      setListPost(response?.data);
      return response?.data;
    },
  });

  useEffect(() => {
    if (debouncedSearchValue || regionSelected?.value) {
      setPage(1);
      setLimit(10);
    }
  }, [debouncedSearchValue, regionSelected?.value]);

  return (
    <div>
      <div className="bg-[#eee] flex justify-between gap-6 items-center px-6 w-full py-2">
        <div className="w-[60%]">
          <PrimaryInput
            placeholder="Môn học"
            value={searchParams || ""}
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-6 w-[40%]">
          <SearchFilterDropDown
            textDefault="Khu vực"
            listDropdown={LIST_REGION}
            showing={regionSelected}
            setShowing={setRegionSelected}
          />
          <PrimaryBtn
            onClick={() => {
              setSearchParams("");
              setRegionSelected(null);
            }}
            className="active:!bg-[#DC354535] whitespace-nowrap !w-fit bg-transparent border !border-denied !px-3 hover:bg-[#DC354515] !text-denied !rounded-md !h-[46px] focus:!bg-[#DC354515]"
            accessoriesLeft={<XIcon />}
          >
            Xóa bộ lọc
          </PrimaryBtn>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        {listPost?.items?.map((item) => (
          <PostExploreItem key={item?.id} data={item} />
        ))}
        {listPost?.items?.length === 0 && (
          <div className="text-gray">Không có dữ liệu</div>
        )}
        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={listPost?.totalItems}
        />
      </div>
    </div>
  );
}

export default LeftPostSection;
