import React from "react";
import { TempUserImg } from "../../images";
import Button from "../../tw_components/atoms/Buttons";
import { Link } from "react-router-dom";
import InfoBox from "../../tw_components/atoms/InfoBox";

const User = () => {
  return (
    <div>
      <div
        className="m-auto w-12/12 flex flex-col gap-y-5 border items-center"
        id="container"
      >
        <img
          src={TempUserImg}
          className="w-[150px] h-[150px] rounded-full mt-10"
          alt=""
        />

        <div id="edit-button-wrapper">
          <Link to={"/users/1/edit"}>
            <Button size={"md"} variant={"blue"}>
              Edit Profile
            </Button>
          </Link>
        </div>

        <InfoBox variant={"userinfo"}>
          <h2 className="text-bold text-3xl">Eunjae Lee</h2>
          <p className="text-bold text-xl">
            Few things are as exciting as getting new knowledge and skills in
            something you are absolutely fascinated by! Few things are as
            exciting as getting new knowledge and skills in something you are
            absolutely fascina absolutely fascina
          </p>
          <p className="text-bold text-xl">Joined on Dec 11, 2013</p>
        </InfoBox>

        <div className="flex flex-row w-[60.5%]" id="other-info">
          <div id="count">
            <InfoBox variant={"count"}>
              <p>1 Post</p>
              <p>2 Comments</p>
              <p>0 Followed</p>
            </InfoBox>
            {/* count */}
          </div>

          <div id="post-comment">
            <InfoBox id="recent-post">
              User Profile Post Date Content Few things are as exciting as
              getting new knowledge and skills in something you are absolutely
              fascinated by! Few things are as exciting as getting new knowledge
              and skills in something you are absolutely fascina absolutely User
              Profile Post Date Content Few things are as exciting as getting
              new knowledge and skills in something you are absolutely
              fascinated by! Few things are as exciting as getting new knowledge
              and skills in something you are absolutely fascina absolutely
              fascina Tags Tags Tags Tags Like Comments fascina Tags Tags Tags
              Tags Like Comments fascina Tags Tags Tags Tags Like Comments
              fascina Tags Tags Tags Tags Like Comments fascina Tags Tags Tags
              Tags Like Comments fascina Tags Tags Tags Tags Like Comments
            </InfoBox>
            {/* recent-post */}
            <InfoBox id="comments">
              <div id="comment-1">sample sample sample sample sample</div>
              <div id="comment-2">sample sample sample sample sample</div>
              <div id="comment-3">sample sample sample sample sample</div>
            </InfoBox>
            {/* recent-comments */}
            <InfoBox id="posts">
              User Profile Post Date Content Few things are as exciting as
              getting new knowledge and skills in something you are absolutely
              fascinated by! Few things are as exciting as getting new knowledge
              and skills in something you are absolutely fascina absolutely
              fascina Tags Tags Tags Tags Like Comments
            </InfoBox>
            {/* old-post */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
