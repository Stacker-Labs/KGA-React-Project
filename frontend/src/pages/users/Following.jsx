import React from "react";
import Button from "../../tw_components/atoms/Buttons";

const Following = ({ className, opener, closer, user }) => {
  return (
    <div
      onMouseEnter={opener}
      onMouseLeave={closer}
      className={`overflow-y-auto bg-gray-300 bg-opacity-90 rounded-md px-3 shadow-md ${className}`}
    >
      {user?.followingUsers?.length
        ? user?.followingUsers?.map((e, idx) => {
            return (
              <div
                key={`following_${idx}`}
                className="flex my-3 justify-between items-center w-[100%]"
              >
                <img width="30px" height="30px" src={e.image} />
                <span className="text-md">{e.nickname}</span>{" "}
                <Button variant={"red"} size={"sm"}>
                  Follow
                </Button>
              </div>
            );
          })
        : "EMPTY!"}
    </div>
  );
};

export default Following;
