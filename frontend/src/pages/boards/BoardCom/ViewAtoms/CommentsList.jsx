import React from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const CommentList = () => {
  return (
    <div>
      <CommentForm />
      <Comments />
    </div>
  );
};

export default CommentList;
