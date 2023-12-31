import React from "react";
import Button from "../../tw_components/atoms/Buttons";
import { No_Profile } from "../../images";
import { Link } from "react-router-dom";

const Following = ({ className, opener, closer, user }) => {
  return (
    <div
      onMouseEnter={opener}
      onMouseLeave={closer}
      className={`overflow-y-auto bg-gray-600 bg-opacity-90 rounded-md px-3 shadow-md ${className}`}
    >
      {user?.followingUsers?.length
        ? user?.followingUsers?.map((target, idx) => {
            return (
              <div
                key={`following_${idx}`}
                className="flex my-3 justify-between w-[200px] items-center gap-5"
              >
                <Link to={`/users/${target.id}`}>
                  <img
                    className="rounded-full"
                    width="40px"
                    src={target?.image || No_Profile}
                  />
                </Link>
                <Link to={`/users/${target.id}`}>
                  <span className="text-xl">{target?.nickname}</span>
                </Link>
                {/* <Button size={"md"} variant={"blue"}>
                  {false ? "Unfollow" : "Follow"}
                </Button> */}
              </div>
            );
          })
        : "Empty!"}
    </div>
  );
};

export default Following;
