import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import WritePageBottom from "./WriteAtoms/WritePageBottom";
import TinyMCEEditor from "./WriteAtoms/Editor";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import TagPage from "./WriteAtoms/TagPage";

const ModifyWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative;
  height: 1200px;
`;

const BoardTitle = styled(Box)`
  margin: 0 auto;
  width: 1100px;
  height: 100px;
`;

const InputTitle = styled(Input)`
  width: 100%;
  padding: 30px 20px;
`;

const BoardContent = styled(Box)`
  width: 1100px;
  margin: 0 auto;
  height: 800px;
`;

const Modify = () => {
  const [searchParams] = useSearchParams();
  const viewTitle = searchParams.get("title");
  const viewContent = searchParams.get("content");
  const viewTags = searchParams.get("tags");
  const [title, setTitle] = useState(viewTitle || "");
  const [content, setContent] = useState(viewContent || "");
  const [tags, setTags] = useState(viewTags || "");
  const userInfo = useRecoilValue(userState);
  const userId = userInfo;

  const navigate = useNavigate();
  // const postId = "";

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleTagsChange = useCallback((value) => {
    setTags(value);
  }, []);

  const handleUpdate = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    try {
      const response = await fetch(`https://api.subin.kr/boards/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate(`/boards/${userId}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
      <TagPage value={tags} onChange={handleTagsChange} />
      <ModifyWrap>
        <BoardTitle>
          <InputTitle
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />
        </BoardTitle>
        <BoardContent>
          <TinyMCEEditor value={content} onChange={handleContentChange} />
        </BoardContent>
        <WritePageBottom handleSave={handleUpdate} disabled={!title} />
      </ModifyWrap>
    </>
  );
};

export default Modify;
