import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import Comments from "./ViewAtoms/Comments";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link } from "react-router-dom";
import CommentList from "./ViewAtoms/CommentsList";

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
  font-size: 50px;
  padding: 50px;
  width: 100%;
`;

const ViewContent = styled(Box)`
  margin-top: 5px;
  padding: 20px;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
`;

const StyledMUIButton = styled(Box)`
  display: flex;
  justify-content: end;
  margin-top: 20px;
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
  const [nickname, setNickname] = useState("");
  const [userBoardDate, setUserBoardDate] = useState("");
  const params = useParams();

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBBUEEzbmFtZSIsImlhdCI6MTcwMzA2NDgwMCwiZXhwIjoxNzAzMDY4NDAwfQ.JEB-BQ-nnANMItwO8eASzutqPbdiKuN0AT0uMlS983c";

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetch(`http://api.subin.kr/boards/${params.id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      });
      const viewCont = document.querySelector(".ViewCont");
      const result = await response.json();
      viewCont.innerHTML = result.content;
      const nickname = result.user.nickname;
      const commentDate = result.createdAt;

      console.log("result@@", result);
      setNickname(nickname);
      setTitle(result.title);
      setContent(result.content);
      setUserBoardDate(commentDate);
    };

    getBoard();
  }, []);

  return (
    <>
      <div className="w-[100%] flex flex-col">
        <ViewPageWrap>
          <IconBox>
            <HandleScroll />
            <ViewPageMain>
              <ViewTitle>{title}</ViewTitle>
              <h6>
                {nickname} | {userBoardDate}
              </h6>
              <ViewContent className="ViewCont"></ViewContent>
              <CommentList id={params.id} />
            </ViewPageMain>
          </IconBox>
        </ViewPageWrap>
        <StyledMUIButton>
          <MUIButton customType="local">페이지 등록</MUIButton>
          <Link
            to={`/boards/${params.id}/edit?title=${encodeURIComponent(
              title
            )}&content=${encodeURIComponent(content)}`}
          >
            <MUIButton customType="social">수정</MUIButton>
          </Link>
          <MUIButton customType="social">삭제</MUIButton>
        </StyledMUIButton>
      </div>
    </>
  );
};

export default View;
