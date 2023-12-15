import React from "react";
import { Link } from "react-router-dom";
import { Js_icon } from "../../images";
import Button from "../../tw_components/atoms/Buttons";

const TagBox = ({ tags, setTags }) => {
  return (
    <div className="flex flex-row w-10/12 mx-auto gap-5 flex-wrap font-serif">
      {tags.map((item, index) => {
        return (
          <ul key={index} className="border rounded-lg w-[24%]">
            <li className="p-5 text-lg font-bold ">{item.tagName}</li>
            <li className="px-5 py-1 h-[100px]">{item.tagContent}</li>
            <li className="flex flex-row p-5 justify-between items-center">
              <Link to={"/"} className="">
                <Button variant={"blue"} size={"md"}>
                  <span className="text-white">SHOW</span>
                </Button>
              </Link>
              <img className="w-[38px] h-[38px]" src={Js_icon} alt="" />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default TagBox;
