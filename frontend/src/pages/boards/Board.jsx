import React from "react";
import Write from "./BoardCom/Write";
import { Box } from "@mui/material";
import styled from "styled-components";

const BoardPageWrap = styled(Box)``;

const Board = () => {
  return (
    <>
      <BoardPageWrap>
        <Write />
      </BoardPageWrap>
    </>
  );
};

export default Board;
