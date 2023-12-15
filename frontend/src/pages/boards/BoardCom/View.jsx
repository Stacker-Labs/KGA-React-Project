import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import Comments from "./ViewAtoms/Comments";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link } from "react-router-dom";
import Header from "../../../components/organisms/Header";
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
  padding: 50px;
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
      const response = await fetch(`https://api.subin.kr/boards/${params.id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAyNTQ0MDY3LCJleHAiOjE3MDI1NDc2Njd9.j_PJNousIqv45uV4QT8q_EDM0BP4sxTzkfcpTfb1HL4"}`,
        },
      });
      const viewCont = document.querySelector(".ViewCont");
      const result = await response.json();
      viewCont.innerHTML = result.content;

      console.log("result@@", result);
      setTitle(result.title);
      setContent(result.content);
    };

    getBoard();
  }, []);

  return (
    <>
      <Header />
      <ViewPageWrap>
        <IconBox>
          <HandleScroll />
          <ViewPageMain>
            <ViewTitle>{title}</ViewTitle>
            <h5>유저아이디 | 20xx.xx.xx</h5>
            <ViewContent className="ViewCont"></ViewContent>
            <Comments />
          </ViewPageMain>
        </IconBox>
      </ViewPageWrap>
      <StyledMUIButton>
        <MUIButton customType="local">페이지 등록</MUIButton>
        <Link to={`/boards/${params.id}/edit`}>
          <MUIButton customType="social">수정</MUIButton>
        </Link>
        <MUIButton customType="social">삭제</MUIButton>
      </StyledMUIButton>
    </>
  );
};

export default View;
