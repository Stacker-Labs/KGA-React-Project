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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState(null);
  const [tags, setTags] = useState(null);
  const [userBoardDate, setUserBoardDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id || "";
  const hasPermission = userInfo?.id?.some((view) => view.id === userId);
  const viewContentRef = useRef();

  // const Token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const getBoard = async () => {
      if (title === "") {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${Token}`,

              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        // const viewCont = document.querySelector(".ViewCont");

        const result = await response.json();
        const nickname = result.user?.nickname;
        const commentDate = result.createdAt;
        // const pageComment = result.comments;

        console.log("result@@", result);
        setNickname(nickname);
        setUserBoardDate(commentDate);
        setTitle(result.title);
        setTags(result.tags || []);
        setComments(result.comments);
        setContent(result.content);
      } else {
        // viewCont.innerHTML = result.content;
        viewContentRef.current.innerHTML = content;
      }
    };

    getBoard();
  }, [params.id, loading, comments]);

  // useEffect(() => {
  //   const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
  //   setComments(storedComments);
  // }, [params.id, loading]);

  // const addNewComment = (newComment) => {
  //   const updatedComments = [...comments, newComment];
  //   setComments(updatedComments);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-[100%] flex flex-col">
          <ViewPageWrap>
            <IconBox>
              <HandleScroll userId={userId} />
              <ViewPageMain>
                <ViewTitle>{title}</ViewTitle>
                <h6>
                  {nickname} | {userBoardDate}
                </h6>
                <div>
                  <ul>
                    {tags.map((tag, idx) => (
                      <li key={`tag-${idx}`}>{tag.tag}</li>
                    ))}
                  </ul>
                </div>
                <div ref={viewContentRef}></div>
                <CommentForm id={params.id} />
                <CommentList id={params.id} />
              </ViewPageMain>
            </IconBox>
          </ViewPageWrap>
          <StyledMUIButton>
            {hasPermission && (
              <>
                <MUIButton customType="local">페이지 등록</MUIButton>
                <Link
                  to={`/boards/${params.id}/edit?title=${encodeURIComponent(
                    title
                  )}&content=${encodeURIComponent(
                    content
                  )}&tags=${encodeURIComponent(tags.join(","))}`}
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
