import React from "react";
import { Link } from "react-router-dom";
import { Js_icon } from "../../images";
import Button from "../../tw_components/atoms/Buttons";
import { cn } from "../../utils/cn";

const TagBox = ({ tags, linkTo }) => {
  return (
    <div
      className={cn(
        // "flex flex-row w-10/12 mx-auto gap-5 flex-wrap font-serif",
        "flex flex-row w-full gap-5 flex-wrap font-serif px-36",
        // "note:w-full my-auto p-5"
        "tablet:px-5 mx-3",
        "mobile:px-5"
      )}
    >
      {tags && tags.length > 0 ? (
        tags.map((item, index) => {
          return (
            <ul
              key={index}
              className="border rounded-lg w-[23%] tablet:w-[30%] mobile:w-[93%]"
            >
              <li className="p-5 text-lg font-bold ">{item.tag}</li>
              <li className="px-5 py-1">Total Post : {item.boardsLength}</li>
              <li className="flex flex-row p-5 justify-between items-center">
                <Link to={linkTo(item.tag)}>
                  <Button variant={"blue"} size={"md"}>
                    <span className="text-white ">SHOW</span>
                  </Button>
                </Link>
                <img className="w-[38px] h-[38px]" src={Js_icon} alt="" />
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
