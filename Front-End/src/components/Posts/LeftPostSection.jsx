import React, { useState } from "react";
import PostExploreItem from "./PostExploreItem";
import Pagination from "../common/Pagination";
import PrimaryBtn from "../common/PrimaryBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PrimaryInput from "../common/PrimaryInput";
import FilterDropDown from "../common/FilterDropDown";

function LeftPostSection(props) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [regionSelected, setRegionSelected] = useState(undefined);

  return (
    <div>
      <div className="bg-[#eee] flex justify-between gap-6 items-center px-6 w-full py-2">
        <div className="w-[60%]">
          <PrimaryInput placeholder="Môn học" />
        </div>
        <div className="flex items-center gap-6 w-[40%]">
          <FilterDropDown
            textDefault="Khu vực"
            listDropdown={[1, 2, 3]}
            showing={regionSelected}
            setShowing={setRegionSelected}
          />
          <div>
            <PrimaryBtn
              className="!py-2 rounded-md"
              accessoriesLeft={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            >
              Tìm
            </PrimaryBtn>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        {[1, 2, 3, 4].map((item) => (
          <PostExploreItem key={item} />
        ))}
        <Pagination
          pageSize={limit}
          setPageSize={setLimit}
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={10}
        />
      </div>
    </div>
  );
}

export default LeftPostSection;
