import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import WrapComments from "./WrapComments";
import { Box } from "@mui/material";
import CommentsList from "./CommentsList";
const Comments = () => {
  const [comments, setComments] = useState([
    { id: 1, name: "sangheun Park", content: "I like it!" },
  ]);

  const nextId = useRef(1);

  const onInsert = useCallback(
    (name, content) => {
      const comment = {
        id: nextId.current,
        name,
        content,
      };
      console.log(name);
      console.log(content);
      setComments((comments) => comments.concat(comment));
      nextId.current += 1; //nextId 1씩 더하기
    },
    [comments]
  );

  return (
    <div>
      <WrapComments onInsert={onInsert} />

      <div style={{ marginBottom: "4rem" }}>
        {comments.map((comment) => {
          return (
            <CommentsList
              key={comment.id}
              id={comment.id}
              name={comment.name}
              content={comment.content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
