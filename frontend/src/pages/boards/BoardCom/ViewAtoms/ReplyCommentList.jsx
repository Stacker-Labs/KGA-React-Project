import React from "react";
import { SlActionUndo } from "react-icons/sl";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";

const ReplyCommentList = ({ replyCommentList }) => {
  const userInfo = useRecoilValue(userState);
  const userNickname = userInfo?.user?.nickname;
  return (
    <div className="flex flex-col justify-center">
      {replyCommentList?.map((replyComment, idx) => (
        <div key={`reply-comment-${idx}`} className="p-[5px] flex flex-row ">
          <SlActionUndo className="text-sm mx-[5px] rotate-180" />
          <div className="font-style: italic text-base">{userNickname} :</div>
          <div> {replyComment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ReplyCommentList;
