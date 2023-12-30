import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const CommentList = ({ id, commentList, setCommentList, page }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [replyCommentList, setReplyCommentList] = useState([]);
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
      <div className="p=[10px] mx-auto w-[40%] flex flex-row justify-between  my-[15px]">
        <button
          className="rounded-full p-[15px] bg-sky-200 hover:bg-sky-400"
          onClick={loadPreviousPage}
          disabled={!hasPreviousPage}
        >
          ❮
        </button>
        <div>Page: {currentPage}</div>
        <button
          className="rounded-full p-[15px] bg-sky-200 hover:bg-sky-400"
          onClick={loadNextPage}
          disabled={!hasNextPage}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default CommentList;
