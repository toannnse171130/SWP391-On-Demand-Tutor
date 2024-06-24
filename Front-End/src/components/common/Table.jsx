// @ts-nocheck
import React from "react";
import { useTable, usePagination } from "react-table";
import PaginationRight from "../icons/PaginationRight";
import PaginationLeft from "../icons/PaginationLeft";

function Table({
  columns,
  data = [],
  fetchData = (d) => console.log("no fetchData { pageIndex, pageSize }", d),
  pageCount: controlledPageCount = 1,
  pageSizePagination,
  headerTextAlignRight = [],
  headerTextAlignCenter = [],
  isAuto = false,
}) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pageSizePagination },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    usePagination
  );

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  const firstPageRows = rows.slice(0, pageSizePagination);

  return (
    <div className={`w-full ${isAuto ? "overflow-auto" : "overflow-hidden"}`}>
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                return (
                  <td
                    key={index}
                    className={`${
                      headerTextAlignRight.includes(column?.Header)
                        ? "text-right"
                        : headerTextAlignCenter.includes(column.Header)
                        ? "text-center"
                        : ""
                    }`}
                  >
                    {column.render("Header")}
                  </td>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {firstPageRows.map((row, i) => {
            let className = "odd";
            if (i % 2 === 0) {
              className = "even";
            }
            return (
              prepareRow(row) || (
                <tr key={i} className={className} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        className={`${
                          headerTextAlignRight.includes(cell.column.Header)
                            ? "text-right"
                            : ""
                        }`}
                        data-label={cell.column.Header}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              )
            );
          })}

          {page.length < 1 && (
            <tr className="odd">
              <td colSpan={100}>No data</td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="flex items-center justify-center w-full mt-4">
          <div className="flex items-center justify-center text-white">
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <PaginationLeft />
            </Button>
            <p className="text-base font-title">
              <span>Page</span>{" "}
              <strong className="">
                {pageIndex + 1} of {pageOptions.length || 1}
              </strong>
            </p>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              <PaginationRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;

function Button(props) {
  return (
    <button
      className="px-1 py-1 mx-2 bg-transparent cursor-pointer"
      {...props}
    />
  );
}
