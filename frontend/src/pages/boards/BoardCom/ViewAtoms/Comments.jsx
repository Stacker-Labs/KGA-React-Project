import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { commentState } from "./utils/commentsState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import ReplyComments from "./ReplyComments";

const Comments = () => {
  const comments = useRecoilValue(commentState);
  const [userId, setUserId] = useState("User123");
  const setComments = useSetRecoilState(commentState);
  const [replyText, setReplyText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyComments, setReplyComments] = useState(
    Array.from({ length: comments.length }, () => [])
  );

  const reversedComments = [...comments].reverse();

  const handleDeleteComment = (indexToDelete) => {
    const updatedComments = comments.filter(
      (_, index) => index !== indexToDelete
    );
    setComments(updatedComments);
  };

  const toggleReplyInput = (index) => {
    setReplyIndex(index);
  };

  const handleReplySubmit = () => {
    if (replyText.trim() === "" || replyIndex === null) return;

    const updatedReplyComments = [...replyComments];
    updatedReplyComments[replyIndex] = [
      ...(updatedReplyComments[replyIndex] || []),
      replyText,
    ];
    setReplyComments(updatedReplyComments);

    setReplyText("");
    setReplyIndex(null);
  };

  const style = {
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <ul className="h-[100%]">
        {reversedComments.map((comment, index) => (
          <li
            className="w-[100%] h-[100%] border-b-2 flex items-center p-[10px]"
            key={index}
          >
            <div>
              <div className="p-[5px] flex flex-row" style={style}>
                <div className="p-[10px] mx-5 border w-[100px] h-[100px]">
                  프로필사진
                </div>
                {userId}
              </div>

              <div> {comment}</div>
              <div>
                <button
                  onClick={() => toggleReplyInput(index)}
                  className="p-[10px]"
                >
                  댓글
                </button>

                {replyIndex !== null && (
                  <div className="h-[100%]">
                    <div className="w-[900px] border flex justify-center m-5">
                      <textarea
                        placeholder="대댓글을 입력하세요..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="resize-none rounded-md bg-neutral-100 w-[800px] p-[10px]"
                      />
                      <button
                        className="bg-sky-600 p-[15px] rounded-md text-white"
                        onClick={handleReplySubmit}
                      >
                        등록
                      </button>
                    </div>
                    <div className="border">
                      <ul className="bg-slate-50">
                        {replyComments[replyIndex]?.map((reply, idx) => (
                          <li key={idx}>
                            <div className="p-[5px]" style={style}>
                              {userId}
                            </div>
                            <div>{reply}</div>
                          </li>
                        ))}
                      </ul>
                      대댓글 보기
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              className="mx-[25px]"
              onClick={() => handleDeleteComment(comments.length - index - 1)}
            >
              <FontAwesomeIcon icon={faCommentSlash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
