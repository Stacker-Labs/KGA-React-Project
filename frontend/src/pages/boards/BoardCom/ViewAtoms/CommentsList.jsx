import React from "react";
import Comments from "./Comments";

const CommentList = ({ id, comments }) => {
  return (
    <div>
      <Comments id={id} comments={comments} />
    </div>
  );
};

export default CommentList;
