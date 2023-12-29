import React from "react";
import { Link } from "react-router-dom";
import { No_Profile } from "../../images";
import { cn } from "../../utils/cn";
import DateTime from "./DateTime";

const PostBox = ({ board }) => {
  return (
    <>
      {board.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "w-4/6 rounded-md m-3 p-8 shadow-lg shadow-[#777] bg-indigo-100 dark:bg-gray-600 dark:bg-opacity-30",
              "note:w-5/6",
              "tablet:w-[90%]",
              "mobile:w-5/6 mobile:p-4 mobile:text-md"
            )}
          >
            <div className="flex flex-row">
              <Link to={`/users/${item.user.id}`}>
                <img
                  src={item.user.image || No_Profile}
                  className="w-[50px] h-[50px] rounded-3xl mobile:w-[45px] mobile:h-[45px]"
                  alt=""
                />
              </Link>

              <div className="pl-4">
                <p className="text-xl mobile:text-base">
                  <Link to={`/users/${item.user.id}`}>
                    {item.user.nickname}
                  </Link>
                </p>
                <p className="mobile:text-base">
                  <DateTime dateString={item.createdAt} />
                </p>
              </div>
            </div>
            <div className="text-2xl py-5 mobile:text-lg">
              <Link to={`/boards/${item.id}`}>{item.title}</Link>
            </div>
            <div className="flex flex-row gap-3 items-center flex-wrap">
              {item.tags.map((tagItem, tagIndex) => (
                <Link
                  key={tagIndex}
                  className="p-1 hover:border rounded-md border-accent-blue"
                  to={`/tags/${tagItem.tag}`}
                >
                  # {tagItem.tag}
                </Link>
              ))}
            </div>
            <div className="flex flex-row py-5 gap-12 flex-wrap mobile:gap-5">
              <div>
                <Link to={`/boards/${item.id}`}>
                  ❤️ {item.likes.length} Likes
                </Link>
              </div>
              <div>
                <Link to={`/boards/${item.id}`}>
                  💬 {item.comments} Comment
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostBox;
