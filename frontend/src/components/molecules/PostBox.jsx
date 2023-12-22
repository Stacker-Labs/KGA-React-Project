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
              "tablet:w-[90%]"
            )}
          >
            <div className="flex flex-row">
              <Link to={`/users/${item.user.id}`}>
                <img
                  src={TempUserImg}
                  className="w-[50px] h-[50px] rounded-3xl"
                  alt=""
                />
              </Link>
              <div className="pl-4">
                <p className="text-xl">
                  <Link to={`/users/${item.user.id}`}>
                    {item.user.username}
                  </Link>
                </p>
                <p>{item.createdAt}</p>
              </div>
            </div>
            <div className="text-2xl py-5">
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
