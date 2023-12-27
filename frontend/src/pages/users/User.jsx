import React, { useEffect, useState } from "react";
import Button from "../../tw_components/atoms/Buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import InfoBox from "../../tw_components/atoms/InfoBox";
import Following from "./Following";
import Follower from "./Follower";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { No_Profile } from "../../images";
import { cn } from "../../utils/cn";

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

  // const globalId = 1;

  useEffect(() => {
    const fetchUserData = async (_id) => {
      try {
        const host = `${process.env.REACT_APP_API_SERVER}/users/${_id}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(host, options);
        console.log(response);
        if (response.status === 400 || response.status === 404) {
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

    const didIFollow = () => {
      const idx = user?.followerUsers?.findIndex((e) => globalId === e.id);
      if (idx === -1) setIsFollowed(false);
      else setIsFollowed(true);
    };

    if (userBoard === null) {
      fetchUserData(id).then((userExists) => {
        if (userExists) {
          fetchUserBoard();
          didIFollow();
        }
      });
    }
  }, [id, userBoard]);

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

  const follow = async (id) => {
    const host = `${process.env.REACT_APP_API_SERVER}/users/${id}/following`;
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

  const { boards: userBoardArray } = userBoard || { boards: [] };

  return (
    <div>
      <div
        className="m-auto w-[80%] flex flex-col gap-y-5 items-center"
        id="container"
      >
        <img
          src={user?.image || No_Profile}
          className="w-[150px] h-[150px] rounded-full mt-10"
          alt=""
        />

        <div className="flex flex-row justify-between w-[45%]">
          {globalId === user?.id ? (
            <Link to={`/users/${user?.id}/edit`}>
              <Button size={"md"} variant={"blue"}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                follow(user?.id);
              }}
              size={"md"}
              variant={"blue"}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}

          <div className="relative">
            <Button
              onMouseEnter={() => {
                openFollowing();
              }}
              onMouseLeave={() => {
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
                openFollower();
              }}
              onMouseLeave={() => {
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
          <p className="text-bold text-xl">
            Joined on {convertDate(user?.createdAt)}
          </p>
        </InfoBox>

        <div className="w-[61%] pr-10" id="other-info">
          <div className="" id="post-comment">
            <span className="ml-4 font-logo text-xl">Recent Post</span>
            <InfoBox className={`flex flex-row`}>
              {!!userBoard?.boardLength && (
                <div className={cn("rounded-md w-12/12 py-4 px-8")}>
                  <div className="flex flex-row">
                    <Link to={`/users/${user?.id}`}>
                      <img
                        src={user?.image || No_Profile}
                        className="w-[50px] h-[50px] rounded-3xl"
                        alt=""
                      />
                    </Link>
                    <div className="pl-4">
                      <p className="text-xl">
                        <Link to={`/users/${user?.id}`}>{user?.nickname}</Link>
                      </p>
                      <p>{convertDate(userBoardArray[0]?.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-2xl py-5">
                    <Link to={`/boards/${userBoardArray[0]?.id}`}>
                      {userBoardArray[0]?.title}
                    </Link>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    {userBoardArray[0]?.tags.map((tagItem, tagIndex) => (
                      <Link
                        key={tagItem}
                        className="p-1 hover:border rounded-md border-accent-blue"
                        to={`/tags/${tagItem.tag}`}
                      >
                        # {tagItem.tag}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-row gap-12">
                    <div>
                      <Link to={`/boards/${userBoardArray?.id}`}>
                        ❤️ {userBoardArray?.likes?.length} Likes
                      </Link>
                    </div>
                    <div>
                      <Link to={`/boards/${userBoardArray.id}`}>
                        💬 {userBoardArray?.comments} Comment
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </InfoBox>

            <span className="ml-4 font-logo text-xl">
              Recent Comments ({user?.comments?.length || 0})
            </span>
            <InfoBox className={`flex flex-col gap-3`}>
              {user?.comments
                ?.slice()
                ?.reverse()
                ?.map(
                  (comment, idx) =>
                    !comment?.deleted && (
                      <ul key={`comment_${idx}`}>
                        <Link to={`/boards/${comment?.board?.id}`}>
                          <span className="text-2xl">{comment?.content}</span>
                        </Link>
                        <div className="h-2"></div>
                        <div className="flex flex-row justify-between">
                          <li className="sm">{comment?.board?.title}</li>
                          <li>{convertDate(comment?.createdAt)}</li>
                        </div>
                        <div className="h-2"></div>
                        <li className="w-[100%] h-[1px] bg-[#777]"></li>
                      </ul>
                    )
                )}
            </InfoBox>
            <span className="ml-4 font-logo text-xl">
              Posts ({userBoard?.boardLength || 0})
            </span>
            <InfoBox className={`flex flex-col items-center gap-10`}>
              {userBoardArray?.map((board, idx) => (
                <>
                  <div
                    key={`board_${idx}`}
                    className={cn(
                      "rounded-md w-[100%] py-4 px-8",
                      "note:w-6/6",
                      "tablet:w-[100%]"
                    )}
                  >
                    <div className="w-[100%] flex flex-row">
                      <Link to={`/users/${user?.id}`}>
                        <img
                          src={user?.image || No_Profile}
                          className="w-[50px] h-[50px] rounded-3xl"
                          alt=""
                        />
                      </Link>
                      <div className="pl-4">
                        <p className="text-xl">
                          <Link to={`/users/${user?.id}`}>
                            {user?.nickname}
                          </Link>
                        </p>
                        <p>{convertDate(board?.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-2xl py-5">
                      <Link to={`/boards/${board?.id}`}>{board?.title}</Link>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      {board?.tags.map((tagItem, tagIndex) => (
                        <Link
                          key={`tagIndex_${tagIndex}`}
                          className="p-1 hover:border rounded-md border-accent-blue"
                          to={`/tags/${tagItem.tag}`}
                        >
                          # {tagItem.tag}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-row gap-12">
                      <div>
                        <Link to={`/boards/${board?.id}`}>
                          ❤️ {board?.likes?.length} Likes
                        </Link>
                      </div>
                      <div>
                        <Link to={`/boards/${board?.id}`}>
                          💬 {board?.comments} Comment
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%] h-[1px] bg-[#777]"></div>
                </>
              ))}
            </InfoBox>
          </div>
        </div>
      </div>
    </div>
  );
};

const convertDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

export default User;
