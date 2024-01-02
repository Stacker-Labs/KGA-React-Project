import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
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
  border-radius: 20px;
  height: 1200px;
`;

const BoardTitle = styled(Box)`
  background-color: #ffffff;
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
  const params = useParams();
  const [searchParams] = useSearchParams();
  const viewTitle = searchParams.get("title");
  const viewContent = searchParams.get("content");
  const viewTags = searchParams.get("tags");
  const [title, setTitle] = useState(viewTitle || "");
  const [content, setContent] = useState(viewContent || "");
  const [tags, setTags] = useState(viewTags || []);
  const [tagList, setTagList] = useState([]);
  const userInfo = useRecoilValue(userState);

  const loggedInUserId = userInfo?.id || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUserId) {
      alert("로그인이 필요합니다");
      navigate("/auth");
    }
  }, [navigate, loggedInUserId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`
        );

        if (response.status === 401) {
          alert("로그인이 필요합니다.");
          navigate("/auth");
          return;
        }

        if (!response.ok) {
          alert("로그인이 필요합니다.");
          navigate("/auth");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (!viewTitle) {
      fetchPost();
    }
  }, [params.id, viewTitle]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  const handleUpdate = async () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            content,
            tags: tagList.join(" "),
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate(`/boards/${params.id}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
      <TagPage
        tagList={tagList}
        setTagList={setTagList}
        value={tags}
        onChange={handleTagsChange}
      />
      <ModifyWrap>
        <BoardTitle>
          <InputTitle
            type="text"
            className="boardTitle"
            placeholder="제목을 입력해주세요"
            setTagList={setTagList}
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
