import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link } from "react-router-dom";
import CommentList from "./ViewAtoms/CommentsList";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import CommentForm from "./ViewAtoms/CommentForm";

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
  const [viewContent, setViewContent] = useState({});
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [tags, setTags] = useState([]);
  // const [userBoardDate, setUserBoardDate] = useState("");
  const [commentList, setCommetList] = useState([]);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id || "";
  const hasPermission = userInfo?.id?.some((view) => view.id === userId);
  const viewContentRef = useRef();

  // const Token = process.env.REACT_APP_TOKEN;
  // //  Authorization: `Bearer ${Token}`,
  // console.log(Token);

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      // const viewCont = document.querySelector(".ViewCont");

      const result = await response.json();
      // const nickname = result.user?.nickname;
      // const commentDate = result.createdAt;
      // const pageComment = result.comments;

      console.log("result@@", result);
      setViewContent(result);
      // setNickname(nickname);
      // setUserBoardDate(commentDate);
      // setTags(result.tags || []);
      // setContent(result.content);
      // setTitle(result.title);

      const commentResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}/${page}`,
        {
          method: "GET",
          // headers: { Authorization: `Bearer ${Token}` },
          credentials: "include",
        }
      );
      const commentResult = await commentResponse.json();
      setCommetList(commentResult.boardComments);
      setPage(commentResult.nextPage);
    };

    if (!viewContent.title) {
      getBoard();
    } else {
      viewContentRef.current.innerHTML = viewContent.content;
    }
  }, [viewContent]);

  // useEffect(() => {
  //   const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
  //   setComments(storedComments);
  // }, [params.id, loading]);

  // const addNewComment = (newComment) => {
  //   const updatedComments = [...comments, newComment];
  //   setComments(updatedComments);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div className="w-[100%] flex flex-col">
        <ViewPageWrap>
          <IconBox>
            <HandleScroll userId={userId} />
            <ViewPageMain>
              <ViewTitle>{viewContent.title}</ViewTitle>
              <h6>
                {viewContent.user?.nickname} | {viewContent.createdAt}
              </h6>
              <div>
                <ul>
                  {viewContent.tags?.map((tag, idx) => (
                    <li key={`tag-${idx}`}>{tag.tag}</li>
                  ))}
                </ul>
              </div>
              <div ref={viewContentRef}></div>
            </ViewPageMain>
            <CommentForm id={params.id} />
            <CommentList id={params.id} commentList={commentList} page={page} />
          </IconBox>
        </ViewPageWrap>

        <StyledMUIButton>
          {hasPermission && (
            <>
              <MUIButton customType="local">페이지 등록</MUIButton>
              <Link
                to={`/boards/${params.id}/edit?title=${encodeURIComponent(
                  viewContent.title
                )}&content=${encodeURIComponent(
                  viewContent.content
                )}&tags=${encodeURIComponent(viewContent.tags.join(","))}`}
              >
                <MUIButton customType="social">수정</MUIButton>
              </Link>
              <MUIButton customType="social">삭제</MUIButton>
            </>
          )}
        </StyledMUIButton>
      </div>
    </>
  );
};

export default View;
