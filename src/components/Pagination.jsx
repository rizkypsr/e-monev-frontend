import React, { useEffect, useMemo, useState } from 'react';

const Pagination = ({
  pageChangeHandler,
  totalRows,
  rowsPerPage,
  // resetPage,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Calculating max number of pages
  const noOfPages = Math.ceil(totalRows / rowsPerPage);

  // Creating an array with length equal to no.of pages
  // const pagesArr = [...new Array(noOfPages)];

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    if (noOfPages === currentPage + 1) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 0) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  // To set the starting index of the page
  useEffect(() => {
    pageChangeHandler(currentPage + 1);
  }, [currentPage]);

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [resetPage]);

  const paginationItems = useMemo(() => {
    const items = [];

    if (noOfPages <= 10) {
      for (let i = 0; i < noOfPages; i++) {
        items.push(
          <span key={i}>
            <button
              type="button"
              onClick={() => onPageSelect(i)}
              className={`h-10 w-10 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 ${
                i === currentPage
                  ? 'bg-primary border border-priimary hover:bg-gray-100 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray'
              }`}
            >
              {i + 1}
            </button>
          </span>
        );
      }
    } else {
      const minPage = Math.max(0, currentPage - 2);
      const maxPage = Math.min(noOfPages - 1, currentPage + 2);

      if (minPage > 0) {
        items.push(
          <button
            key="first"
            type="button"
            onClick={() => onPageSelect(0)}
            className={`h-10 w-10 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 ${
              currentPage === 1
                ? 'bg-primary border border-priimary hover:bg-gray-100 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray'
            }`}
          >
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
            type="button"
            onClick={() => onPageSelect(i)}
            disabled={currentPage === i}
            className={`h-10 w-10 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 ${
              i === currentPage
                ? 'bg-primary border border-priimary hover:bg-gray-100 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray'
            }`}
          >
            {i + 1}
          </button>
        );
      }

      if (maxPage < noOfPages - 1) {
        if (maxPage < noOfPages - 2) {
          items.push(
            <span
              key="ellipsis2"
              className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
            >
              ...
            </span>
          );
        }
        items.push(
          <button
            key="last"
            type="button"
            onClick={() => onPageSelect(noOfPages - 1)}
            className={`h-10 w-10 leading-tight text-sm font-semibold rounded-md hover:text-gray-700 ${
              noOfPages === currentPage
                ? 'bg-primary border border-priimary hover:bg-gray-100 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100 text-dark-gray'
            }`}
          >
            {noOfPages}
          </button>
        );
      }
    }

    return items;
  }, [currentPage, noOfPages]);

  if (noOfPages > 1) {
    return (
      <nav
        className="flex p-5 space-y-3 items-center lg:space-y-0 flex-col lg:flex-row lg:justify-between"
        aria-label="Table navigation"
      >
        <span className="text-sm text-gray-500">
          Menampilkan {currentPage * rowsPerPage + 1} sampai{' '}
          {Math.min((currentPage + 1) * rowsPerPage, totalRows)} dari{' '}
          {totalRows} entri
        </span>

        <div className="flex items-center space-x-2">
          <div>
            <button
              type="button"
              onClick={onPrevPage}
              disabled={!canGoBack}
              className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 "
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            {paginationItems}
          </div>

          <div>
            <button
              type="button"
              onClick={onNextPage}
              disabled={!canGoNext}
              className="block p-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default Pagination;
