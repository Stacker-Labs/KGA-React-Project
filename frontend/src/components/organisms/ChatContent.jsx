import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { FaRegPaperPlane } from "react-icons/fa6";
import Chat from "../molecules/Chat";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

const ChatContent = () => {
  const { user } = useRecoilValue(userState);
  const [chatBtn, setChatBtn] = useState(false);

  const chatBtnClick = () => {
    setChatBtn(!chatBtn);
  };

  return (
    <div
      className={cn(
        "border-l relative w-1/4 p-10",
        "tablet:hidden mobile:hidden"
      )}
    >
      {user?.id && chatBtn && <Chat />}
      <div
        className={cn(
          "fixed flex justify-center items-center",
          "bottom-10 right-10 w-[50px] h-[50px] rounded-3xl bg-accent-blue"
        )}
      >
        {chatBtn ? (
          // 채팅 버튼이 눌린 경우 X로 바뀌며 ChatContent를 닫을 수 있는 버튼
          <div
            onClick={chatBtnClick}
            className="text-white text-xl cursor-pointer"
          >
            X
          </div>
        ) : (
          // 채팅 버튼이 안 눌린 경우 FaRegPaperPlane으로 표시
          <FaRegPaperPlane
            onClick={chatBtnClick}
            className="text-white text-xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ChatContent;
