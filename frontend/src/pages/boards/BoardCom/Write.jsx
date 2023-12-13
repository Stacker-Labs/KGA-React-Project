import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import WritePageBottom from "./WriteAtoms/WritePageBottom";

const WriteWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative;
`;

const BoardTitle = styled(Box)`
  /* border: 1px solid #414040; */
  margin: 0 auto;
  width: 1000px;
  height: 100px;
`;

const InputTitle = styled(Input)`
  width: 100%;
  padding: 30px 20px;
  margin-bottom: 20px;
`;

const BoardConntent = styled(Box)`
  width: 1000px;
  margin: 0 auto;
`;

const InputContent = styled(TextareaAutosize)`
  margin-top: 20px;
  resize: none;
  padding-bottom: 100px;
  width: 100%;
  border: none;
  outline: none;
  transition: border 0.3s ease;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAyNDYzMjQ0LCJleHAiOjE3MDI0NjY4NDR9.aUpkN9nZ9uK1B-e31Tvh9mq0CGq5QLM28sWOZbTG9Ms";
  const handleSave = async () => {
    const response = await fetch("https://api.subin.kr/boards", {
      method: "post",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: "#javascript",
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate(`/boards/${result.id}`);
    }
  };
  return (
    <>
      <WriteWrap>
        <BoardTitle>
          <InputTitle
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </BoardTitle>
        <BoardConntent>
          <InputContent
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></InputContent>
        </BoardConntent>
        <WritePageBottom handleSave={handleSave} />
      </WriteWrap>
    </>
  );
};

export default Write;
