import React, { useMemo } from "react";

function Pagination({ table, dataLength }) {
  const nextClick = () => table.nextPage();
  const prevClick = () => table.previousPage();
  const nextDisabled = !table.getCanNextPage();
  const prevDisabled = !table.getCanPreviousPage();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();

  const paginationItems = useMemo(() => {
    const items = [];

    if (pageCount <= 10) {
      for (let i = 0; i < pageCount; i++) {
        items.push(
          <li key={i}>
            <button
              onClick={() => table.setPageIndex(i)}
              className={
                "px-3 py-2 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 " +
                (i == pageIndex
                  ? "bg-primary border border-priimary hover:bg-gray-100 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray")
              }>
              {i + 1}
            </button>
          </li>
        );
      }
    } else {
      const minPage = Math.max(0, pageIndex - 2);
      const maxPage = Math.min(pageCount - 1, pageIndex + 2);

      if (minPage > 0) {
        items.push(
          <button
            key="first"
            onClick={() => table.setPageIndex(0)}
            className={
              "px-3 py-2 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 " +
              (pageIndex === 1
                ? "bg-primary border border-priimary hover:bg-gray-100 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray")
            }>
            1
          </button>
        );
        if (minPage > 1) {
          items.push(<span key="ellipsis1">...</span>);
        }
      }

      for (let i = minPage; i <= maxPage; i++) {
        items.push(
          <button
            key={i}
            onClick={() => table.setPageIndex(i)}
            disabled={pageIndex === i}
            className={
              "px-3 py-2 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 " +
              (i === pageIndex
                ? "bg-primary border border-priimary hover:bg-gray-100 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray")
            }>
            {i + 1}
          </button>
        );
      }

      if (maxPage < pageCount - 1) {
        if (maxPage < pageCount - 2) {
          items.push(
            <span
              key="ellipsis2"
              className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700">
              ...
            </span>
          );
        }
        items.push(
          <button
            key="last"
            onClick={() => table.setPageIndex(pageCount - 1)}
            className={
              "px-3 py-2 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 " +
              (pageCount === pageIndex
                ? "bg-primary border border-priimary hover:bg-gray-100 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray")
            }>
            {pageCount}
          </button>
        );
      }
    }

    return items;
  }, [
    table.getState().pagination.pageSize,
    table.getPageCount(),
    table.getState().pagination.pageIndex,
  ]);

  return (
    <nav
      className="flex items-center justify-between w-full pt-4"
      aria-label="Table navigation">
      <span className="text-sm text-gray-500">
        Menampilkan {pageIndex * pageSize + 1} sampai{" "}
        {Math.min((pageIndex + 1) * pageSize)} dari {dataLength} entri
      </span>
      <ul className="inline-flex items-center space-x-2">
        <li>
          <button
            onClick={prevClick}
            disabled={prevDisabled}
            className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 ">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
        {paginationItems}
        {/* <li>
          <a
            href="#"
            aria-current="page"
            className="z-10 px-3 py-2 text-sm font-semibold leading-tight text-white border rounded-md border-secondary bg-secondary hover:bg-light-blue">
            3
          </a>
        </li> */}

        {/* <li>
          <a
            href="#"
            className="px-3 py-2 text-sm leading-tight bg-white border border-gray-300 rounded-md text-dark-gray hover:bg-gray-100 hover:text-gray-700">
            ...
          </a>
        </li> */}
        <li>
          <button
            onClick={nextClick}
            disabled={nextDisabled}
            className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
