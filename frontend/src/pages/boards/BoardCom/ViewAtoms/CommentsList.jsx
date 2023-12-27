import React from "react";
// const Token = process.env.REACT_APP_TOKEN;

const CommentList = ({ id, commentList, page }) => {
  return (
    <div className="flex flex-col justify-center">
      {commentList[0]?.map((comment, idx) => (
        <div key={`comment${idx}`} className="border-y-2 p-[10px]">
          <div className="mb-10 flex flex-row justify-between">
            <p>{comment.user.nickname}</p>
            <div className="gap-2">
              <button className="border-4 p-[5px] bg-slate-600 text-white text-xs">
                삭제
              </button>
              <button className="border-4 p-[5px] text-xs">저장</button>
              <button className="border-4 p-[5px] text-xs">수정</button>
            </div>
          </div>

          <div className="p-[5px]"> {comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
