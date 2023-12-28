import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import MUIButton from "../../../components/atoms/Button";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link } from "react-router-dom";
import CommentList from "./ViewAtoms/CommentsList";
import CommentForm from "./ViewAtoms/CommentForm";
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
  const [commentList, setCommentList] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [page, setPage] = useState(1);

  // const [loading, setLoading] = useState(true);
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id || "";
  const hasPermission = userId === viewContent.user?.id;
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

      const result = await response.json();

      // console.log("result@@", result);

      setViewContent(result);

      const commentResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}/${page}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const commentResult = await commentResponse.json();

      setPage(commentResult.nextPage);
      setCommentsLength(result.commentLength);
      setCommentList(commentResult.boardComments[0]);
    };

    if (!viewContent.title) {
      getBoard();
    } else {
      viewContentRef.current.innerHTML = viewContent.content;
    }
  }, [viewContent, commentList, commentsLength]);

  const constructEditURL = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("title", viewContent.title);
    queryParams.set("content", viewContent.content);
    const tagsString = viewContent.tags.map((tag) => tag.tag).join(",");
    queryParams.set("tags", tagsString);
    const editURL = `/boards/${params.id}/edit?${queryParams.toString()}`;
    return editURL;
  };

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
            <div>댓글{commentsLength}</div>
            <CommentForm
              id={params.id}
              setCommentList={setCommentList}
              commentList={commentList}
              setCommentsLength={setCommentsLength}
              commentsLength={commentsLength}
            />
            <CommentList
              id={params.id}
              commentList={commentList}
              page={page}
              setCommentList={setCommentList}
            />
          </IconBox>
        </ViewPageWrap>

        <StyledMUIButton>
          {hasPermission && (
            <>
              <Link to={constructEditURL()}>
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
