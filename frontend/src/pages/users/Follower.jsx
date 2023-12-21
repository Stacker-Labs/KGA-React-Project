import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import Button from "../../tw_components/atoms/Buttons";

const Follower = ({ className, opener, closer }) => {
  const { user, message } = useRecoilValue(userState);
  return (
    <div
      onMouseEnter={opener}
      onMouseLeave={closer}
      className={`overflow-y-auto w-[20%] h-[40%] bg-purple-100 bg-opacity-90 rounded-md px-3 shadow-md ${className}`}
    >
      {message &&
        user.followerUsers.map((e) => {
          return (
            <div className="flex my-3 justify-between items-center w-[100%]">
              <img width="40px" height="40px" src={e.image} />
              <span className="text-md">{e.nickname}</span>{" "}
              <Button variant={"red"} size={"sm"}>
                Follow
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default Follower;
