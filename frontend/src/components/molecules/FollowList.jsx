import React from "react";
import { cn } from "../../utils/cn";
import { No_Profile } from "../../images";
import { FaRegPaperPlane } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { Link } from "react-router-dom";

const FollowList = ({ toChatting }) => {
  const { user } = useRecoilValue(userState);
  const room = user.rooms;

  const chatOn = (roomId, nickname, image) => {
    toChatting({ roomId, nickname, image });
  };

  return (
    <div
      className={cn(
        "fixed bottom-24 right-10 bg-accent-blue text-white w-[380px] h-[700px] rounded-md",
        "shadow-lg shadow-[#777]",
        "note:w-[290px] note:h-[485px]"
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="text-xl pb-2">친구 {room?.length} 명 </div>
        <div>
          {room?.length > 0 ? (
            room?.map((item, roomIndex) => (
              <ul
                key={roomIndex}
                className="flex flex-row items-center justify-between p-2 border-b"
              >
                <li className="w-[15%]">
                  {item.users
                    .filter((userItem) => userItem.id !== user.id)
                    .map((chatUserItem, chatUserIndex) => {
                      return (
                        <Link
                          to={`/users/${chatUserItem.id}`}
                          key={chatUserIndex}
                        >
                          <img
                            src={chatUserItem.image || No_Profile}
                            className="rounded-3xl "
                            alt=""
                          />
                        </Link>
                      );
                    })}
                </li>
                <li className="text-lg w-[60%]">
                  {item.users
                    .filter((userItem) => userItem.id !== user.id)
                    .map((chatUserItem, chatUserIndex) => (
                      <Link
                        to={`/users/${chatUserItem.id}`}
                        key={chatUserIndex}
                      >
                        {chatUserItem.nickname}
                      </Link>
                    ))}
                </li>
                <li className="text-xl w-[8%] cursor-pointer">
                  <FaRegPaperPlane
                    onClick={() => {
                      const chatUserItem = item.users.find(
                        (userItem) => userItem.id !== user.id
                      );
                      if (chatUserItem) {
                        chatOn(
                          item.id,
                          chatUserItem.nickname,
                          chatUserItem.image
                        );
                      }
                    }}
                  />
                </li>
              </ul>
            ))
          ) : (
            <div>follow user가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
