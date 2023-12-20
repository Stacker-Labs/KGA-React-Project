import React, { useState } from "react";
import { Link } from "react-router-dom";

const CommentForm = ({ id, addComment, comments }) => {
  const style = {
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  const [newComment, setNewComment] = useState("");
  const [nickname, setNickname] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewComment(value);
  };
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBBUEEzbmFtZSIsImlhdCI6MTcwMzA2NDgwMCwiZXhwIjoxNzAzMDY4NDAwfQ.JEB-BQ-nnANMItwO8eASzutqPbdiKuN0AT0uMlS983c";

  const fetchUserInformation = async () => {
    try {
      const response = await fetch(
        `https://api.subin.kr/boards/${id}/comments`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment,
            parentCommentId: null,
          }),
        }
      );
      const userData = await response.json();
      console.log(userData);
      const nickname = userData.user.nickname;

      addComment(newComment);
      setNickname(nickname);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Token) {
      alert("로그인이 필요합니다.");
      return;
    }
    fetchUserInformation();
    setNewComment("");
  };

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
    <div className="border p-5">
      <div className="flex flex-row justify-between" style={style}>
        <div>{nickname}</div>
        <div>총 댓글수 {totalComments}</div>
      </div>
      {Token ? (
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
              등록
            </p>
          </button>
        </form>
      ) : (
        <div className="p-5 border">
          로그인이 필요합니다.
          <Link to="http://localhost:3000/auth" className="text-blue-600">
            여기를 클릭하여 로그인하세요.
          </Link>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
