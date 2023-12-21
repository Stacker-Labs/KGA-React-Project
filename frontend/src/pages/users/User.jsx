import React, { useEffect, useState } from "react";
import { TempUserImg } from "../../images";
import Button from "../../tw_components/atoms/Buttons";
import { Link } from "react-router-dom";
import InfoBox from "../../tw_components/atoms/InfoBox";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import Following from "./Following";
import Follower from "./Follower";

const User = () => {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [createdAt] = useState("");
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followerOpen, setFollowerOpen] = useState(false);

  useEffect(() => {
    // communication logic goes here
  }, []);

  const { user, message } = useRecoilValue(userState);

  const openFollowing = () => {
    setFollowingOpen(true);
  };

  const closeFollowing = () => {
    setFollowingOpen(false);
  };

  const openFollower = () => {
    setFollowerOpen(true);
  };

  const closeFollower = () => {
    setFollowerOpen(false);
  };

  return (
    <div>
      <div
        className="m-auto w-[80%] flex flex-col gap-y-5 items-center"
        id="container"
      >
        <img
          src={user.image}
          className="w-[150px] h-[150px] rounded-full mt-10"
          alt=""
        />

        <div className="flex flex-row justify-between w-[40%]">
          <Link to={`/users/${user.id}/edit`}>
            <Button size={"md"} variant={"blue"}>
              Edit Profile
            </Button>
          </Link>
          <Button
            onMouseEnter={() => {
              console.log("Mouse In");
              openFollowing();
            }}
            onMouseLeave={() => {
              console.log("Mouse Out");
              closeFollowing();
            }}
            size={"md"}
            variant={"blue"}
          >
            {} Following
          </Button>
          <Button
            onMouseEnter={() => {
              console.log("Mouse In");
              openFollower();
            }}
            onMouseLeave={() => {
              console.log("Mouse Out");
              closeFollower();
            }}
            size={"md"}
            variant={"blue"}
          >
            Followers
          </Button>
        </div>

        <InfoBox variant={"userinfo"}>
          <h2 className="text-bold text-3xl">{message && user.nickname}</h2>
          <p className="text-bold text-xl">{user.bio}</p>
          <p className="text-bold text-xl">Joined on {user.createdAt}</p>
        </InfoBox>

        <div className="w-[61%] pr-10" id="other-info">
          {/* <div id="count">
            <InfoBox key={"count"} variant={"count"}>
              <p>1 Post</p>
              <p>{message && user.comments.length} Comments</p>
              <p>{message && user.followingUsers.length} Following</p>
              <p>{message && user.followerUsers.length} Followers</p>
            </InfoBox>
          </div> */}

          <div className="" id="post-comment">
            <span className="ml-4 font-logo text-lg">Recent Post</span>
            <InfoBox key="recent-post">
              <div>Recent Post</div>
            </InfoBox>

            <span className="ml-4 font-logo text-lg">
              Recent Comments ({message && user.comments.length})
            </span>
            <InfoBox key="comments">
              {message &&
                user.comments.map((comment) => (
                  <ul>
                    <li>{comment.content}</li>
                    <li>{comment.createdAt}</li>
                  </ul>
                ))}
            </InfoBox>
            <span className="ml-4 font-logo text-lg">
              More Posts ({message && "board length - 1"})
            </span>
            <InfoBox key="posts">
              <div>Post</div>
              <div>Post</div>
              <div>Post</div>
            </InfoBox>
          </div>
        </div>
      </div>
      {followingOpen && (
        <Following
          opener={openFollowing}
          closer={closeFollowing}
          className={`absolute top-[35.2%] left-[50%]`}
        />
      )}
      {followerOpen && (
        <Follower
          opener={openFollower}
          closer={closeFollower}
          className={`absolute top-[35.2%] left-[63%]`}
        />
      )}
    </div>
  );
};

export default User;
