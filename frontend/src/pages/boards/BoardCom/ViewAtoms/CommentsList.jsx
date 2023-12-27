import React, { useEffect } from "react";
const Token = process.env.REACT_APP_TOKEN;

const CommentList = ({ id, commentList, setCommentList, page }) => {
  const handleDelete = async (commentId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const commentResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${id}/1`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${Token}` },
          credentials: "include",
        }
      );
      const commentResult = await commentResponse.json();
      console.log(commentResult.boardComments[0]);
      setCommentList(commentResult.boardComments[0]);

      // console.log("업데이트 커멘트", updatedComments);
    } catch (error) {
      console.error("댓글 삭제 중 에러:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      {commentList?.map((comment, idx) => (
        <div key={`comment${idx}`} className="border-y-2 p-[10px]">
          <div className="mb-10 flex flex-row justify-between">
            <p>{comment?.user?.nickname}</p>
            {!comment.deleted && (
              <div className="gap-2">
                <button
                  className="border-4 p-[5px] bg-slate-600 text-white text-xs"
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </button>
                <button className="border-4 p-[5px] text-xs">저장</button>
                <button className="border-4 p-[5px] text-xs">수정</button>
              </div>
            )}
          </div>

          <div className="p-[5px]"> {comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
