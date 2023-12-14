import React from "react";
import WelcomBox from "../molecules/WelcomBox";
import { Link } from "react-router-dom";
import { TempUserImg } from "../../images";

const MainContent = ({ board }) => {
  return (
    <div className="w-3/5 p-5 flex flex-col justify-center items-center gap-5">
      <WelcomBox />
      {board.map((item, index) => {
        return (
          <div className="border rounded-md w-[800px] p-8">
            <div className="flex flex-row">
              <Link to={`/user/${item.user.id}`}>
                <img
                  src={TempUserImg}
                  className="w-[50px] h-[50px] rounded-3xl"
                  alt=""
                />
              </Link>
              <div className="pl-4">
                <p className="text-xl">{item.user.username}</p>
                <p>{item.createdAt}</p>
              </div>
            </div>
            <div className="text-2xl py-5">
              <Link to={`/board/${item.id}`}>{item.title}</Link>
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
                <Link to={`/user/${item.user.id}`}>❤️ {50} Reactions</Link>
              </div>
              <div>
                <Link to={`/user/${item.user.id}`}>
                  💬 {item.comments.length} Comment
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainContent;
