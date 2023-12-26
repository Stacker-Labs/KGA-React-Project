import React from "react";
import { Link } from "react-router-dom";
import { TempUserImg } from "../../images";
import { cn } from "../../utils/cn";

const PostBox = ({ board }) => {
  return (
    <>
      {board.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "border rounded-md w-4/6 p-8",
              "note:w-5/6",
              "tablet:w-[90%]",
              "mobile:w-5/6 mobile:p-4 mobile:text-md"
            )}
          >
            <div className="flex flex-row">
              {item.user.image == null ? (
                <Link to={`/users/${item.user.id}`}>
                  <img
                    src={TempUserImg}
                    className="w-[50px] h-[50px] rounded-3xl mobile:w-[45px] mobile:h-[45px]"
                    alt=""
                  />
                </Link>
              ) : (
                <Link to={`/users/${item.user.id}`}>
                  <img
                    src={item.user.image}
                    className="w-[50px] h-[50px] rounded-3xl mobile:w-[45px] mobile:h-[45px]"
                    alt=""
                  />
                </Link>
              )}

              <div className="pl-4">
                <p className="text-xl mobile:text-base">
                  <Link to={`/users/${item.user.id}`}>
                    {item.user.username}
                  </Link>
                </p>
                <p className="mobile:text-base">{item.createdAt}</p>
              </div>
            </div>
            <div className="text-2xl py-5 mobile:text-lg">
              <Link to={`/boards/${item.id}`}>{item.title}</Link>
            </div>
            <div className="flex flex-row gap-3 items-center">
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
            <div className="flex flex-row py-5 gap-12">
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
