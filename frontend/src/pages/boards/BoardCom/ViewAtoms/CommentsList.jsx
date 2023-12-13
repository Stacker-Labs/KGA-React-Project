import React from "react";

const CommentsList = ({ id, name, content }) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Content: {content}</p>
    </div>
  );
};

export default CommentsList;
