import React from "react";
import WelcomBox from "../molecules/WelcomBox";
// import { Link } from "react-router-dom";
// import { TempUserImg } from "../../images";
import PostBox from "../molecules/PostBox";
import { cn } from "../../utils/cn";

const MainContent = ({ board }) => {
  return (
    <div
      className={cn(
        "w-4/6 p-5 flex flex-col justify-center items-center gap-5 ",
        "tablet:w-3/4 tablet:p-5",
        "note:w-3/5",
        "mobile:w-full mobile:px-1"
      )}
    >
      <WelcomBox />
      <PostBox board={board} />
    </div>
  );
};

export default MainContent;
