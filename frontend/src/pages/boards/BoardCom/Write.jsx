import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TinyMCEEditor from "./WriteAtoms/Editor";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import TagPage from "./WriteAtoms/TagPage";
import { cn } from "../../../utils/cn";
import Button from "../../../tw_components/atoms/Buttons";
import { darkModeState } from "../../../recoil/darkmode";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const userId = userInfo?.user?.id || "";
  const darkMode = useRecoilValue(darkModeState);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);

  const handleTagsChange = useCallback((value) => {
    setTags(`${tags} ${value}`);
  }, []);

  const handleSave = async () => {
    const confirmed = window.confirm("Would you like to post?");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    console.log(title);
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!confirmed) return;

    const response = await fetch(`${process.env.REACT_APP_API_SERVER}/boards`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        content,
        tags: tagList.join(" "),
      }),
    });
    const result = await response.json();
    if (response.ok) {
      navigate(`/boards/${result.id}`);
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col w-full h-screen px-40 gap-3 py-5",
        darkMode ? "dark" : ""
      )}
    >
      <div className="border-b outline-none ">
        <input
          type="text"
          placeholder="New post title here..."
          value={title}
          onChange={handleTitleChange}
          className="border-none w-full pl-3 dark:bg-transparent outline-none p-3 tex-xl"
        />
      </div>
      <TagPage
        tagList={tagList}
        setTagList={setTagList}
        value={tags}
        onChange={handleTagsChange}
      />
      <div>
        <TinyMCEEditor value={content} onChange={handleContentChange} />
      </div>

      <Button
        variant={"blue"}
        size={"md"}
        onClick={handleSave}
        disabled={!title}
      >
        Publish
      </Button>
    </div>
  );
};

export default Write;
