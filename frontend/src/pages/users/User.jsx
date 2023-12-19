import React from "react";
import { TempUserImg } from "../../images";
import Header from "../../components/organisms/Header";
import Button from "../../tw_components/atoms/Buttons";
import UserInfo from "./UserCom/UserInfo";

const User = () => {
  return (
    <div>
      <Header />

      <div
        className="m-auto w-12/12 flex flex-col border items-center"
        id="container"
      >
        <img
          src={TempUserImg}
          className="w-[150px] h-[150px] rounded-full mt-10"
          alt=""
        />
        <div id="edit-button-wrapper" className="m-5 translate-x-96">
          <Button size={"md"} variant={"blue"}>
            Edit Profile
          </Button>
        </div>
        <UserInfo />
        <div className="border flex flex-row w-7/12 mt-5" id="other-info">
          <div className="border w-7/12" id="count">
            <ul className="border">
              <li>1 Post</li>
              <li>2 Comments</li>
              <li>0 Followed</li>
            </ul>
          </div>
          <div id="post-comment">
            <div className="border" id="recent-post">
              User Profile Post Date Content Few things are as exciting as
              getting new knowledge and skills in something you are absolutely
              fascinated by! Few things are as exciting as getting new knowledge
              and skills in something you are absolutely fascina absolutely
              fascina Tags Tags Tags Tags Like Comments
            </div>
            <div id="recent-comments">
              <div id="comment-1">sample sample sample sample sample</div>
              <div id="comment-2">sample sample sample sample sample</div>
              <div id="comment-3">sample sample sample sample sample</div>
            </div>
            <div className="border" id="old-post-1">
              User Profile Post Date Content Few things are as exciting as
              getting new knowledge and skills in something you are absolutely
              fascinated by! Few things are as exciting as getting new knowledge
              and skills in something you are absolutely fascina absolutely
              fascina Tags Tags Tags Tags Like Comments
            </div>
            {/* <img src=""></img> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
