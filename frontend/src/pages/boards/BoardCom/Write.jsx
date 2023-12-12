import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import WritePageBottom from "./WriteAtoms/WritePageBottom";
import { FormControl } from "@mui/base/FormControl";

const WriteWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative;
`;

const WriteForm = styled(FormControl)`
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
`;

const BoardTitle = styled(Box)`
  /* border: 1px solid #414040; */
  margin: 0 auto;
  width: 1000px;
  height: 100px;
`;
const InputTitle = styled(Input)`
  width: 100%;
  padding: 30px 20px;
  margin-bottom: 20px;
`;

const BoardConntent = styled(Box)`
  width: 1000px;
  margin: 0 auto;
`;

const InputContent = styled(TextareaAutosize)`
  margin-top: 20px;
  resize: none;
  padding-bottom: 100px;
  width: 100%;

  border: none;
  outline: none;
  transition: border 0.3s ease;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <>
      <WriteWrap>
        <WriteForm action="/">
          <BoardTitle>
            <InputTitle
              type="text"
              className="boardTitle"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </BoardTitle>
          <BoardConntent>
            <InputContent
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></InputContent>
          </BoardConntent>
          <WritePageBottom />
        </WriteForm>
      </WriteWrap>
    </>
  );
};

export default Write;
