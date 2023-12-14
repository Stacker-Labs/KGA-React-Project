import React from "react";
import Write from "./BoardCom/Write";
import { Box } from "@mui/material";
import styled from "styled-components";
import Header from "../../components/organisms/Header";
const BoardPageWrap = styled(Box)``;

const Board = () => {
  return (
    <>
      <BoardPageWrap>
        <Header />
        <Write />
      </BoardPageWrap>
    </>
  );
};

export default Board;
