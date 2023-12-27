import React from "react";
import Button from "../../tw_components/atoms/Buttons";
import { No_Profile } from "../../images";
import { Link } from "react-router-dom";

const Follower = ({ className, opener, closer, user }) => {
  return (
    <div
      onMouseEnter={opener}
      onMouseLeave={closer}
      className={`overflow-y-auto bg-gray-600 bg-opacity-90 rounded-md px-3 shadow-md ${className}`}
    >
      {user?.followerUsers?.length
        ? user?.followerUsers?.map((target, idx) => {
            return (
              <div
                key={`follower_${idx}`}
                className="flex my-3 justify-between items-center w-[100%] gap-5"
              >
                <Link to={`/users/${target?.id}`}>
                  <img width="30px" src={target?.image || No_Profile} />
                </Link>
                <Link to={`/users/${target?.id}`}>
                  <span className="text-xl">{target?.nickname}</span>
                </Link>
                <Button onClick={"follow"} size={"md"} variant={"blue"}>
                  {false ? "Unfollow" : "Follow"}
                </Button>
              </div>
            );
          })
        : "Empty!"}
    </div>
  );
};

export default Follower;
