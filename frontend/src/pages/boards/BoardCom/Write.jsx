import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";

const WriteWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 1px solid black;
  width: 100%;
`;

const BoardTitle = styled(Box)`
  border: 1px solid #414040;
  width: 800px;
  height: 100px;
`;

// const writeRoot = styled(box)``;

const Write = () => {
  return (
    <WriteWrap>
      <form action="/">
        <BoardTitle>
          <input
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
          />
        </BoardTitle>
        <div>
          <textarea name="" className="">
            dd
          </textarea>
        </div>
        <div>
          <button>등록</button>
        </div>
      </form>
    </WriteWrap>
  );
};

export default Write;
