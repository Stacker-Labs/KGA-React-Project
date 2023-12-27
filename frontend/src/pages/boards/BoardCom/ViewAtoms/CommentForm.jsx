import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
const CommentForm = ({ id }) => {
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewComment(value);
  };
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;
  const userNickname = userInfo?.user?.nickname;
  // const Token = process.env.REACT_APP_TOKEN;
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
        return result;
      } else {
        console.error("서버 응답 에러:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  // const fetchUserComment = async (boardId, page) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_SERVER}/boards/${boardId}/${page}`);
  //     if (response.ok) {
  //       const result = await response.json();

  //       return result;
  //     } else {
  //       console.error("서버 응답 에러:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user comments:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId === "") {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const result = await fetchUserInformation();
      setNewComment("");
      if (result) {
        console.log("서버 응답 결과:", result);
      }
    } catch (error) {
      console.error("댓글 작성 중 에러:", error);
    }
  };

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
    <div className="border p-5">
      <div className="flex flex-row justify-between" style={style}>
        <div>{userNickname}</div>
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
            등록d
          </p>
        </button>
      </form>

      {/* <div className="p-5 border">
        로그인이 필요합니다.
        <Link
          to="https://stacker-labs.vercel.app/auth"
          className="text-blue-600"
        >
          여기를 클릭하여 로그인하세요.
        </Link>
      </div> */}
    </div>
  );
};

export default CommentForm;
