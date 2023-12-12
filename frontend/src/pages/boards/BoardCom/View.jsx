import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import WritePageBtn from "./WriteAtoms/WriteButton";

const ViewPageWrap = styled(Box)`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  height: 100%;
`;
const ViewPageMain = styled(Box)`
  width: 1200px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid black;
  padding: 10px;
  margin: 0 auto;
`;

const ViewTitle = styled(Box)`
  padding: 20px;
  width: 100%;
  border: 1px solid black;
`;

const ViewContent = styled(Box)`
  margin-top: 5px;
  padding: 20px;
  width: 100%;
  height: 100vh;
  border: 1px solid black;
`;

const View = () => {
  return (
    <>
      <ViewPageWrap>
        <ViewPageMain>
          <ViewTitle>dd</ViewTitle>
          <ViewContent>dd</ViewContent>
        </ViewPageMain>
      </ViewPageWrap>
      <WritePageBtn>수정</WritePageBtn>
    </>
  );
};

export default View;
