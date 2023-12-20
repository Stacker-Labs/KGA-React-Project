import React from "react";
import { Link } from "react-router-dom";
import { TempUserImg } from "../../images";

const SearchBox = ({ searchBoard }) => {
  return (
    <>
      {searchBoard && searchBoard.length > 0 ? (
        searchBoard.map((item, index) => {
          return (
            <div key={index} className="border rounded-md w-[800px] p-8">
              <div className="flex flex-row">
                <Link to={`/user/${item.user.id}`}>
                  <img
                    src={TempUserImg}
                    className="w-[50px] h-[50px] rounded-3xl"
                    alt=""
                  />
                </Link>
                <div className="pl-4">
                  <p className="text-xl">
                    <Link to={`/user/${item.user.id}`}>
                      {item.user.username}
                    </Link>
                  </p>
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
                  <Link to={`/board/${item.id}`}>
                    ❤️ {item.likes.length} Reactions
                  </Link>
                </div>
                <div>
                  <Link to={`/board/${item.id}`}>
                    💬 {item.comments.length} Comment
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>검색결과가 없습니다.</div>
      )}
    </>
  );
};

export default SearchBox;
