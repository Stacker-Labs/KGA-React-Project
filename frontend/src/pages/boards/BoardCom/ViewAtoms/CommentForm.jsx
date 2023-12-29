import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
//Authorization: `Bearer ${Token}`,
// const Token = process.env.REACT_APP_TOKEN;
const CommentForm = ({
  id,
  setCommentList,
  commentList,
  setCommentsLength,
  commentsLength,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewComment(value);
  };
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;
  const userNickname = userInfo?.user?.nickname;

  const fetchUserInformation = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${id}/comments`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: newComment,
            parentCommentId: null,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        console.log("댓글이 성공적으로 작성되었습니다.", result);
        console.log("댓글수@@@", result.commentLength);
        setCommentList([result, ...commentList]);
        setCommentsLength(commentsLength + 1);
        setNewComment("");
      } else {
        console.error("서버 응답 에러:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId === "") {
      alert("로그인이 필요합니다.");
      return;
    }
    if (newComment.trim() === "") {
      alert("댓글을 입력하세요.");
      return;
    }
    const forbiddenWords = ["병신", "비속어1", "비속어2", "강수빈"];
    const lowerCaseComment = newComment.toLowerCase();
    const foundForbiddenWord = forbiddenWords.some((word) =>
      lowerCaseComment.includes(word.toLowerCase())
    );
    if (foundForbiddenWord) {
      alert("비속어는 사용할 수 없습니다.");
      return;
    }

    try {
      const result = await fetchUserInformation();
      setNewComment("");

      if (result) {
        console.log("서버 응답 결과:", result);
        return result;
        // fetchComments();
      }
    } catch (error) {
      console.error("댓글 작성 중 에러:", error);
    }
  };

  return (
    <div className="border p-5">
      <div className="flex flex-row justify-between">
        <div className="font-style: italic text-base">{userNickname}</div>
        <span></span>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center m-5">
        <textarea
          type="text"
          value={newComment}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요..."
          className="w-[800px]  p-[10px] resize-none rounded-md bg-neutral-100 text-black"
        />
        <button
          type="submit"
          className="bg-sky-600	p-[15px] rounded-md  hover:bg-sky-400"
        >
          <p className="text-white  mx-auto">등록</p>
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
