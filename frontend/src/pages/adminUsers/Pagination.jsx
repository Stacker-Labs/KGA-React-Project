import React, { useState, useEffect } from "react";
import getEmptyArray from "./utils/getEmptyArray";
import PageButton from "./PageButton";

const Pagination = ({ setCurrentPage, currentPage, totalPage }) => {
  const PAGES_PER_LIST = 5;
  const [showingNum, setShowingNum] = useState({
    start: 1,
    end: PAGES_PER_LIST,
  });

  const changePageNumbersBackward = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const changePageNumberForward = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const lessThanFive = totalPage <= PAGES_PER_LIST;
    lessThanFive
      ? setShowingNum((prev) => ({ ...prev, start: 1, end: totalPage }))
      : setShowingNum((prev) => ({ ...prev, start: 1, end: PAGES_PER_LIST }));
  }, [totalPage]);

  useEffect(() => {
    const lastPage = showingNum.start + PAGES_PER_LIST - 1;
    if (currentPage < showingNum.start || currentPage > lastPage) {
      if (currentPage + PAGES_PER_LIST > totalPage) {
        setShowingNum((prev) => ({
          ...prev,
          start: totalPage - PAGES_PER_LIST + 1,
          end: totalPage,
        }));
      } else {
        setShowingNum((prev) => ({
          ...prev,
          start: currentPage,
          end: currentPage + PAGES_PER_LIST - 1,
        }));
      }
    }
  }, [currentPage, totalPage]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;
  const pages = getEmptyArray(showingNum.start, showingNum.end);

  return (
    <div className="flex flex-row gap-5">
      <button
        type="button"
        disabled={isFirstPage}
        onClick={changePageNumbersBackward}
      >
        back
      </button>
      {pages.map((page, idx) => (
        <PageButton
          key={`pageNumber-${idx + 1}`}
          page={page}
          setCurrentPage={setCurrentPage}
          isActive={page === currentPage}
        />
      ))}
      <button
        type="button"
        disabled={isLastPage}
        onClick={changePageNumberForward}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
