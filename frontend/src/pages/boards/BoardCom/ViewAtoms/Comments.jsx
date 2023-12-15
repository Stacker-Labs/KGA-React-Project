import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import WrapComments from "./WrapComments";
import { Box } from "@mui/material";
import CommentsList from "./CommentsList";

const CommentBox = styled(Box)`
  margin-bottom: 4rem;
`;

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
      nextId.current += 1;
    },
    [comments]
  );

  return (
    <>
      <WrapComments onInsert={onInsert} />
      <CommentBox>
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
      </CommentBox>
    </>
  );
};

export default Comments;
