import React, { useState, useEffect } from "react";

const CommentList = ({ id }) => {
  const [commentList, setCommetList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      const getCommentList = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${id}/${page}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();
        setCommetList(result.boardComments);
        setPage(result.nextPage);
      };

      getCommentList();
    }
  }, [page]);

  return (
    <div>
      {commentList.map((comment) => (
        <div>{comment.content}</div>
      ))}
    </div>
  );
};

export default CommentList;
