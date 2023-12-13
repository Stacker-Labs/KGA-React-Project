import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { FormControl } from "@mui/base/FormControl";
import { TextareaAutosize } from "@mui/base";
import MUIButton from "../../../../components/atoms/Button";

const CommentInsert = styled(FormControl)`
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserNames = styled(Box)``;

const InputComment = styled(TextareaAutosize)`
  padding: 20px;
  resize: none;
`;

const BtnBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const WrapComments = (onInsert) => {
  const [value, setValue] = useState({
    name: "",
    content: "",
  });

  const onChangeContent = useCallback(
    (e) => {
      setValue({
        name: value.name,
        content: e.target.value,
      });
    },
    [value]
  );

  const onSubmit = useCallback(
    (e) => {
      onInsert(value.name, value.content);
      setValue({
        name: "",
        content: "",
      });

      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <>
      <CommentInsert onSubmit={onSubmit}>
        <UserNames>{value.name} 이름</UserNames>
        <InputComment
          placeholder="댓글"
          value={value.content}
          onChange={onChangeContent}
        />
      </CommentInsert>
      <BtnBox>
        <MUIButton customType="social">등록</MUIButton>
      </BtnBox>
    </>
  );
};

export default WrapComments;
