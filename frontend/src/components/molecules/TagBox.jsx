import React from "react";
import { Link } from "react-router-dom";
import Button from "../../tw_components/atoms/Buttons";
import { cn } from "../../utils/cn";

const TagBox = ({ tags, linkTo }) => {
  return (
    <div
      className={cn(
        "flex flex-row w-full gap-5 flex-wrap px-36",
        "tablet:px-5 mx-3",
        "mobile:px-5"
      )}
    >
      {tags && tags.length > 0 ? (
        tags
          .filter((notTag) => notTag.tag !== "")
          .map((item, index) => {
            return (
              <ul
                key={index}
                className={cn(
                  "rounded-lg w-[23%] tablet:w-[30%] mobile:w-[93%]",
                  "shadow-md shadow-[#777] bg-indigo-100 dark:bg-gray-600 dark:bg-opacity-30"
                )}
              >
                <li className="p-5 text-lg font-bold ">{item.tag}</li>
                <li className="px-5 py-1">Total Post : {item.boardsLength}</li>
                <li className="flex flex-row p-5 justify-between items-center">
                  <Link to={linkTo(item.tag)}>
                    <Button
                      variant={"blue"}
                      size={"md"}
                      className="shadow-md shadow-[#777]"
                    >
                      <span className="text-white ">SHOW</span>
                    </Button>
                  </Link>
                </li>
              </ul>
            );
          })
      ) : (
        <div>tags가 없습니다</div>
      )}
    </div>
  );
};

export default TagBox;
