import React, { useState, useEffect } from "react";
import { useAddComment } from "./utils/commentUtils";
import { useRecoilValue } from "recoil";
import { commentState } from "./utils/commentsState";

const CommentForm = () => {
  const style = {
    fontFamily: "'Noto Sans KR', sans-serif",
  };
  const addComment = useAddComment();
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState("User123");
  const comments = useRecoilValue(commentState);
  const [totalComments, setTotalComments] = useState(0);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    addComment(newComment);
    setNewComment("");
    setTotalComments((prevTotal) => prevTotal + 1);
  };

  useEffect(() => {
    setTotalComments(comments.length);
  }, [comments]);

  return (
    <div className="border p-5">
      <div className="flex flex-row justify-between" style={style}>
        <div>{userId}</div>
        <div>총 댓글수 {totalComments}</div>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center m-5">
        <textarea
          type="text"
          value={newComment}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요..."
          className="w-[800px]  p-[10px] resize-none rounded-md bg-neutral-100"
        />
        <button type="submit" className="bg-sky-600	p-[15px] rounded-md">
          <p className="text-white  mx-auto" style={style}>
            {" "}
            등록
          </p>
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
