import React, { useEffect, useState } from "react";
import Button from "../../tw_components/atoms/Buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfoBox from "../../tw_components/atoms/InfoBox";
import Following from "./Following";
import Follower from "./Follower";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userBoard, setUserBoard] = useState(null);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followerOpen, setFollowerOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const {
    user: { id: globalId },
  } = useRecoilValue(userState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const host = `${process.env.REACT_APP_API_SERVER}/users/${id}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(host, options);
        console.log(response);
        if (response.status === 400) {
          alert("This user does not exist.");
          return navigate("/");
        }
        const { user: data } = await response.json();
        console.log(data);
        setUser(data);

        return response.ok;
      } catch (e) {
        console.log(e);
      }
    };

    const fetchUserBoard = async () => {
      const page = 1;
      try {
        const host = `${process.env.REACT_APP_API_SERVER}/users/${id}/${page}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(host, options);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setUserBoard(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData().then((userExists) => {
      if (userExists) fetchUserBoard();
    });
  }, [id]);

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

  const follow = async () => {
    const host = `${process.env.REACT_APP_API_SERVER}/users/${user.id}/following`;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const deleteOptions = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    if (!isFollowed) {
      const response = await fetch(host, postOptions);
      console.log(response);
      const result = await response.json();
      console.log(result);
      setIsFollowed(true);
    } else {
      const response = await fetch(host, deleteOptions);
      console.log(response);
      const result = await response.json();
      console.log(result);
      setIsFollowed(false);
    }
  };

  return (
    <div>
      <div
        className="m-auto w-[80%] flex flex-col gap-y-5 items-center"
        id="container"
      >
        <img
          src={user?.image}
          className="w-[150px] h-[150px] rounded-full mt-10"
          alt="..."
        />

        <div className="flex flex-row justify-between w-[40%]">
          {globalId === user?.id ? (
            <Link to={`/users/${user?.id}/edit`}>
              <Button size={"md"} variant={"blue"}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Link to={``}>
              <Button onClick={follow} size={"md"} variant={"blue"}>
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            </Link>
          )}

          <div className="relative">
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
              Following
            </Button>
            {followingOpen && (
              <Following
                opener={openFollowing}
                closer={closeFollowing}
                className={`absolute`}
                user={user}
              />
            )}
          </div>

          <div className="relative">
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
            {followerOpen && (
              <Follower
                opener={openFollower}
                closer={closeFollower}
                className={`absolute`}
                user={user}
              />
            )}
          </div>
        </div>

        <InfoBox variant={"userinfo"}>
          <h2 className="text-bold text-3xl">{user?.nickname}</h2>
          <p className="text-bold text-xl">{user?.bio}</p>
          <p className="text-bold text-xl">Joined on {user?.createdAt}</p>
        </InfoBox>

        <div className="w-[61%] pr-10" id="other-info">
          <div className="" id="post-comment">
            <span className="ml-4 font-logo text-lg">Recent Post</span>
            <InfoBox>
              <div>
                <ul>
                  <li>{userBoard?.boards[0]?.title}</li>
                  <li>{userBoard?.boards[0]?.content}</li>
                  <li>{userBoard?.boards[0]?.createdAt}</li>
                </ul>
              </div>
            </InfoBox>

            <span className="ml-4 font-logo text-lg">
              Recent Comments ({user?.comments?.length || 0})
            </span>
            <InfoBox>
              {user?.comments?.map((comment, idx) => (
                <ul key={`comment_${idx}`}>
                  <li>{comment.content}</li>
                  <li>{comment.createdAt}</li>
                </ul>
              ))}
            </InfoBox>
            <span className="ml-4 font-logo text-lg">
              Posts ({userBoard?.boardLength || 0})
            </span>
            <InfoBox>
              {userBoard?.boards.slice(1).map((board, idx) => (
                <ul key={`board_${idx}`}>
                  <li>{board.title}</li>
                  <li>{board.content}</li>
                  <li>{board.createdAt}</li>
                </ul>
              ))}
            </InfoBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
