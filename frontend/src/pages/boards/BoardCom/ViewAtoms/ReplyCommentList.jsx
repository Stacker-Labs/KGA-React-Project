import React from "react";

const ReplyCommentList = ({ replyCommentList }) => {
  return (
    <div className="flex flex-col justify-center">
      {replyCommentList?.map((replyComment, idx) => (
        <div key={`reply-comment-${idx}`}>{replyComment.content}</div>
      ))}
    </div>
  );
};

export default ReplyCommentList;
