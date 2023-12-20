import React from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const CommentList = ({ id }) => {
  return (
    <div>
      <Comments id={id} />
    </div>
  );
};

export default CommentList;
