import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Input } from "@mui/material";
import WritePageBottom from "./WriteAtoms/WritePageBottom";
import TinyMCEEditor from "./WriteAtoms/Editor";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import TagPage from "./WriteAtoms/TagPage";

const WriteWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  position: relative;
  height: 1200px;
`;

const BoardTitle = styled(Box)`
  /* border: 1px solid #414040; */
  margin: 0 auto;
  width: 1100px;
  height: 100px;
`;

const InputTitle = styled(Input)`
  width: 100%;
  padding: 30px 20px;
`;

const BoardConntent = styled(Box)`
  width: 1100px;
  margin: 0 auto;
  /* border: 1px solid black; */
  height: 800px;
`;

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const userNickname = userInfo?.user?.nickname;
  const userId = userInfo?.user?.id;
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleTagsChange = useCallback((value) => {
    setTags(value);
  }, []);

  const handleSave = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_SERVER}/boards`, {
      method: "post",
      headers: {
        // Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags,
        userId,
        userNickname,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate(`/boards/${result.id}`);
    }
  };
  return (
    <div className="flex flex-row">
      <TagPage value={tags} onChange={handleTagsChange} />
      <WriteWrap>
        <BoardTitle>
          <InputTitle
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleTitleChange}
          />
        </BoardTitle>

        <BoardConntent>
          <TinyMCEEditor value={content} onChange={handleContentChange} />
        </BoardConntent>

        <WritePageBottom handleSave={handleSave} disabled={!title} />
      </WriteWrap>
    </div>
  );
};

export default Write;
