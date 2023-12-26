import React from "react";
import Comments from "./Comments";

const CommentList = ({ id }) => {
  return (
    <div>
      <Comments id={id} />
    </div>
  );
};

export default CommentList;
