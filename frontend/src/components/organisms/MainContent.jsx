import React from "react";
import WelcomBox from "../molecules/WelcomBox";
// import { Link } from "react-router-dom";
// import { TempUserImg } from "../../images";
import PostBox from "../molecules/PostBox";

const MainContent = ({ board }) => {
  return (
    <div className="w-3/5 p-5 flex flex-col justify-center items-center gap-5">
      <WelcomBox />
      <PostBox board={board} />
    </div>
  );
};

export default MainContent;
