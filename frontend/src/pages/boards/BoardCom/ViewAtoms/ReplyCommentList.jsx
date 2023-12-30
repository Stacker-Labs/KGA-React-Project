import React, { useState, useEffect } from "react";

const ReplyCommentList = ({
  id,
  replyCommentList,
  setReplyCommentList,
  page,
}) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchReplyComments = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${id}/${currentPage}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        setReplyCommentList(result.replyComments[0]);
        setHasPreviousPage(currentPage > 1);
        setHasNextPage(result.nextPage);
      } catch (error) {
        console.error("Error fetching reply comments:", error);
      }
    };

    fetchReplyComments();
  }, [id, currentPage, setReplyCommentList]);

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
      {replyCommentList?.map((replyComment, idx) => (
        <div key={`reply-comment-${idx}`}>{replyComment.content}</div>
      ))}

      <div className="p-[10px] mx-auto w-[40%] flex flex-row justify-between my-[15px]">
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

export default ReplyCommentList;
