import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import WritePageBottom from "./WriteAtoms/WritePageBottom";
import TinyMCEEditor from "./WriteAtoms/Editor";

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
  const [title, setTitle] = useState(viewTitle || "");
  const [content, setContent] = useState(viewContent || "");

  const navigate = useNavigate();
  const postId = "";

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://api.subin.kr/boards/${postId}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정합니다.

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBBUEEzbmFtZSIsImlhdCI6MTcwMzA2NDgwMCwiZXhwIjoxNzAzMDY4NDAwfQ.JEB-BQ-nnANMItwO8eASzutqPbdiKuN0AT0uMlS983c";

  const handleUpdate = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    try {
      const response = await fetch(`https://api.subin.kr/boards/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Token}`,
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
        navigate(`/boards/${postId}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
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
