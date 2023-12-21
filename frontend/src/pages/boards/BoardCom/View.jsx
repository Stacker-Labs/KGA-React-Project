import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link } from "react-router-dom";
import CommentList from "./ViewAtoms/CommentsList";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";

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
  const [tags, setTags] = useState("");
  const [userBoardDate, setUserBoardDate] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const usersInfo = userInfo?.id || "";

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const viewCont = document.querySelector(".ViewCont");
      const result = await response.json();
      viewCont.innerHTML = result.content;
      const nickname = result.user.nickname;
      const commentDate = result.createdAt;

      console.log("result@@", result);
      setNickname(nickname);
      setTitle(result.title);
      setTags(result.tags);
      setContent(result.content);
      setUserBoardDate(commentDate);
      setLoading(false);
    };

    getBoard();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[100%] flex flex-col">
          <ViewPageWrap>
            <IconBox>
              <HandleScroll />
              <ViewPageMain>
                <ViewTitle>{title}</ViewTitle>
                <h6>
                  {nickname} | {userBoardDate}
                </h6>
                <div>
                  <ul>
                    <li>{tags}</li>
                  </ul>
                </div>
                <ViewContent className="ViewCont"></ViewContent>
                <CommentList id={params.id} />
              </ViewPageMain>
            </IconBox>
          </ViewPageWrap>
          <StyledMUIButton>
            {usersInfo !== "" && (
              <>
                <MUIButton customType="local">페이지 등록</MUIButton>
                <Link
                  to={`/boards/${params.id}/edit?title=${encodeURIComponent(
                    title
                  )}&content=${encodeURIComponent(
                    content
                  )}&tags=${encodeURIComponent(tags)}`}
                >
                  <MUIButton customType="social">수정</MUIButton>
                </Link>
                <MUIButton customType="social">삭제</MUIButton>
              </>
            )}
          </StyledMUIButton>
        </div>
      )}
    </>
  );
};

export default View;
