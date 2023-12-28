import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { FaRegPaperPlane } from "react-icons/fa6";
import FollowList from "../molecules/FollowList";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import Chatting from "../molecules/Chatting";

const ChatContent = () => {
  const { user } = useRecoilValue(userState);
  const [followListOpen, setFollowListOpen] = useState(false);
  const [chattingOpen, setChattingOpen] = useState(false);
  const [roomId, setRoomID] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [image, setImage] = useState(null);

  const toFollowList = () => {
    setFollowListOpen(!followListOpen);
    setChattingOpen(false);
  };

  const toChatting = ({ roomId, nickname, image }) => {
    setRoomID(roomId);
    setNickname(nickname);
    setImage(image);
    setChattingOpen(!chattingOpen);
    setFollowListOpen(false);
  };

  return (
    <div
      className={cn(
        "border-l relative w-1/4 p-10",
        "tablet:hidden mobile:hidden"
      )}
    >
      {user?.id &&
        (followListOpen ? <FollowList toChatting={toChatting} /> : null)}
      {user?.id &&
        (chattingOpen ? (
          <Chatting roomId={roomId} image={image} nickname={nickname} />
        ) : null)}

      <div
        className={cn(
          "fixed flex justify-center items-center",
          "bottom-10 right-10 w-[50px] h-[50px] rounded-3xl bg-accent-blue"
        )}
      >
        {followListOpen || chattingOpen ? (
          <div
            onClick={() => {
              setChattingOpen(false);
              setFollowListOpen(false);
            }}
            className="text-white text-xl cursor-pointer"
          >
            X
          </div>
        ) : (
          <FaRegPaperPlane
            onClick={toFollowList}
            className="text-white text-xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ChatContent;
