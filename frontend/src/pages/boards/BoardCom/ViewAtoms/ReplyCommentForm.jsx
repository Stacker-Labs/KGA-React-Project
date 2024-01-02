import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import { No_Profile } from "../../../../images";
import Button from "../../../../tw_components/atoms/Buttons";

const ReplyCommentForm = ({
  id,
  parentCommentId,
  replyCommentList,
  setReplyCommentList,
}) => {
  const [newReplyComment, setNewReplyComment] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewReplyComment(value);
  };
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;
  const userNickname = userInfo?.user?.nickname;
  const userImg = userInfo?.user?.image;

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
            content: newReplyComment,
            parentCommentId: parentCommentId,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        console.log("대댓글이 성공적으로 작성되었습니다.", result);

        setReplyCommentList([result, ...replyCommentList]);

        setNewReplyComment("");
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

    if (newReplyComment.trim() === "") {
      alert("댓글을 입력하세요.");
      return;
    }

    const forbiddenWords = ["병신", "비속어1", "비속어2", "강수빈"];
    const lowerCaseComment = newReplyComment.toLowerCase();

    const foundForbiddenWord = forbiddenWords.some((word) =>
      lowerCaseComment.includes(word.toLowerCase())
    );
    if (foundForbiddenWord) {
      alert("비속어는 사용할 수 없습니다.");
      return;
    }

    try {
      const result = await fetchUserInformation();
      setNewReplyComment("");

      if (result) {
        console.log("서버 응답 결과:", result);
        return result;
      }
    } catch (error) {
      console.error("댓글 작성 중 에러:", error);
    }
  };

  return (
    <div className="flex flex-row justify-evenly items-center w-full gap-5 ">
      <div className="flex flex-row items-center justify-around w-[15%] ml-5">
        <img
          src={userImg || No_Profile}
          alt=""
          className="w-[50px] h-[50px] rounded-3xl"
        />
        <p className="italic text-xl">{userNickname}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-around items-center m-5 w-[80%]"
      >
        <textarea
          type="text"
          value={newReplyComment}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요..."
          className="w-[80%] border p-[10px] resize-none rounded-md bg-transparent"
        />
        <Button variant={"blue"} size={"md"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReplyCommentForm;
