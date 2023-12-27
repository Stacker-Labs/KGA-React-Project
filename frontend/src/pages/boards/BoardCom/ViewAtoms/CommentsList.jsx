import React from "react";
// const Token = process.env.REACT_APP_TOKEN;

const CommentList = ({ id, commentList, page }) => {
  return (
    <div className="flex flex-col justify-center">
      {commentList[0]?.map((comment, idx) => (
        <div key={`comment${idx}`} className="border-y-2 p-[10px]">
          <div>{comment.user.nickname}</div>
          <div className="p-[5px]"> {comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
