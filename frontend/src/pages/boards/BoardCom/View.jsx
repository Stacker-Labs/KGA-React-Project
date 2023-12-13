import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import Comments from "./ViewAtoms/Comments";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams } from "react-router-dom";

const ViewPageWrap = styled(Box)`
  margin: 0;
  padding: 0;

  height: 100%;
`;
const ViewPageMain = styled(Box)`
  width: 1200px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 10px;
  margin: 0 auto;
`;

const ViewTitle = styled(Box)`
  padding: 20px;
  width: 100%;
`;

const ViewContent = styled(Box)`
  margin-top: 5px;
  padding: 20px;
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */
`;

const StyledMUIButton = styled(Box)`
  display: flex;
  justify-content: end;

  padding: 5px;
`;
const IconBox = styled(Box)`
  margin: 0 auto;
  width: 1400px;
  height: 100%;
`;

const View = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  useEffect(() => {
    const getBoard = async () => {
      const response = await fetch(`https://api.subin.kr/boards/${params.id}`);

      const result = await response.json();
      console.log("result@@", result);
      setTitle(result.title);
      setContent(result.content);
    };

    getBoard();
  }, []);

  return (
    <>
      <ViewPageWrap>
        <IconBox>
          <HandleScroll />
          <ViewPageMain>
            <ViewTitle>{title}</ViewTitle>
            <h5>유저아이디 | 20xx.xx.xx</h5>
            <ViewContent>{content}</ViewContent>
            <Comments />
          </ViewPageMain>
        </IconBox>
      </ViewPageWrap>
      <StyledMUIButton>
        <MUIButton customType="local">수정</MUIButton>
        <MUIButton customType="social">삭제</MUIButton>
      </StyledMUIButton>
    </>
  );
};

export default View;
