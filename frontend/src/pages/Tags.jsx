import React from "react";
import Header from "../components/organisms/Header";
import { Link } from "react-router-dom";
import { Js_icon } from "../images";
import Button from "../tw_components/atoms/Buttons";

const Tags = () => {
  return (
    <>
      <Header />
      <div className="font-logo w-10/12 text-4xl pl-32 py-6">Tags</div>
      <div className="flex flex-row w-10/12 mx-auto gap-4">
        <ul className="border w-1/4">
          <li className="p-5 text-lg font-bold">#webdev</li>
          <li className="px-5 py-1">
            “I have no special talent. I am only passionately curious.” - Albert
            Einstein
          </li>
          <li className="flex flex-row p-5 justify-between items-center">
            <Link to={"/"} className="">
              <Button variant={"blue"} size={"md"}>
                <span className="text-white">SHOW</span>
              </Button>
            </Link>
            <img className="w-[38px] h-[38px]" src={Js_icon} alt="" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Tags;
