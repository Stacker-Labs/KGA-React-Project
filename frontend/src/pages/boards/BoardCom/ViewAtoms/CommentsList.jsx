import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const CommentList = ({ id, commentList, setCommentList, page }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${id}/${currentPage}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        setCommentList(result.boardComments[0]);
        setHasPreviousPage(currentPage > 1);
        setHasNextPage(result.nextPage);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id, currentPage]);

  const loadPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const loadNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      {commentList?.map((comment, idx) => (
        <Comment
          id={id}
          key={`comment${idx}`}
          comment={comment}
          setCommentList={setCommentList}
        />
      ))}
      <div className="p=[10px] w-[100%] flex flex-row justify-between">
        <button onClick={loadPreviousPage} disabled={!hasPreviousPage}>
          Previous
        </button>
        <div>
          Page: {currentPage} / {totalPages}
        </div>
        <button onClick={loadNextPage} disabled={!hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CommentList;
