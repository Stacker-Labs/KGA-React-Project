import React from "react";
import Comment from "./Comment";
// const Token = process.env.REACT_APP_TOKEN;
//   Authorization: `Bearer ${Token}`,
const CommentList = ({ id, commentList, setCommentList, page }) => {
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
    </div>
  );
};

export default CommentList;
