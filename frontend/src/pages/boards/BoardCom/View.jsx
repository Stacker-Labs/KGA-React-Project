import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";

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

const StyledMUIButton = styled(Box)`
  display: flex;
  justify-content: end;

  padding: 5px;
`;

const View = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";
  return (
    <>
      <ViewPageWrap>
        <ViewPageMain>
          <ViewTitle>{title}</ViewTitle>
          <ViewContent>{content}</ViewContent>
        </ViewPageMain>
      </ViewPageWrap>
      <StyledMUIButton>
        <MUIButton customType="local">수정</MUIButton>
        <MUIButton customType="social">삭제</MUIButton>
      </StyledMUIButton>
    </>
  );
};

export default View;
